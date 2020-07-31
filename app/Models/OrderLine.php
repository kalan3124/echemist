<?php
namespace App\Models;

/**
 * Order Line Model
 *
 * @property int $product_id
 * @property int $qty
 * @property int $order_id
 * @property Product $product
 * @property Order $order
 */
class OrderLine extends Base
{
    protected $fillable =  [
        'product_id','qty','order_id'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id', 'id');
    }
}
