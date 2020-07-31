<?php
namespace App\Http\Controllers\API\Shop\V1;

use App\Exceptions\APIException;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\Shop;
use App\Models\ShopSupplier;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function load()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $shop = Shop::where('user_id', $user->getKey())->first();

        if (!$shop) {
            throw new APIException("User doesn't have products");
        }

        $suppliers = ShopSupplier::where('shop_id', $shop->getKey())
            ->get();

        $categories = Category::with('products')
            ->whereIn('supplier_id', $suppliers->pluck('supplier_id')->all())
            ->get();

        return response()->json([
            'success'=> true,
            'categories'=> $categories->map(function (Category $category) {
                return [
                    'id'=> $category->getKey(),
                    'name'=> $category->name,
                    "supplierId"=> $category->supplier_id,
                    'products'=> $category->products->map(function (Product $product) {
                        return [
                            'id'=> $product->getKey(),
                            'name'=> $product->name,
                            "supplierId"=> $product->supplier_id
                        ];
                    })
                ];
            })
        ]);
    }
}
