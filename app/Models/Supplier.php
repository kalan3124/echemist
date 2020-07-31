<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Collection;

/**
 * Supplier Model
 *
 * @property string $name
 * @property string $logo URL
 * @property string $address
 * @property int $user_id
 * @property User $user
 * @property Collection|Category[] $categories
 */
class Supplier extends Base
{
    protected $fillable = [
        'name', 'logo' ,'address','user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function categories()
    {
        return $this->hasMany(Category::class, 'supplier_id', 'id');
    }
}
