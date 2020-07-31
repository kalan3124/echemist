<?php
namespace App\Http\Controllers\Web\CRUD;

use App\Exceptions\APIException;
use App\Http\Controllers\Controller;
use App\Models\District;
use App\Models\Province;
use Illuminate\Http\Request;

class DistrictController extends Controller
{
    public function info(Request $request)
    {
        return response()->json([
            'success'=> true,
            'info'=>[
                'title'=>'District',
                'create'=>true,
                'update'=>true,
                'inputs'=>[
                    'no'=>[
                        'type'=>'text',
                        'name'=>'no',
                        'label'=>'No'
                    ],
                    'name'=>[
                        'type'=>'text',
                        'name'=>'name',
                        'label'=>'Name'
                    ],
                    'province'=>[
                        'type'=> 'dropdown',
                        'name'=> 'province',
                        'label'=> 'Province',
                        'link'=>'province'
                    ]
                ]
            ]
        ]);
    }

    public function search(Request $request)
    {

        $page = $request->input('page', 0);
        $perPage = $request->input('perPage', 25);

        $districts = District::with('province')
            ->skip($page*$perPage)
            ->limit($perPage)
            ->get();

        return response()->json([
            'success'=> true,
            'results'=> $districts->map(function (District $district) {
                return [
                    'id'=> $district->getKey(),
                    'name'=> $district->name,
                    'no'=> $district->no,
                    'province'=> $district->province?[
                        'label'=> $district->province->name,
                        'value'=> $district->province->getKey(),
                    ]:null
                ];
            }),
            'count'=> District::count()
        ]);
    }

    public function create(Request $request)
    {
        $name = $request->input('values.name');
        $no = $request->input('values.no');
        if (strlen($name)<3) {
            throw new APIException("Invalid Name Supplied");
        }

        $provinceId = $request->input('values.province.value', 0);
        $province = Province::find($provinceId);
        if (!$province) {
            throw new APIException("Province field is required");
        }

        District::create([
            'name'=>$name,
            'province_id'=> $provinceId,
            'no'=>$no
        ]);

        return response()->json([
            'success'=> true,
            'message'=> "Successfully created the district!"
        ]);
    }

    public function update(Request $request)
    {
        $id = $request->input('id');
        $name = $request->input('values.name');
        $no = $request->input('values.no');
        if (strlen($name)<3) {
            throw new APIException("Invalid Name Supplied");
        }

        $provinceId = $request->input('values.province.value', 0);
        $province = Province::find($provinceId);
        if (!$province) {
            throw new APIException("Province field is required");
        }

        $district = District::find($id);

        if (!$district) {
            throw new APIException("Invalid request");
        }

        $district->name = $name;
        $district->province_id = $provinceId;
        $district->no = $no;
        $district->save();

        return response()->json([
            'success'=> true,
            'message'=> "Successfully updated the district!"
        ]);
    }

    public function delete(Request $request)
    {
        $id = $request->input('id');

        $district = District::find($id);

        if (!$district) {
            throw new APIException("Invalid request");
        }

        $district->delete();

        return response()->json([
            'success'=> true,
            'message'=> "Successfully deleted the district!"
        ]);
    }

    public function dropdown(Request $request)
    {
        $provinceId = $request->input('parameters.province');

        $province = Province::with('districts')->find($provinceId);

        if (!$province) {
            throw new APIException("Invalid Request!");
        }

        return response()->json([
            'success'=> true,
            'items'=> $province->districts->map(function (District $district) {
                return [
                    'value'=> $district->getKey(),
                    'label'=> $district->name
                ];
            })
        ]);
    }
}
