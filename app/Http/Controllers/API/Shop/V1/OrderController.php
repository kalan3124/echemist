<?php
namespace App\Http\Controllers\API\Shop\V1;

use App\Exceptions\APIException;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderLine;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function save(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $shop = Shop::where('user_id', $user->getKey())->latest()->first();

        if (!$shop) {
            /*APIE15*/
            throw new APIException("Please complete your profile first.", 15);
        }

        $validation = Validator::make($request->all(), [
            'order.number'=>'required',
            'order.time'=>'required|numeric',
            'order.lines'=> 'required|array',
            'order.lines.*.product'=> 'required|array',
            'order.lines.*.product.id'=>'required|numeric|exists:products,id',
            'order.lines.*.qty'=>'required|numeric'
        ]);

        if ($validation->fails()) {
            /*APIE14*/
            throw new APIException("Can not validate your request", 14);
        }

        $orderNumber = $request->input('order.number');
        $orderTime = $request->input('order.time');
        $orderLines = $request->input('order.lines');

        try {
            DB::beginTransaction();

            $order = Order::create([
                'number'=> $orderNumber,
                'tab_created_at'=> date('Y-m-d H:i:s', $orderTime/1000),
                'shop_id'=> $shop->getKey()
            ]);

            foreach ($orderLines as $line) {
                OrderLine::create([
                    'qty'=>$line['qty'],
                    'product_id'=> $line['product']['id'],
                    'order_id'=> $order->getKey()
                ]);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();

            /*APIE16*/
            throw new APIException("Server error appeared.", 16);
        }

        return response()->json([
            'success'=> true,
            'message'=> "Successfully placed your order!"
        ]);
    }
}
