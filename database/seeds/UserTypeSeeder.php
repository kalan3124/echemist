<?php

use App\Models\UserType;
use Illuminate\Database\Seeder;

class UserTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if(UserType::count())
            return;

        UserType::create([
            'name'=>'ADMIN'
        ]);

        UserType::create([
            'name'=> 'SUPPLIER'
        ]);

        UserType::create([
            'name'=> 'SHOP'
        ]);
    }
}
