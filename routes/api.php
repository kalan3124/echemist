<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix'=>'shop/v1','namespace'=>'API\Shop\V1'], function(){
    require_once("api/shop/v1.php");
});


Route::group(['prefix'=>'web','namespace'=>'Web'], function(){
    require_once("api/web.php");
});

