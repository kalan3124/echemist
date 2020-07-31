<?php

use App\Models\District;
use Illuminate\Database\Seeder;

class DistrictTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        if(District::count())
            return;


        District::create([
            'name'=> 'Kalutara District',
            'province_id'=>1
        ]);

        District::create([
            'name'=> 'Colombo District',
            'province_id'=>1
        ]);

        District::create([
            'name'=> 'Galle District',
            'province_id'=>2,
        ]);

        District::create([
            'name'=> 'Hambantota District',
            'province_id'=>2,
        ]);
    }
}
