class CreatePostOptions < ActiveRecord::Migration[6.0]
  def change
    create_table :post_options do |t|
      t.integer :thumbnail_image_id
      t.string :description
      t.string :canonical
      t.boolean :noindex
      t.boolean :nofollow

      t.timestamps
    end
  end
end
