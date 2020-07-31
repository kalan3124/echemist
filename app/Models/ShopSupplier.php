<?php
namespace App\Models;

/**
 * Shop have more suppliers
 *
 * @property int $shop_id
 * @property int $supplier_id
 *
 * @property Shop $shop
 * @property Supplier $supplier
 */
class ShopSupplier extends Base
{
    protected $fillable =   [
        'shop_id','supplier_id'
    ];

    public function shop()
    {
        return $this->belongsTo(Shop::class, 'shop_id', 'id');
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id', 'id');
    }
}
