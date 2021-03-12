class CreateThumbnailRelations < ActiveRecord::Migration[6.0]
  def change
    create_table :thumbnail_relations do |t|
      t.integer :post_id
      t.integer :medium_id

      t.timestamps
    end
  end
end
