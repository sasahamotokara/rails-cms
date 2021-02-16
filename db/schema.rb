# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_02_09_032557) do

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.integer "slug_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "color"
  end

  create_table "media", force: :cascade do |t|
    t.integer "user_id"
    t.string "url"
    t.string "name"
    t.string "extension"
    t.string "alt_text"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "medium_relations", force: :cascade do |t|
    t.integer "post_id"
    t.integer "medium_id"
    t.boolean "is_thumbnail"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "post_options", force: :cascade do |t|
    t.integer "thumbnail_image_id"
    t.string "description"
    t.string "canonical"
    t.boolean "noindex"
    t.boolean "nofollow"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "post_id"
  end

  create_table "posts", force: :cascade do |t|
    t.integer "user_id"
    t.integer "category_id"
    t.string "postname"
    t.string "title"
    t.text "content"
    t.string "status"
    t.datetime "published_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["postname"], name: "index_posts_on_postname", unique: true
  end

  create_table "settings", force: :cascade do |t|
    t.string "site_name"
    t.string "site_catch"
    t.string "site_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "slugs", force: :cascade do |t|
    t.string "slug"
    t.integer "category_id"
    t.integer "tag_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["slug"], name: "index_slugs_on_slug", unique: true
  end

  create_table "tag_relations", force: :cascade do |t|
    t.integer "post_id"
    t.integer "tag_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.integer "slug_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.string "image"
    t.string "display_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

end