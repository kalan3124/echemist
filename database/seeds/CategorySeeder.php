<?php

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if(Category::count())
            return;

        Category::create([
            'name'=> 'Haritha Tea',
            'supplier_id'=>1
        ]);

        Category::create([
            'name'=> 'Zesta',
            'supplier_id'=> 1
        ]);

        Category::create([
            'name'=> 'Balm',
            'supplier_id'=>2
        ]);

        Category::create([
            'name'=> 'Inhaler',
            'supplier_id'=> 2
        ]);
    }
}
