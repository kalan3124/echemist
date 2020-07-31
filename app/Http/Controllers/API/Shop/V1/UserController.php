<?php
namespace App\Http\Controllers\API\Shop\V1;

use App\Exceptions\APIException;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');

        $user = User::where('username', $username)->with('shop')->latest()->first();

        if (!$user) {
            /*APIE1*/
            throw new APIException("UserNotFound", 1);
        }

        if ($user->user_type_id != config('app.user_types.shop_app_login')) {
            /*APIE2*/
            throw new APIException("UserForbidden", 2);
        }

        if (!Hash::check($password, $user->password)) {
            /*APIE3*/
            throw new APIException("WrongPassword", 3);
        }

        $orderCount = $user->shop? Order::where('shop_id', $user->shop->getKey())->count(): 0;

        return response()->json([
            'success'=>true,
            'user'=>[
                'name'=> $user->name,
                'id'=> $user->getKey(),
                'email'=> $user->email,
                'profileCompleted'=> $user->shop? !!$user->shop->completed_profile : false,
                'supplierCompleted'=> $user->shop? !!$user->shop->completed_suppliers : false,
                'nextOrderIncrement'=> $orderCount + 1
            ],
            'token'=>$user->createToken('AppToken')->accessToken,
        ]);
    }

    public function signup(Request $request)
    {
        $mobileNumber = $request->input('mobileNumber');
        $email = $request->input('email');
        $username = $request->input('username');
        $password = $request->input('password');
        $confirmPassword = $request->input('confirmPassword');

        $validation = Validator::make($request->all(), [
            'email'=>'email|required',
            'username'=>'required',
            'password'=>'required|min:6',
            'confirmPassword'=> 'required|min:6'
        ])->errors();

        $errors = [];
        if (strlen($mobileNumber)<8||preg_match('/([^0-9\+])/', $mobileNumber)) {
            $errors['mobileNumber'] = "Invalid mobile number.";
        }

        if ($validation->has('email')) {
            $errors['email'] = 'Invalid email address.';
        }

        if ($validation->has('username')) {
            $errors['username'] = 'Username is required.';
        }

        if ($validation->has('password')) {
            $errors ['password']= 'Password should contain minimum 6 characters.';
        }

        if ($password!==$confirmPassword) {
            $errors['confirmPassword'] = "Password not matched";
        }

        $existUser = User::where('username', $username)->latest()->first();

        if ($existUser) {
            $errors['username']= 'User is exist with this username';
        }

        if (!empty($errors)) {
            return response()->json([
                'success'=> false,
                'message'=> "Can not validate some inputs",
                'details'=> $errors
            ]);
        }

        $user = User::create([
            'mobile'=> $mobileNumber,
            'email'=> $email,
            'username'=> $username,
            'password'=> Hash::make($password),
            'user_type_id'=> config('app.user_types.shop_app_login'),
            'name'=> ''
        ]);

        return response()->json([
            'success'=>true,
            'user'=>[
                'name'=> $user->name,
                'id'=> $user->getKey(),
                'email'=> $user->email,
                'profileCompleted'=> false,
                'supplierCompleted'=> false,
                'nextOrderIncrement'=> 1
            ],
            'token'=>$user->createToken('AppToken')->accessToken,
        ]);
    }

    public function status(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $shop = Shop::where('user_id', $user->getKey())->latest()->first();

        $orderCount = $shop? Order::where('shop_id', $shop->getKey())->count(): 0;

        return response()->json([
            'success'=>true,
            'user'=>[
                'name'=> $user->name,
                'id'=> $user->getKey(),
                'email'=> $user->email,
                'profileCompleted'=> $shop? !!$shop->completed_profile : false,
                'supplierCompleted'=> $shop? !!$shop->completed_suppliers : false,
                'nextOrderIncrement'=> $orderCount + 1
            ]
        ]);
    }

    public function changePassword(Request $request)
    {

        $validation = Validator::make($request->all(), [
            'password'=>'required|min:6',
            'oldPassword'=> 'required|min:6',
            'verifyPassword'=> 'required|min:6'
        ])->errors();

        $oldPassword = $request->input('oldPassword');
        $newPassword = $request->input('password');
        $verifyPassword  = $request->input('verifyPassword');

        /** @var User $user */
        $user = Auth::user();

        if ($validation->has('password')) {
            $errors['password'] = 'Invalid password. Password should contain at least 6 characters.';
        }

        if ($validation->has('oldPassword')) {
            $errors['oldPassword'] = 'Invalid password. Password should contain at least 6 characters.';
        }

        if ($newPassword!=$verifyPassword) {
            $errors['verifyPassword'] = "Can not match passwords.";
        }

        $password = $user->password;

        if (!Hash::check($oldPassword, $password)) {
            $errors['oldPassword'] = 'Password incorrect';
        }

        if (!empty($errors)) {
            return response()->json([
                'success'=> false,
                'message'=> 'Can not validate some inputs',
                'details'=> $errors
            ]);
        }

        $user->password = Hash::make($newPassword);
        $user->save();

        return response()->json([
            'success'=> true,
            'message'=> "Successfully changed the password"
        ]);
    }
}
