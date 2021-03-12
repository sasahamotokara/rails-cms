class CreateTerms < ActiveRecord::Migration[6.0]
  def change
    create_table :terms do |t|
      t.string :slug
      t.integer :category_id
      t.integer :tag_id

      t.timestamps
    end
    add_index :terms, :slug, unique: true
  end
end
