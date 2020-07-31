<?php
namespace App\Http\Controllers\API\Shop\V1;

use App\Exceptions\APIException;
use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\District;
use App\Models\Province;
use Illuminate\Http\Request;

class AreaController extends Controller
{
    public function loadProvinces()
    {
        $provinces = Province::get();

        return response()->json([
            'success'=> true,
            'provinces'=>$provinces->map(function (Province $province) {
                return [
                    'id'=> $province->getKey(),
                    'name'=> $province->name
                ];
            })
        ]);
    }

    public function loadDistricts(Request $request)
    {
        $provinceId = $request->input('provinceId');

        if (!$provinceId) {
            /*APIE4*/
            throw new APIException("Invalid Request", 4);
        }

        $districts = District::where('province_id', $provinceId)->get();


        return response()->json([
            'success'=> true,
            'districts'=> $districts->map(function (District $district) {
                return [
                    'id'=> $district->getKey(),
                    'name'=> $district->name,
                    'provinceId'=> $district->province_id
                ];
            })
        ]);
    }

    public function loadCities(Request $request)
    {
        $districtId = $request->input('districtId');


        if (!$districtId) {
            /*APIE6*/
            throw new APIException("Invalid Request", 6);
        }

        $cities = City::where('district_id', $districtId)->get();

        return response()->json([
            'success'=> true,
            'cities'=> $cities->map(function (City $city) {
                return [
                    'id'=>$city->getKey(),
                    'name'=> $city->name,
                    'districtId'=> $city->district_id
                ];
            })
        ]);
    }
}
