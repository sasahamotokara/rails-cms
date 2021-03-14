module ApplicationHelper
  require 'redcarpet'

  def load_setting
    Setting.find_by({ id: 1 }) || Setting.new
  end

  def admin?
    request.path.split('/')[1] == 'admin'
  end

  def login?
    request.path.split('/')[1] == 'admin' && request.path.split('/')[2] == 'login'
  end

  def markdown_to_html(text, toc = true)
    options = {
      filter_html: true,
      hard_wrap: true,
      space_after_headers: true
    }

    extensions = {
      autolink: true,
      fenced_code_blocks: true,
      no_intra_emphasis: true,
      strikethrough: true,
      superscript: true,
      tables: true,
      underline: true,
      quote: true,
      footnotes: true
    }

    renderer = MarkdownParser.new(options)
    markdown = Redcarpet::Markdown.new(renderer, extensions)
    rendered_text = markdown.render(text).force_encoding('UTF-8').sub('alt="__open-new-window__"', 'alt="別窓で開きます"')
    rendered_text = create_toc(rendered_text.force_encoding('UTF-8')) if toc && rendered_text.match?('{:toc}')

    rendered_text.html_safe
  end

  def create_toc(text)
    @text = text
    header_data = get_header_data(@text.scan(/<h[1-6].+?>.*?<\/h[1-6]>/))
    toc_list = create_toc_list(header_data)
    @text.sub!('<div class="p-text"><p class="c-text">{:toc}</p></div>', "<div class=\"p-widget-toggle js-toggle\"><p class=\"p-widget-toggle__heading js-toggle__heading\">目次</p><div class=\"p-widget-toggle__content js-toggle__content\">#{toc_list}</div></div>")
  end

  def get_header_data(headers)
    header_data = []

    headers.each_with_index do |header, index|
      part_of_header = header.scan(/<h([1-6])(.+?)>(.*?)<\/h[1-6]>/)

      part_of_header.each do |match|
        header_data.push({ index: index, level: match[0].to_i, text: match[2] })
        @text.sub!(header, "<h#{match[0]} id=\"anchor-#{index}\"#{match[1]}>#{match[2]}</#{match[0]}>")
      end
    end

    return header_data
  end

  def create_toc_list(header_data)
    toc_list = '<ul class="p-linklist-content">'
    min_level = header_data.map{ |data| data[:level] }.min
    prev_level = 0

    toc_list += '<li class="p-linklist-content__item"><ul class="p-linklist-content">' * header_data[0][:level] if header_data[0][:level] != min_level

    header_data.each do |header|
      if (header[:index]).zero?
        toc_list += "<li class=\"p-linklist-content__item\"><a href=\"#anchor-0\" class=\"p-linklist-content__link js-smooth-scroll\">#{header[:text]}</a>"
      elsif prev_level < header[:level]
        toc_list += "#{'<ul class="p-linklist-content"><li class="p-linklist-content__item">' * (header[:level] - prev_level)}<a href=\"#anchor-#{header[:index]}\" class=\"p-linklist-content__link js-smooth-scroll\">#{header[:text]}</a>"
      elsif prev_level > header[:level]
        toc_list += "</li>#{'</ul></li>' * (prev_level - header[:level])}<li class=\"p-linklist-content__item\"><a href=\"#anchor-#{header[:index]}\" class=\"p-linklist-content__link js-smooth-scroll\">#{header[:text]}</a>"
      else
        toc_list += "</li><li class=\"p-linklist-content__item\"><a href=\"#anchor-#{header[:index]}\" class=\"p-linklist-content__link js-smooth-scroll\">#{header[:text]}</a>"
      end

      prev_level = header[:level]
    end

    toc_list += prev_level.zero? ? "</li>#{'</ul></li>' * (prev_level - header_data[0][:level])}</ul>" : '</li></ul>'
  end

  def pagination(item_count, per_page, current_page, base_url)
    @page_url = base_url.to_s.sub(/[&?]page=\d{0,}/, '') # pageパラメータを削除
    @page_count = (item_count.div(per_page) + (item_count.modulo(per_page).positive? ? 1 : 0))
    @page_data = {
      prev: current_page <= 1 ? nil : current_page - 1,
      next: current_page >= @page_count ? nil : current_page + 1
    }

    return '' if @page_count <= 1

    create_pagination_list('nav-pagination', @page_url.match?(/\?/))
  end

  def create_pagination_list(paginate_id_name, with_query)
    paginage_a11y_label = "<div class=\"p-heading-hidden\"><h2 id=\"#{paginate_id_name}\" class=\"p-heading-hidden__title\">ページ送り</h2></div>"
    paginate_items = ''

    paginate_items += "<li class=\"p-nav-pagination__item\"><a href=\"#{@page_url}#{with_query ? '&' : '?'}page=#{@page_data[:prev]}\" rel=\"prev\" class=\"p-nav-pagination__link\">前へ</a></li>" unless @page_data[:prev].nil?

    @page_count.times do |index|
      page_num = index + 1
      is_current = page_num == current_page
      paginate_items += is_current ? "<li class=\"p-nav-pagination__item\"><a aria-current=\"page\" class=\"p-nav-pagination__link\">#{page_num}</a></li>" : "<li class=\"p-nav-pagination__item\"><a href=\"#{@page_url}#{with_query ? '&' : '?'}page=#{page_num}\" class=\"p-nav-pagination__link\">#{page_num}</a></li>"
    end

    paginate_items += "<li class=\"p-nav-pagination__item\"><a href=\"#{@page_url}#{with_query ? '&' : '?'}page=#{@page_data[:next]}\" rel=\"next\" class=\"p-nav-pagination__link\">次へ</a></li>" unless @page_data[:next].nil?

    "<nav class=\"p-nav-pagination\" aria-labelledby=\"#{paginate_id_name}\">#{paginage_a11y_label}<ul class=\"p-nav-pagination__list\">#{paginate_items}</ul></nav>".html_safe
  end
end
