<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContestsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('contests', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('contestname')->default('New Contest');
			$table->decimal('prizepool',7,2)->default(100.00);
			$table->decimal('entryfee',7,2)->default(0.0);
			$table->integer('entries')->default(0);
			$table->integer('maxentries')->default(100);
			$table->string('league')->default('euro');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('contests');
	}

}
