## usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_name|string|null: false, foreign_key: true|
|e_mail|string|null: false|
|encrypted_password|string|null: false|

### Association
- has_many :members
- has_many :groups, :through: :members



## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, foreign_key: true|

### Association
- has_many :members
- has_many :photos, :through: :members



## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|string|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user