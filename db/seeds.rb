@setting = Setting.new
@setting.site_name = 'S\'Presso'
@setting.site_catch = '抽出された濃い情報を'
@setting.site_url = 'https://s-presso.herokuapp.com/'
@setting.save

@user = User.new
@user.name = 'admin'
@user.email = 'admin@spresso.com'
@user.password = 'password'
@user.display_name = 'エクスプレス・S・プレッソ'
@user.save

@term = Term.new
@term.slug = 'category-test'
@term.category_id = 1
@term.save

@term = Term.new
@term.slug = 'tag-test'
@term.tag_id = 1
@term.save

@category = Category.new
@category.name = 'テスト'
@category.term_id = 1
@category.color = '#81AEFE'
@category.save

@tag = Tag.new
@tag.name = 'テスト'
@tag.term_id = 2
@tag.save

@taxonomy_relation = TaxonomyRelation.new
@taxonomy_relation.post_id = 1
@taxonomy_relation.tag_id = 1
@taxonomy_relation.save

@taxonomy_relation = TaxonomyRelation.new
@taxonomy_relation.post_id = 1
@taxonomy_relation.category_id = 1
@taxonomy_relation.save

@post = Post.new
@post.user_id = 1
@post.category_id = 1
@post.postname = 'test'
@post.title = 'テスト投稿です'
@post.content = "{:toc}\n\n# Block Elements\n\n## Headers 見出し\n\n先頭に`#`をレベルの数だけ記述します。\n\n```markdown\n# 見出し1\n## 見出し2\n### 見出し3\n#### 見出し4\n##### 見出し5\n###### 見出し6\n```\n\n# 見出し1\n## 見出し2\n### 見出し3\n#### 見出し4\n##### 見出し5\n###### 見出し6\n\n## Block 段落\n\n空白行を挟むことで段落となります。\n\n```\n段落1\n(空行)\n段落2\n```\n\n段落1\n\n段落2\n\n## Br 改行\n\n改行の前に半角スペース`  `を2つ記述します。\n\n```\nhoge\nfuga(スペース2つ)\npiyo\n```\n\nhoge\nfuga  \npiyo\n\n## Blockquotes 引用\n\n先頭に`>`を記述します。ネストは`>`を多重に記述します。\n\n```\n> 引用  \n> 引用\n>> 多重引用\n```\n\n> 引用  \n> 引用\n>> 多重引用\n\n## Code コード\n\n`` `バッククオート` `` 3つ、あるいはダッシュ`~`３つで囲みます。\n\n```\nprint 'hoge'\n```\n\n```\nprint 'hoge'\n```\n\n### インラインコード\n\n`` `バッククオート` `` で単語を囲むとインラインコードになります。\n\n```\nこれは `インラインコード`です。\n```\n\nこれは `インラインコード`です。\n\n## pre 整形済みテキスト\n\n半角スペース4個もしくはタブで、コードブロックをpre表示できます\n\n```\n    class Hoge\n        def hoge\n            print 'hoge'\n        end\n    end\n```\n\n    class Hoge\n        def hoge\n            print 'hoge'\n        end\n    end\n    \n## Hr 水平線\n\nアンダースコア`_` 、アスタリスク`*`、ハイフン`-`などを3つ以上連続して記述します。\n\n```\nhoge\n***\nhoge\n___\nhoge\n---\n```\n\nhoge\n***\nhoge\n___\nhoge\n---\n\n# Lists\n\n## Ul 箇条書きリスト\n\nハイフン`-`、プラス`+`、アスタリスク`*`のいずれかを先頭に記述します。  \nネストはタブで表現します。\n\n```\n- リスト1\n    - リスト1_1\n        - リスト1_1_1\n        - リスト1_1_2\n    - リスト1_2\n    - リスト2\n- リスト3\n```\n\n- リスト1\n    - リスト1_1\n        - リスト1_1_1\n        - リスト1_1_2\n    - リスト1_2\n    - リスト2\n- リスト3\n\n## Ol 番号付きリスト\n\n`番号.`を先頭に記述します。ネストはタブで表現します。  \n番号は自動的に採番されるため、すべての行を1.と記述するのがお勧めです。\n\n```\n1. 番号付きリスト1\n    1. 番号付きリスト1-1\n    1. 番号付きリスト1-2\n    1. 番号付きリスト2\n1. 番号付きリスト3\n```\n\n1. 番号付きリスト1\n    1. 番号付きリスト1-1\n    1. 番号付きリスト1-2\n    1. 番号付きリスト2\n1. 番号付きリスト3\n\n# Span Elements\n\n## Link リンク\n\n`[表示文字](URL)`でリンクに変換されます。\n\n```\n[Google](https://www.google.co.jp/)\n```\n\n[Google](https://www.google.co.jp/)\n\n### 外部参照リンク\n\nURLが長くて読みづらくなる場合や同じリンクを何度も使用する場合は、リンク先への参照を定義できます。\n\n```\n[Googleを見る][Google]\n[Google]: http://www.yahoo.co.jp\n```\n\n[Googleを見る][Google]\n[Google]: http://www.yahoo.co.jp\n\n## 強調\n### em\n\nアスタリスク`*`もしくはアンダースコア`_`1個で文字列を囲みます。\n\n```\nこれは *イタリック* です\nこれは _イタリック_ です\n```\n\nこれは *イタリック* です\nこれは _イタリック_ です\n\n### strong\n\nアスタリスク`*`もしくはアンダースコア`_`2個で文字列を囲みます。\n\n```\nこれは **ボールド** です\nこれは __ボールド__ です\n```\n\nこれは **ボールド** です\nこれは __ボールド__ です\n\n### em + strong\n\nアスタリスク`*`もしくはアンダースコア`_`3個で文字列を囲みます。\n\n```\nこれは ***イタリック＆ボールド*** です\nこれは ___イタリック＆ボールド___ です\n```\n\nこれは ***イタリック＆ボールド*** です\nこれは ___イタリック＆ボールド___ です\n\n## Images 画像\n\n先頭の`!`で画像の<img>と認識されます。画像の大きさなどの指定をする場合はimgタグを使用します。\n\n```\n![alt](画像URL)\n![代替文字列](URL \"タイトル\")\n\n<img src=\"attach:cat.jpg\" alt=\"attach:cat\" title=\"attach:cat\" width=\"200\" height=\"200\">\n```\n\n# Table 表\n\n`-`と`|`を使ってtableを作成します。\n\n```\n| TH1 | TH2 |\n----|----\n| TD1 | TD3 |\n| TD2 | TD4 |\n```\n\n| TH1 | TH2 |\n:----|:---- \n| TD1 | TD3 |\n| TD2 | TD4 |\n\n```\n| 左揃え | 中央揃え | 右揃え |\n|:---|:---:|---:|\n|1 |2 |3 |\n|4 |5 |6 |\n```\n\n| 左揃え | 中央揃え | 右揃え |\n|:---|:---:|---:|\n|1 |2 |3 |\n|4 |5 |6 |\n"
@post.status = 'publish'
@post.published_at = Time.now.to_s(:db)
@post.save

@post_option = PostOption.new
@post_option.post_id = 1
@post_option.description = '説明文が入ります'
@post_option.noindex = false
@post_option.nofollow = false
@post_option.save