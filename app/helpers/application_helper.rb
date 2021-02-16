module ApplicationHelper
  require 'redcarpet'

  def load_setting
    Setting.find_by(:id => 1) || Setting.new
  end

  def is_admin?
    request.path.split('/')[1] == 'admin'
  end

  def is_login?
    request.path.split('/')[1] == 'admin' && request.path.split('/')[2] == 'login'
  end

  def markdown_to_html(text)
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
    rendered_text = markdown.render(text)

    if rendered_text.match?('{:toc}')
      rendered_text = create_toc(rendered_text.force_encoding('UTF-8'))
    end

    rendered_text.html_safe
  end

  def create_toc(text)
    headers = text.scan(/<h[1-6].+?>.*?<\/h[1-6]>/)
    toc_list = '<ul class="p-linklist-content">'
    header_data = []

    headers.each_with_index do |header, index|
      part_of_header = header.scan(/<h([1-6])(.+?)>(.*?)<\/h[1-6]>/)

      part_of_header.each do |match|
        header_data.push({
          index: index,
          level: match[0].to_i,
          text: match[2]
        })
        text.sub!(header, "<h#{match[0]} id=\"anchor-#{index}\"#{match[1]}>#{match[2]}</#{match[0]}>")
      end
    end

    min_level = header_data.map{ |data| data[:level] }.min
    prev_level = 0

    if header_data[0][:level] != min_level
      toc_list += '<li class="p-linklist-content__item"><ul class="p-linklist-content">' * header_data[0][:level]
    end

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

    if prev_level.zero?
      toc_list += "</li>#{'</ul></li>' * (prev_level - header_data[0][:level])}</ul>"
    else
      toc_list += '</li></ul>'
    end

    return text.sub!('<div class="p-text"><p class="c-text">{:toc}</p></div>', "<div class=\"p-widget-toggle js-toggle\"><p class=\"p-widget-toggle__heading js-toggle__heading\">目次</p><div class=\"p-widget-toggle__content js-toggle__content\">#{toc_list}</div></div>")
  end

  def pagination(item_count, per_page, current_page, base_url)
    page_count = (item_count.div(per_page) + (item_count.modulo(per_page) > 0 ? 1 : 0))
    with_query = base_url.match?(/\?/)
    page_data = {
      prev: current_page <= 1 ? nil : current_page - 1,
      next: current_page >= page_count ? nil : current_page + 1,
    }

    paginate_prev_and_next = ''
    paginate_numbers = ''

    paginate_prev_and_next += "<li><a href=\"#{base_url}#{with_query ? '&' : '?'}page=#{page_data[:prev]}\">前へ</a></li>" unless page_data[:prev].nil?
    paginate_prev_and_next += "<li><a href=\"#{base_url}#{with_query ? '&' : '?'}page=#{page_data[:next]}\">次へ</a></li>" unless page_data[:next].nil?

    return '' if paginate_prev_and_next == ''

    page_count.times do |index|
      page_num = index + 1
      is_current = page_num == current_page

      paginate_numbers += is_current ? "<li><a aria-current=\"true\">#{page_num}</a></li>" : "<li><a href=\"#{base_url}#{with_query ? '&' : '?'}page=#{page_num}\">#{page_num}</a></li>"
    end

    return "<div><ul>#{paginate_prev_and_next}</ul><ul>#{paginate_numbers}</ul></div>".html_safe
  end
end
