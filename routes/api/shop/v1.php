<?php


use Illuminate\Support\Facades\Route;


Route::group(['prefix'=>'user'],function(){
    Route::post('/login','UserController@login');
    Route::post('/signup','UserController@signup');
    Route::post('/status','UserController@status')->middleware('auth:api');
    Route::post('/changePassword','UserController@changePassword')->middleware('auth:api');
});


Route::group(['middleware'=>'auth:api'],function(){
    Route::group(['prefix'=>'areas'],function(){
        Route::post('provinces','AreaController@loadProvinces');
        Route::post('districts','AreaController@loadDistricts');
        Route::post('cities','AreaController@loadCities');
    });

    Route::group(['prefix'=>'profile'],function(){
        Route::post('complete','ProfileController@complete');
        Route::post('load','ProfileController@load');
        Route::post('save','ProfileController@save');
    });

    Route::group(['prefix'=>'suppliers'],function(){
        Route::post('load','SupplierController@load');
        Route::post('save','SupplierController@save');
        Route::post('selected','SupplierController@loadSelected');
    });

    Route::group(['prefix'=>'products'],function(){
        Route::post('load', 'ProductController@load');
    });

    Route::group(['prefix'=>'orders'],function(){
        Route::post('save', 'OrderController@save');
    });


    Route::group(['prefix'=>'test'],function(){
        Route::post('clear', 'TestController@deleteTestUser');
    });
});
