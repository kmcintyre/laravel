<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Contest extends Model {

	 /**
         * The database table used by the model.
         *
         * @var string
         */
        protected $table = 'contests';

         /**
         * The attributes that are mass assignable.
         *
         * @var array
         */
        protected $fillable = ['contestname', 'prizepool', 'entryfee', 'entries', 'maxentries', 'league', 'starts_at'];

}
