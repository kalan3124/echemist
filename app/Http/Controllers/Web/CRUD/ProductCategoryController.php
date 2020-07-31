<?php
namespace App\Http\Controllers\Web\CRUD;

use App\Exceptions\APIException;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Supplier;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    public function info(Request $request)
    {
        return response()->json([
            'success'=> true,
            'info'=>[
                'title'=>'Product Category',
                'create'=>true,
                'update'=>true,
                'inputs'=>[
                    'no'=>[
                        'type'=> 'text',
                        'name'=> 'no',
                        'label'=> 'No',
                    ],
                    'name'=>[
                        'type'=>'text',
                        'name'=>'name',
                        'label'=>'Name'
                    ]
                ]
            ]
        ]);
    }

    public function search(Request $request)
    {

        $page = $request->input('page', 0);
        $perPage = $request->input('perPage', 25);

        $categories = Category::with('supplier')
            ->skip($page*$perPage)
            ->limit($perPage)
            ->get();

        return response()->json([
            'success'=> true,
            'results'=> $categories->map(function (Category $category) {
                return [
                    'id'=> $category->getKey(),
                    'name'=> $category->name,
                    'no'=> $category->no
                ];
            }),
            'count'=> Category::count()
        ]);
    }

    public function create(Request $request)
    {
        $name = $request->input('values.name');
        if (strlen($name)<3) {
            throw new APIException("Invalid Name Supplied");
        }

        $no = $request->input('values.no');
        // $supplier = Supplier::find($supplierId);
        // if (!$supplier) {
        //     throw new APIException("Supplier field is required");
        // }

        Category::create([
            'name'=>$name,
            'supplier_id'=> $no
        ]);

        return response()->json([
            'success'=> true,
            'message'=> "Successfully created the category!"
        ]);
    }

    public function update(Request $request)
    {
        $id = $request->input('id');
        $name = $request->input('values.name');
        $no = $request->input('values.no');
        if (strlen($name)<3) {
            throw new APIException("Invalid Name Supplied");
        }

        // $supplierId = $request->input('values.supplier.value', 0);
        // $supplier = Supplier::find($supplierId);
        // if (!$supplier) {
        //     throw new APIException("Supplier field is required");
        // }

        $category = Category::find($id);

        if (!$category) {
            throw new APIException("Invalid request");
        }

        $category->name = $name;
        $category->no = $no;
        $category->save();

        return response()->json([
            'success'=> true,
            'message'=> "Successfully updated the category!"
        ]);
    }

    public function delete(Request $request)
    {
        $id = $request->input('id');

        $category = Category::find($id);

        if (!$category) {
            throw new APIException("Invalid request");
        }

        $category->delete();

        return response()->json([
            'success'=> true,
            'message'=> "Successfully deleted the category!"
        ]);
    }

    public function dropdown(Request $request)
    {
        return response()->json([
            'success'=> true,
            'items'=> Category::get()->map(function (Category $province) {
                return [
                    'value'=> $province->getKey(),
                    'label'=> $province->name
                ];
            })
        ]);
    }
}
