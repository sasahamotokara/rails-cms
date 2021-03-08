@post = Post.new
@post.user_id = 1
@post.category_id = 1
@post.postname = 'test'
@post.title = 'テスト投稿です'
@post.content = '親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。なぜそんな無闇をしたと聞く人があるかも知れぬ。別段深い理由でもない。新築の二階から首を出していたら、同級生の一人が冗談に、いくら威張っても、そこから飛び降りる事は出来まい。弱虫やーい。と囃したからである。小使に負ぶさって帰って来た時、おやじが大きな眼をして二階ぐらいから飛び降りて腰を抜かす奴があるかと云ったから、この次は抜かさずに飛んで見せますと答えた。（青空文庫より）'
@post.status = 'publish'
@post.created_at = Time.now.to_s(:db)
@post.published_at = Time.now.to_s(:db)
@post.save

@post_option = PostOption.new
@post_option.post_id = 1
@post_option.thumbnail_image_id = 1
@post_option.description = '説明文が入ります'
@post_option.canonical = ''
@post_option.noindex = false
@post_option.nofollow = false
@post_option.save

@slug = Slug.new
@slug.slug = 'category-test'
@slug.category_id = 1
@slug.save

@slug = Slug.new
@slug.slug = 'tag-test'
@slug.tag_id = 1
@slug.save

@category = Category.new
@category.name = 'テスト'
@category.slug_id = 1
@category.color = '#81AEFE'
@category.save

@tag = Tag.new
@tag.name = 'テスト'
@tag.slug_id = 2
@tag.save

@tag_relation = TagRelation.new
@tag_relation.post_id = 1
@tag_relation.tag_id = 1
@tag_relation.save

@medium = Medium.new
@medium.user_id = 1
@medium.url = '/images/uploads/2021/IMG_20190430_115201.jpg'
@medium.name = 'IMG_20190430_115201'
@medium.extension = 'jpg'
@medium.alt_text = 'テストやで'
@medium.save

@medium_relation = MediumRelation.new
@medium_relation.post_id = 1
@medium_relation.medium_id = 1
@medium_relation.is_thumbnail = true
@medium_relation.save

@user = User.new
@user.name = 'yanchas'
@user.email = 'yanchas.design@gmail.com'
@user.password = 'toyo1028'
@user.image = '/images/users/user_image.png'
@user.display_name = 'sasaha motokara'
@user.save

@setting = Setting.new
@setting.site_name = 'Rails Blog'
@setting.site_catch = 'キャッチコピーやで'
@setting.site_url = 'ゆーあーえーる'
@setting.save
