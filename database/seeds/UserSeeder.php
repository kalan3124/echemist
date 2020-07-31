<?php

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if(User::count())
            return;

        User::create([
            'name'=>'Admin',
            'email'=>'admin@ceylonlinux.lk',
            'password'=>Hash::make('123'),
            'mobile'=>'0710000000',
            'user_type_id'=>1,
            'username'=>'admin'
        ]);

        User::create([
            'name'=>'Supplier 1',
            'email'=>'supplier1@ceylonlinux.lk',
            'password'=>Hash::make('123'),
            'mobile'=>'0710000000',
            'user_type_id'=>2,
            'username'=>'supplier1'
        ]);

        User::create([
            'name'=>'Supplier 2',
            'email'=>'supplier2@ceylonlinux.lk',
            'password'=>Hash::make('123'),
            'mobile'=>'0710000000',
            'user_type_id'=>2,
            'username'=>'supplier2'
        ]);

    }
}
