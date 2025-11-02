<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // 全データ取得
        $items = Todo::all();
        return response()->json([
            'data' => $items
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // データ追加
        $item = Todo::create([
            // 新規作成のためin_doneは未完了
            'task' => $request->input('task'),
            'is_done' => 0
        ]);
        return response()->json([
            'data' => $item
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Todo $todo)
    {
        // データ更新
        if ($todo->is_done == 0) {
            $reverse = 1;
        } else {
            $reverse = 0;
        }
        // is_doneを反転させる
        $update = [
            'is_done' => $reverse
        ];
        $item = Todo::where('id', $todo->id)->update($update);

        if ($item) {
            return response()->json([
                'message' => 'Updated successfully',
            ], 200);
        } else {
            return response()->json([
                'message' => 'Not found',
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Todo $todo)
    {
        // データ削除
        $item = Todo::where('id', $todo->id)->delete();
        if ($item) {
            return response()->json([
                'message' => 'Delete successfully'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Not found'
            ], 404);
        }
    }
}
