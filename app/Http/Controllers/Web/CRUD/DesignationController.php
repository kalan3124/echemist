<?php
namespace App\Http\Controllers\Web\CRUD;

use App\Exceptions\APIException;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Designation;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DesignationController extends Controller
{
    public function dropdown(Request $request)
    {
        return response()->json([
            'success'=> true,
            'items'=> Designation::get()->map(function (Designation $designation) {
                return [
                    'value'=> $designation->getKey(),
                    'label'=> $designation->designation
                ];
            })
        ]);
    }
}
