<?php
namespace App\Http\Controllers\Web;

use App\Exceptions\APIException;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderLine;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductAddController extends Controller
{
    public function save(Request $request)
    {
        foreach ($request->products as $key => $value) {
            Product::create([
                'code'=>"",
                'name' => $value['name'],
                'supplier_id'=>null,
                'category_id'=>$value['category']['value'],
                'price' => $value['price']
            ]);
        }

        return response()->json([
            'success'=> true,
            'message'=> "Successfully Data saved!!!"
        ]);
    }
}
