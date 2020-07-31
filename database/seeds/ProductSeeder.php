<?php

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if(Product::count())
            return;

        Product::create([
            'name'=>'Haritha 50mg',
            'code'=>'H50',
            'supplier_id'=>1,
            'category_id'=>1,
        ]);

        Product::create([
            'name'=>'Haritha 250mg',
            'code'=>'H250',
            'supplier_id'=>1,
            'category_id'=>1,
        ]);

        Product::create([
            'name'=>'Zesta 50mg',
            'code'=>'Z50',
            'supplier_id'=>1,
            'category_id'=>2,
        ]);

        Product::create([
            'name'=>'Zesta 250mg',
            'code'=>'Z250',
            'supplier_id'=>1,
            'category_id'=>2,
        ]);

        Product::create([
            'name'=>'Siddhalepa Balm 50mg',
            'code'=>'B50',
            'supplier_id'=>2,
            'category_id'=>3,
        ]);

        Product::create([
            'name'=>'Siddhalepa Balm 250mg',
            'code'=>'B250',
            'supplier_id'=>2,
            'category_id'=>3,
        ]);

        Product::create([
            'name'=>'Inhaler 2W',
            'code'=>'I2W',
            'supplier_id'=>2,
            'category_id'=>4,
        ]);

        Product::create([
            'name'=>'Inhaler 1M',
            'code'=>'I1M',
            'supplier_id'=>2,
            'category_id'=>4,
        ]);
    }
}
