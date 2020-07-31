<?php

use App\Models\City;
use Illuminate\Database\Seeder;

class CityTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if(City::count())
            return true;

        City::create([
            'name'=> 'Panadura',
            'district_id'=>1
        ]);

        City::create([
            'name'=> 'Kalutara',
            'district_id'=>1
        ]);

        City::create([
            'name'=>'Dehiwala',
            'district_id'=>2,
        ]);

        City::create([
            'name'=>'Wallawatta',
            'district_id'=>2
        ]);
    }
}
