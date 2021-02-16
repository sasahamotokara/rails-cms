class CreateSettings < ActiveRecord::Migration[6.0]
  def change
    create_table :settings do |t|
      t.string :site_name
      t.string :site_catch
      t.string :site_url

      t.timestamps
    end
  end
end
