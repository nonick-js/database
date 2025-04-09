# NoNICK.js Database
NoNICK.jsのデータベースに使用されるDrizzle ORMやZodのスキーマを管理するリポジトリ  

## 📑Usage

### 🔧 単体での使用法

このリポジトリは、単体でDrizzle ORMのスキーマ管理およびマイグレーションツールとして利用できます。

- `bun studio` ...`drizzle-kit studio`
- `bun generate` ... `drizzle-kit generate`
- `bun migrate` ... `drizzle-kit migrate`

> 実行前に `.env` ファイルをルートディレクトリに作成し、`DATABASE_URL` を設定してください。  
> ```
> DATABASE_URL="postgres://user:password@localhost:5432/mydb"
> ```

Drizzle Kitの詳細な使用方法については、[公式ドキュメント](https://orm.drizzle.team/docs/kit-overview) を参照してください。

---

### 🧩 他リポジトリでの使用法

このリポジトリのスキーマファイルは、他のリポジトリに追加して使用することができます。

- **Git Submodule** を使用する場合：
  ```bash
  git submodule add https://github.com/nonick-js/database path/to/submodule
  ```

- **Git Subtree** を使用する場合：
  ```bash
  git subtree add --prefix=path/to/subtree https://github.com/nonick-js/database main --squash
  ```
