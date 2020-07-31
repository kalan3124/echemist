<?php
namespace App\Http\Controllers\Web\CRUD;

use App\Exceptions\APIException;
use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\District;
use App\Models\Province;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function info(Request $request)
    {
        return response()->json([
            'success'=> true,
            'info'=>[
                'title'=>'City',
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
                    ],

                    'district'=> [
                        'type'=>'dropdown',
                        'name'=> 'district',
                        'label'=> "District",
                        'link'=> 'district',
                        'basedOn'=> ['province']
                    ]
                ]
            ]
        ]);
    }

    public function search(Request $request)
    {

        $page = $request->input('page', 0);
        $perPage = $request->input('perPage', 25);

        $cities = City::with('district', 'district.province')
            ->skip($page*$perPage)
            ->limit($perPage)
            ->get();

        return response()->json([
            'success'=> true,
            'results'=> $cities->map(function (City $city) {
                return [
                    'id'=> $city->getKey(),
                    'name'=> $city->name,
                    'no'=> $city->no,
                    'district'=> $city->district?[
                        'label'=> $city->district->name,
                        'value'=> $city->district->getKey(),
                    ]:null,
                    'province'=> $city->district&&$city->district->province?[
                        'label'=> $city->district->province->name,
                        'value'=> $city->district->province->getKey(),
                    ]:null
                ];
            }),
            'count'=> City::count()
        ]);
    }

    public function create(Request $request)
    {
        $name = $request->input('values.name');
        $no = $request->input('values.no');
        if (strlen($name)<3) {
            throw new APIException("Invalid Name Supplied");
        }

        $districtId = $request->input('values.district.value', 0);
        $district = District::find($districtId);
        if (!$district) {
            throw new APIException("District field is required");
        }

        City::create([
            'name'=>$name,
            'district_id'=> $districtId,
            'no'=> $no
        ]);

        return response()->json([
            'success'=> true,
            'message'=> "Successfully created the city!"
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

        $districtId = $request->input('values.district.value', 0);
        $district = District::find($districtId);
        if (!$district) {
            throw new APIException("District field is required");
        }

        $city = City::find($id);

        if (!$city) {
            throw new APIException("Invalid request");
        }

        $city->name = $name;
        $city->district_id = $districtId;
        $city->no = $no;
        $city->save();

        return response()->json([
            'success'=> true,
            'message'=> "Successfully updated the city!"
        ]);
    }

    public function delete(Request $request)
    {
        $id = $request->input('id');

        $city = City::find($id);

        if (!$city) {
            throw new APIException("Invalid request");
        }

        $city->delete();

        return response()->json([
            'success'=> true,
            'message'=> "Successfully deleted the city!"
        ]);
    }

    public function dropdown(Request $request)
    {
        $districtId = $request->input('parameters.district');

        $district = District::with('cities')->find($districtId);

        if (!$district) {
            throw new APIException("Invalid Request!");
        }

        return response()->json([
            'success'=> true,
            'items'=> $district->cities->map(function (City $city) {
                return [
                    'value'=> $city->getKey(),
                    'label'=> $city->name
                ];
            })
        ]);
    }
}
