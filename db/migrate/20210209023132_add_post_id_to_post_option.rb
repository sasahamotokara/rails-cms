class AddPostIdToPostOption < ActiveRecord::Migration[6.0]
  def change
    add_column :post_options, :post_id, :integer
  end
end
