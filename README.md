## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, foreign_key: true|
|email|string|null: false|
|encrypted_password|string|null: false|

### Association
- has_many :groups, through: :members
- has_many :messages
- has_many :members



## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, foreign_key: true|

### Association
- has_many :photos, through: :members
- has_many :messages
- has_many :members


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
- 画像はActive Storageでアップロード機能を実装する→messagesテーブルと紐付ける


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user