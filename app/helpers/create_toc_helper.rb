module CreateTocHelper
  def create_toc(text)
    @text = text
    header_data = get_header_data(@text.scan(%r{<h[1-6].+?>.*?</h[1-6]>}))
    toc_list = create_toc_list(header_data)
    @text.sub!('<div class="p-text"><p class="c-text">{:toc}</p></div>', "<div class=\"p-widget-toggle js-toggle\"><p class=\"p-widget-toggle__heading js-toggle__heading\">目次</p><div class=\"p-widget-toggle__content js-toggle__content\">#{toc_list}</div></div>")
  end

  def get_header_data(headers)
    header_data = []

    headers.each_with_index do |header, index|
      part_of_header = header.scan(%r{<h([1-6])(.+?)>(.*?)</h[1-6]>})

      part_of_header.each do |match|
        header_data.push({ index: index, level: match[0].to_i, text: match[2] })
        @text.sub!(header, "<h#{match[0]} id=\"anchor-#{index}\"#{match[1]}>#{match[2]}</h#{match[0]}>")
      end
    end

    header_data
  end

  def create_toc_list(header_data)
    toc_list = '<ul class="p-linklist-content">'
    min_level = header_data.map { |data| data[:level] }.min
    prev_level = 0

    toc_list += '<li class="p-linklist-content__item"><ul class="p-linklist-content">' * header_data[0][:level] if header_data[0][:level] != min_level

    header_data.each do |header|
      toc_list += create_toc_item(prev_level, header[:index], header[:level], header[:text])
      prev_level = header[:level]
    end

    toc_list += prev_level.zero? ? "</li>#{'</ul></li>' * (prev_level - header_data[0][:level])}</ul>" : '</li></ul>'
  end

  def create_toc_item(prev_level, index, level, text)
    if index.zero?
      "<li class=\"p-linklist-content__item\"><a href=\"#anchor-0\" class=\"p-linklist-content__link js-smooth-scroll\">#{text}</a>"
    elsif prev_level < level
      "#{'<ul class="p-linklist-content"><li class="p-linklist-content__item">' * (level - prev_level)}<a href=\"#anchor-#{index}\" class=\"p-linklist-content__link js-smooth-scroll\">#{text}</a>"
    elsif prev_level > level
      "</li>#{'</ul></li>' * (prev_level - level)}<li class=\"p-linklist-content__item\"><a href=\"#anchor-#{index}\" class=\"p-linklist-content__link js-smooth-scroll\">#{text}</a>"
    else
      "</li><li class=\"p-linklist-content__item\"><a href=\"#anchor-#{index}\" class=\"p-linklist-content__link js-smooth-scroll\">#{text}</a>"
    end
  end
end
