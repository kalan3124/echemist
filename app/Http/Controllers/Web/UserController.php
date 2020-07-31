<?php
namespace App\Http\Controllers\Web;

use App\Exceptions\APIException;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');

        $user = User::where('username', $username)->latest()->first();

        if (!$user) {
            /*APIE1*/
            throw new APIException("UserNotFound", 1);
        }

        // if ($user->user_type_id!=config('app.user_types.admin')) {
        //     throw new APIException("User Forbidden");
        // }

        if (!Hash::check($password, $user->password)) {
            /*APIE3*/
            throw new APIException("WrongPassword", 3);
        }

        return response()->json([
            'success'=>true,
            'user'=>[
                'name'=> $user->name,
                'id'=> $user->getKey(),
                'email'=> $user->email,
                'type'=> $user->user_type_id,
                "token"=> $user->createToken('AppToken')->accessToken,
            ],
            "message"=> "Successfully logged in."
        ]);
    }

    public function status()
    {
        /** @var User $user */
        $user = Auth::user();

        return response()->json([
            'success'=>true,
            'user'=>[
                'name'=> $user->name,
                'id'=> $user->getKey(),
                'email'=> $user->email,
                'typeId'=> $user->user_type_id
            ],
            "message"=> "User Authenticated."
        ]);
    }

    public function forgetPassword()
    {
        return view('forget');
    }

    public function sendResetEmail(Request $request)
    {
        $email = $request->input('email');

        /** @var User $user */
        $user = User::orWhere('email', $email)
            ->orWhere('mobile', $email)
            ->orWhere('username', 'LIKE', $email)
            ->latest()
            ->first();

        if (!$user) {
            return view('email-sent', [
                'message'=> 'Sorry! We couldn\'t find a user for your input.
                Please check with another information.'
            ]);
        }


        Mail::send('emails.reset', [
            'name'=> $user->name,
            'username'=> $user->username,
            'password'=> $user->username,
            'hash'=> strtolower(base64_encode($user->username.$user->email)),
            'userId'=> $user->getKey()
        ], function (Message $mail) use ($user) {
            $mail->to($user->email);
            $mail->subject("Password Reset");
            $mail->from('smartdealer@ceylonlinux.lk', config('app.name'));
        });

        return view('email-sent', [
            'message'=> 'We have sent you an email.
                Please follow instructions in it. Thank You!'
        ]);
        ;
    }

    public function resetPassword(Request $request)
    {
        $hash = $request->input('hash');
        $userId = $request->input('user');

        $user = User::find($userId);

        if (!$user) {
            return view('email-sent', [
                'message'=> 'Sorry we couldn\'t find a user.
                Please contact web masters.'
            ]);
        }

        if (trim($hash)!== strtolower(base64_encode($user->username.$user->email))) {
            return view('email-sent', [
                'message'=> 'We can not reset your password at that time.
                Please contact web masters if you have any issue.'
            ]);
        }

        $user->password = Hash::make($user->username);

        $user->save();

        return redirect('/');
    }
}
