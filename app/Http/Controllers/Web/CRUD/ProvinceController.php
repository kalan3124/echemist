<?php
namespace App\Http\Controllers\Web\CRUD;

use App\Exceptions\APIException;
use App\Http\Controllers\Controller;
use App\Models\Province;
use Illuminate\Http\Request;

class ProvinceController extends Controller
{
    public function info(Request $request)
    {
        return response()->json([
            'success'=> true,
            'info'=>[
                'title'=>'Province',
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
                    ]
                ]
            ]
        ]);
    }

    public function search(Request $request)
    {

        $page = $request->input('page', 0);
        $perPage = $request->input('perPage', 25);

        $provinces = Province::skip($page*$perPage)
            ->limit($perPage)
            ->get();

        return response()->json([
            'success'=> true,
            'results'=> $provinces->map(function (Province $province) {
                return [
                    'id'=> $province->getKey(),
                    'name'=> $province->name,
                    'no'=> $province->no
                ];
            }),
            'count'=> Province::count()
        ]);
    }

    public function create(Request $request)
    {
        $name = $request->input('values.name');
        $no = $request->input('values.no');

        if (strlen($name)<3) {
            throw new APIException("Invalid Name Supplied");
        }

        Province::create([
            'name'=>$name,
            'no'=>$no
        ]);

        return response()->json([
            'success'=> true,
            'message'=> "Successfully created the province!"
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

        $province = Province::find($id);

        if (!$province) {
            throw new APIException("Invalid request");
        }

        $province->name = $name;
        $province->name = $no;
        $province->save();

        return response()->json([
            'success'=> true,
            'message'=> "Successfully updated the province!"
        ]);
    }

    public function delete(Request $request)
    {
        $id = $request->input('id');

        $province = Province::find($id);

        if (!$province) {
            throw new APIException("Invalid request");
        }

        $province->delete();


        return response()->json([
            'success'=> true,
            'message'=> "Successfully deleted the province!"
        ]);
    }

    public function dropdown(Request $request)
    {
        return response()->json([
            'success'=> true,
            'items'=> Province::get()->map(function (Province $province) {
                return [
                    'value'=> $province->getKey(),
                    'label'=> $province->name
                ];
            })
        ]);
    }
}
