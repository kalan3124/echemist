<?php

namespace App\Http\Controllers\API\Shop\V1;

use App\Exceptions\APIException;
use App\Http\Controllers\Controller;
use App\Models\Shop;
use App\Models\ShopSupplier;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SupplierController extends Controller
{

    public function load()
    {
        $suppliers = Supplier::get();

        return response()->json([
            'success' => true,
            'suppliers' => $suppliers->map(function (Supplier $supplier) {
                return [
                    'id' => $supplier->getKey(),
                    'name' => $supplier->name,
                    'image' => $supplier->logo? url('/storage/'. $supplier->logo):null
                ];
            })
        ]);
    }

    public function save(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $checked = $request->input('checked');

        $shop = Shop::where('user_id', $user->getKey())->latest()->first();

        if (!$shop) {
            /*APIE10*/
            throw new APIException("Please complete your profile first.", 10);
        }

        try {
            DB::beginTransaction();

            ShopSupplier::with('supplier')->where('shop_id', $shop->getKey())->forceDelete();

            foreach ($checked as $key => $supplierId) {
                ShopSupplier::create([
                    'shop_id' => $shop->getKey(),
                    'supplier_id' => $supplierId
                ]);
            }

            $shop->completed_suppliers = 1;
            $shop->save();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            /*APIE11*/
            throw new APIException("Invalid request!", 11);
        }

        return response()->json([
            'success' => true,
            'message' => "Successfully selected the suppliers."
        ]);
    }

    public function loadSelected(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $shop = Shop::where('user_id', $user->getKey())->latest()->first();

        if (!$shop) {
            /*APIE11*/
            throw new APIException("Please complete your profile first.", 10);
        }

        $selected = ShopSupplier::with('supplier')->where('shop_id', $shop->getKey())->get();

        return response()->json([
            'success'=> true,
            'suppliers'=> $selected->map(function (ShopSupplier $shopSupplier) {
                if (!$shopSupplier->supplier) {
                    return [
                        'id'=>0,
                        'name'=>'DELETED',
                        'image'=> null
                    ];
                }

                return [
                    'id'=>$shopSupplier->supplier->getKey(),
                    'name'=> $shopSupplier->supplier->name,
                    'image'=> $shopSupplier->supplier->logo? url('/storage/'.$shopSupplier->supplier->logo):null
                ];
            })
        ]);
    }
}
