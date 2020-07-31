<?php

namespace App\Http\Controllers\Web;

use App\Exceptions\APIException;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderLine;
use App\Models\Product;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function search(Request $request)
    {
        $user = Auth::user();

        $provinceId = $request->input('parameters.province.value');
        $districtId = $request->input('parameters.district.value');
        $cityId = $request->input('parameters.city.value');
        $dealerName = $request->input('parameters.dealerName');
        $page = $request->input('page');
        $perPage = $request->input('perPage');

        $orderQuery = DB::table('orders AS o')
            ->join('shops AS s', 's.id', 'o.shop_id')
            ->join('cities AS c', 'c.id', 's.city_id')
            ->join('districts AS d', 'd.id', 'c.district_id')
            ->join('provinces AS p', 'p.id', 'd.province_id')
            ->select([
                'o.number AS orderNumber',
                'o.tab_created_at AS createdAt',
                's.name AS shopName',
                'c.name AS cityName',
                'd.name AS districtName',
                'p.name AS provinceName',
                'o.id AS orderId',
                's.id'
            ]);

        if($user->user_type_id == config('app.user_types.chemist')){
            $shop = Shop::where('user_id',$user->id)->first();
            $orderQuery->where('o.shop_id', $shop->id);
        }

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

        $orderQuery->skip($page * $perPage);

        $orderQuery->limit($perPage);

        $results = $orderQuery->get();

        if (!$results->count()) {
            throw new APIException("No results for your input.");
        }

        return response()->json([
            'success' => true,
            'results' => $results,
            'count' => $count
        ]);
    }

    public function details(Request $request)
    {
        $orderId = $request->input('orderId');

        $order = Order::with(['orderLines', 'orderLines.product'])->find($orderId);

        if (!$order) {
            throw new APIException("Can not find an order to the given order number");
        }

        return response()->json([
            'success' => true,
            'order' => [
                'number' => $order->number,
                'time' => $order->tab_created_at,
                'lines' => $order->orderLines->map(function (OrderLine $orderLine) {
                    return [
                        'product' => $orderLine->product ? [
                            'price' => $orderLine->product->price,
                            'name' => $orderLine->product->name,
                            'code' => $orderLine->product->code,
                            'id' => $orderLine->product->getKey()
                        ] : [
                            'name' => 'DELETED',
                            'code' => 'N/A',
                            'id' => 0
                        ],
                        'qty' => $orderLine->qty
                    ];
                })
            ]
        ]);
    }


    public function save(Request $request)
    {
        $user = Auth::user();

        $count = DB::table('orders')->count();

        $number = 'O/' . str_pad(1+1, 5, 0, STR_PAD_LEFT);

        $chemist = Shop::where('user_id', $user->getKey())->first();

        try {
            DB::beginTransaction();

            $order = Order::create([
                'shop_id' => $chemist['id'],
                'number' => "",
            ]);

            foreach ($request->orders as $key => $value) {
                DB::table('order_lines')->insert([
                    'order_id' => $order->getKey(),
                    'product_id' => $value['product']['value'],
                    'qty' => $value['qty'],
                ]);
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }

        return response()->json([
            'success' => true,
            'message' => "Successfully Data saved!!!"
        ]);
    }

    public function getPrice(Request $request)
    {
        $pro = Product::where('id',$request->id)->first();

        return [
            'success' => true,
            'price' => $pro->price
        ];
    }
}
