<?php
namespace App\Http\Controllers\Web\CRUD;

use App\Exceptions\APIException;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function info(Request $request)
    {
        return response()->json([
            'success'=> true,
            'info'=>[
                'title'=>'Product',
                'create'=>true,
                'update'=>true,
                'inputs'=>[
                    'code'=>[
                        'type'=>'text',
                        'name'=>'code',
                        'label'=>'Code'
                    ],
                    'name'=>[
                        'type'=>'text',
                        'name'=>'name',
                        'label'=>'Name'
                    ],
                    'supplier'=>[
                        'type'=> 'dropdown',
                        'name'=> 'supplier',
                        'label'=> 'Supplier',
                        'link'=>'supplier'
                    ],
                    'category'=>[
                        'type'=> 'dropdown',
                        'name'=> 'category',
                        'label'=> 'Category',
                        'link'=>'productCategory',
                        'basedOn'=>['supplier']
                    ]
                ]
            ]
        ]);
    }

    public function search(Request $request)
    {

        $page = $request->input('page', 0);
        $perPage = $request->input('perPage', 25);

        $products = Product::with(['category','supplier'])
            ->skip($page*$perPage)
            ->limit($perPage)
            ->get();

        return response()->json([
            'success'=> true,
            'results'=> $products->map(function (Product $product) {
                return [
                    'id'=> $product->getKey(),
                    'name'=> $product->name,
                    'code'=> $product->code,
                    'category'=> $product->category?[
                        'label'=> $product->category->name,
                        'value'=> $product->category->getKey(),
                    ]:null,
                    'supplier'=> $product->supplier?[
                        'label'=> $product->supplier->name,
                        'value'=> $product->supplier->getKey(),
                    ]:null,
                ];
            }),
            'count'=> Product::count()
        ]);
    }

    public function create(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'values'=>'required|array',
            'values.name'=> 'required',
            'values.code'=> 'required',
            'values.category'=>'required|array',
            'values.category.value'=>'required|numeric|exists:categories,id',
            'values.supplier'=>'required|array',
            'values.supplier.value'=>'required|numeric|exists:suppliers,id',
        ]);

        if ($validation->fails()) {
            throw new APIException($validation->errors()->first());
        }

        Product::create([
            'name'=>$request->input('values.name'),
            'code'=>$request->input('values.code'),
            'category_id'=>$request->input('values.category.value'),
            'supplier_id'=>$request->input('values.supplier.value'),
        ]);

        return response()->json([
            'success'=> true,
            'message'=> "Successfully created the product!"
        ]);
    }

    public function update(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'id'=> 'required|numeric|exists:products,id',
            'values'=>'required|array',
            'values.name'=> 'required',
            'values.code'=> 'required',
            'values.category'=>'required|array',
            'values.category.value'=>'required|numeric|exists:categories,id',
            'values.supplier'=>'required|array',
            'values.supplier.value'=>'required|numeric|exists:suppliers,id',
        ]);

        if ($validation->fails()) {
            throw new APIException($validation->errors()->first());
        }

        $id = $request->input('id');

        $product= Product::find($id);

        $product->update([
            'name'=>$request->input('values.name'),
            'code'=>$request->input('values.code'),
            'category_id'=>$request->input('values.category.value'),
            'supplier_id'=>$request->input('values.supplier.value'),
        ]);

        return response()->json([
            'success'=> true,
            'message'=> "Successfully updated the product!"
        ]);
    }

    public function delete(Request $request)
    {
        $id = $request->input('id');

        $product = Product::find($id);

        if (!$product) {
            throw new APIException("Invalid request");
        }

        $product->delete();

        return response()->json([
            'success'=> true,
            'message'=> "Successfully deleted the product!"
        ]);
    }

    public function dropdown(Request $request)
    {
        // $categoryId = $request->input('parameters.category');

        // $category = Category::with('products')->find($categoryId);

        // if (!$category) {
        //     throw new APIException("Invalid Request!");
        // }

        // return response()->json([
        //     'success'=> true,
        //     'items'=> $category->products->map(function (Product $product) {
        //         return [
        //             'value'=> $product->getKey(),
        //             'label'=> $product->name
        //         ];
        //     })
        // ]);

        return response()->json([
            'success'=> true,
            'items'=> Product::get()->map(function (Product $product) {
                return [
                    'value'=> $product->getKey(),
                    'label'=> $product->name
                ];
            })
        ]);
    }
}
