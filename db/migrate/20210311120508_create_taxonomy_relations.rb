class CreateTaxonomyRelations < ActiveRecord::Migration[6.0]
  def change
    create_table :taxonomy_relations do |t|
      t.integer :post_id
      t.integer :category_id
      t.integer :tag_id

      t.timestamps
    end
  end
end
