class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.integer :user_id
      t.integer :category_id
      t.string :postname
      t.string :title
      t.text :content
      t.string :status
      t.datetime :published_at

      t.timestamps
    end
    add_index :posts, :postname, unique: true
  end
end
