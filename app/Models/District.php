<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Collection;

/**
 * District Model
 *
 * @property string $name
 * @property int $province_id
 *
 * @property Province $province
 * @property City[]|Collection $cities
 */
class District extends Base
{
    protected $fillable = [
        'name','province_id','no'
    ];

    public function province()
    {
        return $this->belongsTo(Province::class, 'province_id', 'id');
    }

    public function cities()
    {
        return $this->hasMany(City::class, 'district_id', 'id');
    }
}
