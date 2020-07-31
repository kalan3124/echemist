<?php
namespace App\Http\Controllers\API\Shop\V1;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderLine;
use App\Models\Shop;
use App\Models\ShopSupplier;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class TestController extends Controller
{
    public function deleteTestUser()
    {
        DB::statement("SET FOREIGN_KEY_CHECKS=0");
        $user = User::where('username', 'testshop')->first();

        $shop = Shop::where('user_id', $user->getKey())->latest()->first();

        if ($shop) {
            $orders = Order::where('shop_id', $shop->getKey())->get();

            // Deleting order lines
            OrderLine::whereIn('order_id', $orders->pluck('id')->all())->forceDelete();

            // Deleting supplier allocations
            ShopSupplier::where('shop_id', $shop->getKey())->forceDelete();

            Order::destroy($orders->pluck('id')->all());

            $shop->forceDelete();
        }

        $user->forceDelete();
        DB::statement("SET FOREIGN_KEY_CHECKS=1");

        return response()->json([
            'success'=> true
        ]);
    }
}
