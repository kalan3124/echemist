<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Collection;

/**
 * Base model
 *
 * @property int $id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon $deleted_at
 *
 * @method static static find(int number)
 * @method static static create(array data)
 * @method static static where(...$data)
 * @method static where(...$data)
 * @method static first()
 * @method static latest()
 * @method static with(...$data)
 * @method Collection|static[] all()
 * @method Collection|static[] get()
 */
class Base extends Model
{
    use SoftDeletes;

    protected $dates = [
        'created_at','updated_at','deleted_at'
    ];
}
