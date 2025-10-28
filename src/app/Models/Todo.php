<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    // 保存可能なカラムを指定
    protected $fillable = [
        'task',
        'is_done',
    ];
}
