<?php

use App\Models\Province;
use Illuminate\Database\Seeder;

class ProvinceTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if(Province::count())
            return;

        Province::create([
            'name'=>'Western Province'
        ]);

        Province::create([
            'name'=> 'Southern Province'
        ]);
    }
}
