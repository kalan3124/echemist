<?php
namespace App\Http\Controllers\Web;

use App\Exceptions\APIException;
use App\Http\Controllers\Controller;
use App\Models\Email;
use App\Models\Order;
use App\Models\OrderLine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmailListController extends Controller
{
    public function save(Request $request)
    {
        foreach ($request->emails as $key => $value) {
            Email::create([
                'name' => $value['name'],
                'email' => $value['email'],
                'roll_id' => $value['roll']['value']
            ]);
        }

        return response()->json([
            'success'=> true,
            'message'=> "Successfully Data saved!!!"
        ]);
    }
}
