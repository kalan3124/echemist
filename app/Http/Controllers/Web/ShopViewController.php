<?php
namespace App\Http\Controllers\Web;

use App\Exceptions\APIException;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderLine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ShopViewController extends Controller
{
    public function search(Request $request)
    {
        $provinceId = $request->input('parameters.province.value');
        $districtId = $request->input('parameters.district.value');
        $cityId = $request->input('parameters.city.value');
        $dealerName = $request->input('parameters.dealerName');
        $page = $request->input('page');
        $perPage = $request->input('perPage');

        $orderQuery = DB::table('shops AS s')
            ->join('cities AS c', 'c.id', 's.city_id')
            ->join('districts AS d', 'd.id', 'c.district_id')
            ->join('provinces AS p', 'p.id', 'd.province_id')
            ->select([
                's.name AS shopName',
                'c.name AS cityName',
                'd.name AS districtName',
                'p.name AS provinceName',
                's.address AS address',
            ]);

        if ($districtId) {
            $orderQuery->where('d.id', $districtId);
        }

        if ($provinceId) {
            $orderQuery->where('p.id', $provinceId);
        }

        if ($cityId) {
            $orderQuery->where('c.id', $cityId);
        }

        if (!empty(trim($dealerName))) {
            $orderQuery->where('s.name', 'LIKE', "%{trim($dealerName)}%");
        }

        $count = $orderQuery->count();

        $orderQuery->skip($page*$perPage);

        $orderQuery->limit($perPage);

        $results = $orderQuery->get();

        if (!$results->count()) {
            throw new APIException("No results for your input.");
        }

        return response()->json([
            'success'=> true,
            'results'=> $results,
            'count'=> $count
        ]);
    }
}
