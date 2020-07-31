<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Collection;

/**
 * Order Model
 *
 * @property string $number
 * @property string $tab_created_at Timestamp
 * @property int $shop_id
 *
 * @property Shop $shop
 * @property Collection|OrderLine[] $orderLines
 */
class Order extends Base
{
    protected $fillable =  [
        'number','tab_created_at','shop_id'
    ];

    public function shop()
    {
        return $this->belongsTo(Shop::class, 'shop_id', 'id');
    }

    public function orderLines()
    {
        return $this->hasMany(OrderLine::class, 'order_id', 'id');
    }
}
