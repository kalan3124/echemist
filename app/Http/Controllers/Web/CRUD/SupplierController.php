<?php
namespace App\Http\Controllers\Web\CRUD;

use App\Exceptions\APIException;
use App\Http\Controllers\Controller;
use App\Models\District;
use App\Models\Province;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SupplierController extends Controller
{
    public function info(Request $request)
    {
        return response()->json([
            'success'=> true,
            'info'=>[
                'title'=>'Pharma Company',
                'create'=>true,
                'update'=>true,
                'structure'=>[
                    ['name','email'],
                    ['mobile','address'],
                    ['username','password']
                ],
                'inputs'=>[
                    'name'=>[
                        'type'=>'text',
                        'name'=>'name',
                        'label'=>'Name'
                    ],
                    'email'=>[
                        'type'=> 'email',
                        'name'=> 'email',
                        'label'=> 'Email'
                    ],
                    'mobile'=>[
                        'type'=> 'text',
                        'name'=> 'mobile',
                        'label'=> 'Mobile'
                    ],
                    'address'=>[
                        'type'=> 'text',
                        'name'=> 'address',
                        'label'=> 'Address'
                    ],
                    'username'=>[
                        'type'=> 'text',
                        'name'=> 'username',
                        'label'=> 'Username'
                    ],
                    'password'=>[
                        'type'=> 'password',
                        'name'=> 'password',
                        'label'=> 'Password'
                    ]
                ]
            ]
        ]);
    }

    public function search(Request $request)
    {

        $page = $request->input('page', 0);
        $perPage = $request->input('perPage', 25);

        $suppliers = Supplier::with('user')
            ->skip($page*$perPage)
            ->limit($perPage)
            ->get();

        return response()->json([
            'success'=> true,
            'results'=> $suppliers->map(function (Supplier $supplier) {
                return [
                    'id'=> $supplier->getKey(),
                    'name'=> $supplier->name,
                    'address'=> $supplier->address,
                    'email'=> $supplier->user? $supplier->user->email: null,
                    'mobile'=> $supplier->user? $supplier->user->mobile: null,
                    'username'=> $supplier->user? $supplier->user->username: null,
                    'password'=> null,
                ];
            }),
            'count'=> Supplier::count()
        ]);
    }

    public function create(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'values'=>'required|array',
            'values.name'=>'required',
            'values.username'=>'required',
            'values.email'=>'required|email',
            'values.password'=>'required|min:6'
        ]);

        if ($validation->fails()) {
            throw new APIException($validation->errors()->first());
        }

        $user = User::create([
            "name"=> $request->input('values.name'),
            "email"=> $request->input('values.email'),
            "password"=> Hash::make($request->input('values.password')),
            "mobile"=> $request->input('values.mobile'),
            "user_type_id"=> config('app.user_types.company'),
            "username"=> $request->input('values.username'),
        ]);

        Supplier::create([
            'name'=> $request->input('values.name'),
            'logo'=> null,
            'address'=> $request->input('values.address'),
            'user_id'=> $user->getKey()
        ]);

        return response()->json([
            'success'=> true,
            'message'=> "Successfully created the supplier!"
        ]);
    }

    public function update(Request $request)
    {

        $validation = Validator::make($request->all(), [
            'id'=>'required|numeric|exists:suppliers,id',
            'values'=>'required|array',
            'values.name'=>'required',
            'values.username'=>'required',
            'values.email'=>'required|email',
            'values.password'=>'required|min:6'
        ]);

        if ($validation->fails()) {
            throw new APIException($validation->errors()->first());
        }

        $id = $request->input('id');

        $supplier = Supplier::with('user')->find($id);

        if (!$supplier->user) {
            throw new APIException("Invalid request");
        }

        $supplier->name = $request->input('values.name');
        $supplier->address = $request->input('values.address');
        $supplier->save();

        $supplier->user->name = $request->input('values.name');
        $supplier->user->email = $request->input('values.email');
        $supplier->user->mobile = $request->input('values.mobile');
        $supplier->user->username = $request->input('values.username');
        $supplier->user->password = Hash::make($request->input('values.password'));
        $supplier->user->save();

        return response()->json([
            'success'=> true,
            'message'=> "Successfully updated the supplier!"
        ]);
    }

    public function delete(Request $request)
    {
        $id = $request->input('id');

        $supplier = Supplier::find($id);

        if (!$supplier) {
            throw new APIException("Invalid request");
        }

        $supplier->delete();

        return response()->json([
            'success'=> true,
            'message'=> "Successfully deleted the supplier!"
        ]);
    }

    public function dropdown(Request $request)
    {

        $suppliers = Supplier::get();

        return response()->json([
            'success'=> true,
            'items'=> $suppliers->map(function (Supplier $supplier) {
                return [
                    'value'=> $supplier->getKey(),
                    'label'=> $supplier->name
                ];
            })
        ]);
    }
}
