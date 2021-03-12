class CreateMediumRelations < ActiveRecord::Migration[6.0]
  def change
    create_table :medium_relations do |t|
      t.integer :post_id
      t.integer :medium_id
      t.boolean :is_thumbnail

      t.timestamps
    end
  end
end
