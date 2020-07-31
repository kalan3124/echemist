<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Collection;

/**
 * Province Model
 *
 * @property string $name
 * @property Collection|District[] $districts
 */
class Province extends Base
{
    protected $fillable = [
        'name','no'
    ];

    public function districts()
    {
        return $this->hasMany(District::class, 'province_id', 'id');
    }
}
