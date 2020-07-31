<?php


use Illuminate\Support\Facades\Route;


Route::group(['prefix'=>'user'],function(){
    Route::post('/login','UserController@login');
    Route::post('/status','UserController@status')->middleware('auth:api');
});


Route::group(['middleware'=>'auth:api'],function(){
    Route::group(['prefix'=>'crud','namespace'=>'CRUD'],function(){
        Route::group(['prefix'=>'province'],function(){
            Route::post('info','ProvinceController@info');
            Route::post('search','ProvinceController@search');
            Route::post('create','ProvinceController@create');
            Route::post('update','ProvinceController@update');
            Route::post('delete','ProvinceController@delete');
            Route::post('dropdown','ProvinceController@dropdown');
        });

        Route::group(['prefix'=>'district'],function(){
            Route::post('info','DistrictController@info');
            Route::post('search','DistrictController@search');
            Route::post('create','DistrictController@create');
            Route::post('update','DistrictController@update');
            Route::post('delete','DistrictController@delete');
            Route::post('dropdown','DistrictController@dropdown');
        });

        Route::group(['prefix'=>'city'],function(){
            Route::post('info','CityController@info');
            Route::post('search','CityController@search');
            Route::post('create','CityController@create');
            Route::post('update','CityController@update');
            Route::post('delete','CityController@delete');
            Route::post('dropdown','CityController@dropdown');
        });

        Route::group(['prefix'=>'productCategory'],function(){
            Route::post('info','ProductCategoryController@info');
            Route::post('search','ProductCategoryController@search');
            Route::post('create','ProductCategoryController@create');
            Route::post('update','ProductCategoryController@update');
            Route::post('delete','ProductCategoryController@delete');
            Route::post('dropdown','ProductCategoryController@dropdown');
        });

        Route::group(['prefix'=>'supplier'],function(){
            Route::post('info','SupplierController@info');
            Route::post('search','SupplierController@search');
            Route::post('create','SupplierController@create');
            Route::post('update','SupplierController@update');
            Route::post('delete','SupplierController@delete');
            Route::post('dropdown','SupplierController@dropdown');
        });

        Route::group(['prefix'=>'product'],function(){
            Route::post('info','ProductController@info');
            Route::post('search','ProductController@search');
            Route::post('create','ProductController@create');
            Route::post('update','ProductController@update');
            Route::post('delete','ProductController@delete');
            Route::post('dropdown','ProductController@dropdown');
        });

        Route::group(['prefix'=>'shop'],function(){
            Route::post('info','ShopController@info');
            Route::post('search','ShopController@search');
            Route::post('create','ShopController@create');
            Route::post('update','ShopController@update');
            Route::post('delete','ShopController@delete');
            Route::post('dropdown','ShopController@dropdown');
        });

        Route::group(['prefix'=>'designation'],function(){
            // Route::post('info','ShopController@info');
            // Route::post('search','ShopController@search');
            // Route::post('create','ShopController@create');
            // Route::post('update','ShopController@update');
            // Route::post('delete','ShopController@delete');
            Route::post('dropdown','DesignationController@dropdown');
        });
    });

    Route::group(['prefix'=>'order'],function(){
        Route::post('search','OrderController@search');
        Route::post('details','OrderController@details');
        Route::post('save','OrderController@save');
        Route::post('price','OrderController@getPrice');
    });

    Route::group(['prefix'=>'shop_view'],function(){
        Route::post('search','ShopViewController@search');
    });

    Route::group(['prefix'=>'add_product'],function(){
        Route::post('save','ProductAddController@save');
    });

    Route::group(['prefix'=>'add_email'],function(){
        Route::post('save','EmailListController@save');
    });
});
