<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nivel extends Model
{
    use HasFactory;

    protected $table    = 'nivel';
    public $timestamps  = false;
    protected $fillable = ['nivel'];

    public function desenvolvedores(){
        return $this->hasMany(Desenvolvedor::class, 'nivel_id', 'id');
    }

}
