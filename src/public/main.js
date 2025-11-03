// APIのベースURL
const API_URL = "/api/todos";

// Todoリスト一覧読み込み
async function loadTodo() {
    // 変数宣言
    const container = document.getElementById("js-todos");
    // 最初にテーブルを空にする
    container.innerHTML = "";

    try {
        // APIからデータを取得
        const res = await fetch(API_URL);
        // ステータスコードを確認
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`サーバーエラー(${res.status}):${errorData.message || "詳細不明"}`);
        }
        // JSONに変換(レスポンスの中身をJavaScriptで扱える形にする)
        const data = await res.json();

        // trを作成
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <th>内容</th>
        <th>完了</th>
        <th>削除</th>
    `;
        // containerの中に追加
        container.appendChild(tr);

        // 取得した一覧をループしてHTMLに追加
        data.data.forEach((todo) => {
            // trを作成
            const tr = document.createElement("tr");
            // 完了・未完了更新より、見た目を変化する
            const classTask = todo.is_done == 1 ? "completion" : "";
            const classBtn = todo.is_done == 1 ? "notUpdate" : "updateBtn";
            const value = todo.is_done == 1 ? "未完了" : "完了";

            // Todoの内容・完了・削除ボタンを追加
            tr.innerHTML = `
            <td class="${classTask}">${todo.task}</td>
            <td class="btn"><button class="${classBtn}" onclick="updateTodo(${todo.id})">${value}</button></td>
            <td class="btn"><button class="deleteBtn" onclick="deleteTodo(${todo.id})">削除</button></td>
            `;

            // containerの中に追加
            container.appendChild(tr);
        });
    } catch (error) {
        console.error("タスクの取得に失敗しました:", error);
        alert(`タスクの取得に失敗しました。\n${error.message}`);
    }
}

// Todoリスト追加処理
async function addTodo() {
    // 変数宣言
    const taskInput = document.getElementById("js-task");
    // 現在の値を取得
    const task = taskInput.value;

    if (!task) {
        alert("タスクを入力してください");
        return;
    }

    try {
        // APIからデータを取得
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ task }),
        });

        // JSONに変換(レスポンスの中身をJavaScriptで扱える形にする)
        const data = await res.json();

        // バリデーションエラーを確認
        if (!res.ok) {
            if (data.errors) {
                document.getElementById("js-error").textContent = data.errors.task[0];
            }
            return;
        }

        loadTodo();
        // 入力値を削除
        taskInput.value = "";
    } catch (error) {
        console.error("タスクの追加に失敗しました:", error);
        alert(`タスクの追加に失敗しました。\n${error.message}`);
    }
}

// Todo更新処理
async function updateTodo(id) {
    try {
        // APIからデータを取得
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
        });
        loadTodo();
    } catch (error) {
        console.error("タスクの更新に失敗しました:", error);
        alert(`タスクの更新に失敗しました。\n${error.message}`);
    }
}

// Todoリスト削除処理
async function deleteTodo(id) {
    try {
        // APIからデータを取得
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
        loadTodo();
    } catch (error) {
        console.error("タスクの削除に失敗しました:", error);
        alert(`タスクの削除に失敗しました。\n${error.message}`);
    }
}

// クリックイベント
document.getElementById("addTodo").addEventListener("click", addTodo);
// 初期化
loadTodo();