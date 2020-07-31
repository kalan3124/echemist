<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SetImagesColumnNullable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->string('image')->nullable(true)->change();
        });

        Schema::table('suppliers', function (Blueprint $table) {
            $table->string('logo')->nullable(true)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->string('image')->nullable(false)->change();
        });

        Schema::table('suppliers', function (Blueprint $table) {
            $table->string('logo')->nullable(false)->change();
        });
    }
}
