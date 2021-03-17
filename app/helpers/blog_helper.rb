module BlogHelper
  include CreateTocHelper
  require 'redcarpet'

  def markdown_to_html(text, lazyload: true, toc: true)
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
    rendered_text = rendered_text.force_encoding('UTF-8').sub(%r{<noscript class="loading-lazy">(.*?)</noscript>}) { Regexp.last_match(1) } unless lazyload
    rendered_text.html_safe
  end
end
