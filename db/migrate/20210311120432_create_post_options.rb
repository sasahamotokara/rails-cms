class CreatePostOptions < ActiveRecord::Migration[6.0]
  def change
    create_table :post_options do |t|
      t.integer :post_id
      t.text :description
      t.string :canonical
      t.boolean :noindex
      t.boolean :nofollow

      t.timestamps
    end
  end
end
