<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Collection;


class Email extends Base
{
    protected $fillable = [
        'name','email','roll_id'
    ];

    public function designation()
    {
        return $this->hasOne(Designation::class, 'roll_id', 'id');
    }
}
