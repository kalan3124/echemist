<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

/**
 * User model
 *
 * @property int $id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon $deleted_at
 * @property string $name
 * @property string $email
 * @property string $password
 * @property string $mobile
 * @property string $username or NIC
 * @property int $user_type_id
 * @property UserType $userType
 * @property Shop $shop
 * @property Supplier $supplier
 *
 * @method static static find(int number)
 * @method static static create(array data)
 * @method static static where(...$data)
 * @method static where(...$data)
 * @method static first()
 * @method static latest()
 * @method static with(...$data)
 * @method Collection|static[] all()
 * @method Collection|static[] get()
 */
class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','mobile','user_type_id', 'username'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function userType()
    {
        return $this->belongsTo(UserType::class, 'user_type_id', 'id');
    }

    public function shop()
    {
        return $this->hasOne(Shop::class, 'user_id', 'id');
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'id', 'user_id');
    }
}
