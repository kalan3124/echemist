<?php

use App\Models\Supplier;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if(Supplier::count())
            return;

        Supplier::create([
            'name'=>'Supplier 1',
            'logo'=>null,
            'address'=>'supplier 1 road',
            'user_id'=>2,
        ]);


        Supplier::create([
            'name'=>'Supplier 2',
            'logo'=>null,
            'address'=>'supplier 2 road',
            'user_id'=>3,
        ]);
    }
}
