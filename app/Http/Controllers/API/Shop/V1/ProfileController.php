<?php
namespace App\Http\Controllers\API\Shop\V1;

use App\Exceptions\APIException;
use App\Http\Controllers\Controller;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{

    public function complete(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'shopName'=>'required',
            'shopAddress'=> 'required',
            'city'=>'required|array',
            'city.id'=> 'required|numeric'
        ])->errors();

        $errors = [];


        if ($validation->has('shopName')) {
            $errors['shopName'] = "Shop name is required.";
        }

        if ($validation->has('shopAddress')) {
            $errors['shopAddress'] = "Shop address is required";
        }

        if ($validation->has('city')) {
            $errors['city'] = "City is required";
        }

        if (!empty($errors)) {
            return response()->json([
                'success'=> false,
                'message'=> "Can not validate some inputs",
                'details'=> $errors
            ]);
        }


        /** @var \App\Models\User $user */
        $user = Auth::user();

        $existShop = Shop::where('user_id', $user->getKey())
            ->latest()
            ->first();

        if ($existShop) {
            /*APIE7*/
            throw new APIException("Profile is already completed!", 7);
        }

        $shopName = $request->input('shopName');
        $shopAddress = $request->input('shopAddress');
        $city = $request->input('city.id');
        $image = $request->input('image');

        $imageUrl = null;

        if (!empty($image)) {
            //get the base-64 from data
            $base64_str = substr($image, strpos($image, ",")+1);

            //decode base64 string
            $image = base64_decode($base64_str);

            $safeName = time().'.'.'jpg';
            Storage::disk('public')->put('shops/'.$safeName, $image);

            $imageUrl = "shops/".$safeName;
        }

        Shop::create([
            'name'=>$shopName,
            'image'=>$imageUrl,
            'address'=>$shopAddress,
            'city_id'=>$city,
            'user_id'=>$user->getKey(),
            'completed_profile'=>1,
            'completed_suppliers'=>0,
        ]);

        $user->name = $shopName;
        $user->save();

        return response()->json([
            'success'=> true,
            'message'=> "Successfully completed your profile."
        ]);
    }

    public function load()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $shop = Shop::with(['city','city.district','city.district.province'])
            ->where('user_id', $user->getKey())
            ->latest()
            ->first();

        if (!$shop) {
            /*APIE8*/
            throw new APIException("Invalid request.", 8);
        }

        return response()->json([
            'success'=>true,
            'profile'=>[
                'image'=> $shop->image? url('/storage/'.$shop->image):null,
                'shopName'=> $shop->name,
                'shopAddress'=> $shop->address,
                'province'=> $shop->city&&
                            $shop->city->district&&
                            $shop->city->district->province ?[
                    'id'=> $shop->city->district->province->getKey(),
                    'name'=>$shop->city->district->province->name,
                ]: [
                    'id'=>0,
                    'name'=> 'DELETED',
                ],
                'district'=> $shop->city&& $shop->city->district ?[
                    'id'=> $shop->city->district->getKey(),
                    'name'=>$shop->city->district->name,
                    'provinceId'=> $shop->city->district->province_id
                ]: [
                    'id'=>0,
                    'name'=> 'DELETED',
                    'provinceId'=>0
                ],
                'city'=> $shop->city?[
                    'id'=> $shop->city->getKey(),
                    'name'=>$shop->city->name,
                    'districtId'=> $shop->city->district_id
                ]: [
                    'id'=>0,
                    'name'=> 'DELETED',
                    'districtId'=>0
                ],
                'mobileNumber'=> $user->mobile,
                'email'=> $user->email
            ]
        ]);
    }

    public function save(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'profile'=>'required|array',
            'profile.shopName'=>'required',
            'profile.shopAddress'=> 'required',
            'profile.city'=>'required|array',
            'profile.city.id'=> 'required|numeric',
            'profile.mobileNumber'=> 'required|min:7',
            'profile.email'=>'required|email'
        ])->errors();

        $errors = [];


        if ($validation->has('shopName')) {
            $errors['shopName'] = "Shop name is required.";
        }

        if ($validation->has('shopAddress')) {
            $errors['shopAddress'] = "Shop address is required";
        }

        if ($validation->has('city')) {
            $errors['city'] = "City is required";
        }

        if ($validation->has('mobileNumber')) {
            $errors['mobileNumber'] = "Invalid mobile number";
        }

        if ($validation->has('email')) {
            $errors['email']="Invalid email address";
        }

        if (!empty($errors)) {
            return response()->json([
                'success'=> false,
                'message'=> "Can not validate some inputs",
                'details'=> $errors
            ]);
        }


        /** @var \App\Models\User $user */
        $user = Auth::user();

        $existShop = Shop::where('user_id', $user->getKey())
            ->latest()
            ->first();

        if (!$existShop) {
            /*APIE9*/
            throw new APIException("Profile is not completed!", 9);
        }

        $shopName = $request->input('profile.shopName');
        $shopAddress = $request->input('profile.shopAddress');
        $city = $request->input('profile.city.id');
        $image = $request->input('profile.image');
        $mobileNumber = $request->input('profile.mobileNumber');
        $email = $request->input('profile.email');

        $imageUrl = null;

        if (!empty($image)) {
            //get the base-64 from data
            $base64_str = substr($image, strpos($image, ",")+1);

            //decode base64 string
            $image = base64_decode($base64_str);

            $safeName = time().'.'.'jpg';
            Storage::disk('public')->put('shops/'.$safeName, $image);

            $imageUrl = "shops/".$safeName;
        }

        $existShop->update([
            'name'=>$shopName,
            'image'=>$imageUrl,
            'address'=>$shopAddress,
            'city_id'=>$city,
            'user_id'=>$user->getKey()
        ]);

        $user->name = $shopName;
        $user->mobile = $mobileNumber;
        $user->email = $email;
        $user->save();

        return response()->json([
            'success'=> true,
            'message'=> "Successfully completed your profile."
        ]);
    }
}
