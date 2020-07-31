<?php
namespace App\Http\Controllers\Web\CRUD;

use App\Exceptions\APIException;
use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ShopController extends Controller
{
    public function info(Request $request)
    {
        return response()->json([
            'success'=> true,
            'info'=>[
                'title'=>'Chemist',
                'create'=>true,
                'update'=>true,
                'structure'=>[
                    ['name','email'],
                    ['mobile','address'],
                    ['username','password'],
                    ['province','district'],
                    ['city']
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
                    ],
                    "city"=> [
                        "type"=> "dropdown",
                        "name"=> "city",
                        "label"=> "City",
                        "link"=> "city",
                        "basedOn"=> ['province','district']
                    ]
                ]
            ]
        ]);
    }

    public function search(Request $request)
    {

        $page = $request->input('page', 0);
        $perPage = $request->input('perPage', 25);

        $shops = Shop::with(['user','city','city.district','city.district.province'])
            ->skip($page*$perPage)
            ->limit($perPage)
            ->get();

        return response()->json([
            'success'=> true,
            'results'=> $shops->map(function (Shop $shop) {
                return [
                    'id'=> $shop->getKey(),
                    'name'=> $shop->name,
                    'address'=> $shop->address,
                    'email'=> $shop->user? $shop->user->email: null,
                    'mobile'=> $shop->user? $shop->user->mobile: null,
                    'username'=> $shop->user? $shop->user->username: null,
                    'password'=> null,
                    'city'=> $shop->city?[
                        'value'=> $shop->city->getKey(),
                        'label'=>$shop->city->name
                    ]:null,
                    'district'=> $shop->city&&$shop->city->district?[
                        'value'=> $shop->city->district->getKey(),
                        'label'=>$shop->city->district->name
                    ]:null,
                    'province'=> $shop->city&&$shop->city->district&&$shop->city->district->province?[
                        'value'=> $shop->city->district->province->getKey(),
                        'label'=>$shop->city->district->province->name
                    ]:null
                ];
            }),
            'count'=> Shop::count()
        ]);
    }

    public function create(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'values'=>'required|array',
            'values.name'=>'required',
            'values.username'=>'required',
            'values.email'=>'required|email',
            'values.password'=>'required|min:6',
            'values.city'=> 'required|array',
            'values.city.value'=>'required|numeric|exists:cities,id'
        ]);

        if ($validation->fails()) {
            throw new APIException($validation->errors()->first());
        }

        $user = User::create([
            "name"=> $request->input('values.name'),
            "email"=> $request->input('values.email'),
            "password"=> Hash::make($request->input('values.password')),
            "mobile"=> $request->input('values.mobile'),
            "user_type_id"=> config('app.user_types.chemist'),
            "username"=> $request->input('values.username'),
        ]);

        Shop::create([
            'name'=> $request->input('values.name'),
            'image'=> null,
            'address'=> $request->input('values.address'),
            'city_id'=> $request->input('values.city.value'),
            'user_id'=> $user->getKey()
        ]);

        return response()->json([
            'success'=> true,
            'message'=> "Successfully created the shop!"
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
            'values.password'=>'required|min:6',
            'values.city'=>'required|array',
            'values.city.value'=> 'required|numeric|exists:cities,id'
        ]);

        if ($validation->fails()) {
            throw new APIException($validation->errors()->first());
        }

        $id = $request->input('id');

        $shop = Shop::with('user')->find($id);

        if (!$shop->user) {
            throw new APIException("Invalid request");
        }

        $shop->name = $request->input('values.name');
        $shop->address = $request->input('values.address');
        $shop->city_id = $request->input('values.city.value');
        $shop->save();

        $shop->user->name = $request->input('values.name');
        $shop->user->email = $request->input('values.email');
        $shop->user->mobile = $request->input('values.mobile');
        $shop->user->username = $request->input('values.username');
        $shop->user->password = Hash::make($request->input('values.password'));
        $shop->user->save();

        return response()->json([
            'success'=> true,
            'message'=> "Successfully updated the shop!"
        ]);
    }

    public function delete(Request $request)
    {
        $id = $request->input('id');

        $shop = Shop::find($id);

        if (!$shop) {
            throw new APIException("Invalid request");
        }

        $shop->delete();

        return response()->json([
            'success'=> true,
            'message'=> "Successfully deleted the shop!"
        ]);
    }

    public function dropdown(Request $request)
    {

        $cityId = $request->input('parameters.city');

        $city = City::with('shops')->find($cityId);

        if (!$city) {
            throw new APIException("Invalid request");
        }

        return response()->json([
            'success'=> true,
            'items'=> $city->shops->map(function (Shop $shop) {
                return [
                    'value'=> $shop->getKey(),
                    'label'=> $shop->name
                ];
            })
        ]);
    }
}
