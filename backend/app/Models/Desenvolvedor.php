<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DateTime;

class Desenvolvedor extends Model
{
    use HasFactory;

    protected $table    = 'desenvolvedores';
    public $timestamps  = false;
    protected $appends  = ['idade'];
    protected $fillable = ['nome','sexo','data_nascimento','hobby','nivel_id'];

    public function nivel(){
        return $this->belongsTo(Nivel::class, 'nivel_id', 'id');
    }

    public function getIdadeAttribute()
    {
        $dataNascimento = new DateTime($this->data_nascimento);
        $hoje           = new DateTime('today');
        $idade          = $dataNascimento->diff($hoje)->y;
        return $idade;
    }

}
