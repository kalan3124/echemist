<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Collection;

/**
 * Category Model
 *
 * @property string $name
 * @property int $supplier_id
 *
 * @property Supplier $supplier
 * @property Product[]|Collection $products
 */
class Category extends Base
{
    protected $fillable = [
        'name', 'supplier_id','no'
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id', 'id');
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'category_id', 'id');
    }
}
