<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Collection;

/**
 * City Model
 *
 * @property string $name
 * @property int $district_id
 * @property District $district
 *
 * @property Collection|Shop[] $shops
 */
class City extends Base
{
    protected $fillable = [
        'name','district_id','no'
    ];

    public function district()
    {
        return $this->belongsTo(District::class, 'district_id', 'id');
    }

    public function shops()
    {
        return $this->hasMany(Shop::class, 'shop_id', 'id');
    }
}
