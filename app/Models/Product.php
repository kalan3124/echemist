<?php
namespace App\Models;

/**
 * Product Model
 *
 * @property string $name
 * @property string $code
 * @property int $supplier_id
 * @property int $category_id
 * @property Supplier $supplier
 * @property Category $category
 */
class Product extends Base
{
    protected $fillable = ['name','code','supplier_id','category_id','price'];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id', 'id');
    }
}
