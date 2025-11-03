# Todo_List_API(TodoリストAPI)

## 環境構築
Dockerビルド
1. git clone git@github.com:hirata784/Todo_List_API.git
2. DockerDesktopアプリを立ち上げる
3. cd Memo_API
4. docker-compose up -d --build

＊MySQLは、OSによって起動しない場合があるのでそれぞれのPCに合わせてdocker-compose.ymlファイルを編集して下さい。

## Laravel環境構築
1. docker-compose exec php bash
2. composer install
3. cp .env.example .env
4. .envに以下の環境変数を変更する
``` text
DB_HOST=mysql
DB_DATABASE=laravel_db
DB_USERNAME=laravel_user
DB_PASSWORD=laravel_pass
```
5. アプリケーションキーの作成
``` bash
php artisan key:generate
```
6. マイグレーションの実行
``` bash
php artisan migrate
```
7. シーディングの実行
``` bash
php artisan db:seed
```

## 使用方法
Todoリストを作成できます。  

1. タスクの追加  
「Todoリストの追加」下のテキストボックスにタスクを入力します。  
「追加」ボタンで上のTodoリストに入力内容が追加されます。  
未入力のままボタンを押すとエラーになります。

2. Todoリストの更新  
「完了」ボタンを押すと、同じ行のタスクに取消線が追加されます。  
「未完了」ボタンを押すと、タスクの取消線がなくなります。  

3. タスクの削除  
必要無くなったタスクは「削除」ボタンで削除することができます。  

## その他の機能
・APIエラー時に詳細エラーをアラートで表示しました。  

## 使用技術
- PHP 7.4.9
- Laravel 8.83.29
- MySQL 8.0.26