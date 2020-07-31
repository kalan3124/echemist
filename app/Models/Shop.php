<?php
namespace App\Models;

/**
 * Shop Model
 *
 * @property string $name
 * @property string $image URL
 * @property string $address
 * @property int $city_id
 * @property int $user_id
 * @property int $completed_profile 0=No, 1= Yes
 * @property int $completed_suppliers 0=No, 1=Yes
 *
 * @property City $city
 * @property User $user
 */
class Shop extends Base
{
    protected $fillable = [
        'name','image','address','city_id','user_id','completed_profile','completed_suppliers'
    ];

    public function city()
    {
        return $this->belongsTo(City::class, 'city_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
