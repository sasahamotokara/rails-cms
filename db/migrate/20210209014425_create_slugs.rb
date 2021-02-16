class CreateSlugs < ActiveRecord::Migration[6.0]
  def change
    create_table :slugs do |t|
      t.string :slug
      t.integer :category_id
      t.integer :tag_id

      t.timestamps
    end
    add_index :slugs, :slug, unique: true
  end
end
