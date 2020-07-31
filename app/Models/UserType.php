<?php
namespace App\Models;

/**
 * User Type Model
 *
 * @property string $name
 */
class UserType extends Base
{
    protected $table = 'user_types';

    protected $fillable = [
        'name'
    ];
}
