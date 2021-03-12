require 'rouge/plugins/redcarpet'

class MarkdownParser < Redcarpet::Render::HTML
  include Rouge::Plugins::Redcarpet

  def paragraph(text)
    %(<div class="p-text"><p class="c-text">#{text.gsub(/\r\n|\n|\r/, '</p><p class="c-text">')}</p></div>)
  end

  def header(text, level)
    # H1 は H2として扱うで
    if level == 1
      level = 2
    end

    %(<div class="p-heading-lv#{level}"><h#{level} class="p-heading-lv#{level}__title">#{text}</h#{level}></div>)
  end

  def linebreak
    %(<br>)
  end

  def block_quote(quote)
    %(<blockquote class="p-text-quote">#{quote}</blockquote>)
  end

  def block_html(raw_html)
    %(<div class="raw_html">#{raw_html}</div>)
  end

  def footnotes(content)
    %(<div class="footnotes">#{content}</div>)
  end

  def footnote_def(content, number)
    %(<div class="footnote_def" data-num="#{number}">#{content}</div>)
  end

  def list(contents, list_type)
    case list_type
    when :ordered
      %(<ol class="p-list-num">#{contents}</ol>)
    when :unordered
      %(<ul class="p-list">#{contents}</ul>)
    end
  end

  def list_item(text, list_type)
    case list_type
    when :ordered
      %(<li class="p-list-num__item">#{text}</li>)
    when :unordered
      %(<li class="p-list__item">#{text}</li>)
    end
  end

  def table(header, body)
    %(<div class="p-table"><table class="p-table__table"><thead class="p-table__header">#{header}</thead><tbody class="p-table__body">#{body}</tbody></table></div>)
  end

  def table_row(content)
    %(<tr class="p-table__row">#{content}</tr>)
  end

  def table_cell(content, alignment)
    case alignment
    when :left
      %(<td class="p-table__desc">#{content}</td>)
    when :center
      %(<td class="p-table__desc p-table__desc--center">#{content}</td>)
    when :right
      %(<td class="p-table__desc p-table__desc--right">#{content}</td>)
    else
      %(<th class="p-table__head">#{content}</th>)
    end
  end

  def codespan(code)
    %(<code class="c-text-code">#{code}</code>)
  end

  def link(link, _, content)
    # 外部リンクの場合
    if link.match?(/^http|^\/\//)
      %(<a href="#{link}" class="c-link" rel="noopener" target="_blank">#{content}<img src="#{ActionController::Base.helpers.asset_path('icon-blank.svg')}" alt="__open-new-window__" class="c-media-blank" width="16" height="16" decoding="async"></a>)
    else
      %(<a href="#{link}" class="c-link">#{content}</a>)
    end
  end

  def double_emphasis(text)
    %(<em class="c-text-bold">#{text}</em>)
  end

  def emphasis(text)
    %(<b class="c-text-bold">#{text}</b>)
  end

  def underline(text)
    %(<b class="c-text-underline">#{text}</b>)
  end

  def triple_emphasis(text)
    %(<strong class="c-text-strong">#{text}</strong>)
  end

  def image(link, size, alt_text)
    size = size.split('x')
    size_attribute = ''

    unless size.empty?
      size_attribute = "width=\"#{size[0]}\" height=\"#{size[1]}\""
    end

    %(<div class="p-media"><noscript class="loading-lazy"><img src="#{link}" alt="#{alt_text}" #{size_attribute} loading="lazy" decoding="async"></noscript></div>)
  end

  def block_code(code, language)
    filename = ''
    lang = language || ''

    if lang.include?(':')
      splited_language = lang.split(':')
      lang = splited_language[0]
      filename = splited_language[1]
    end

    lexer = Rouge::Lexer.find_fancy(lang.downcase, code) || Rouge::Lexers::PlainText
    result = rouge_formatter(lexer).format(lexer.lex(code))

    if lang.blank? && filename.blank?
      return result
    end

    code_info = "<span class=\"highlight-name\">#{filename.blank? ? lang : filename}</span>"

    %(#{result.sub('<div class="highlight">', "<div class=\"highlight\">#{code_info}")})
  end

  def rouge_formatter(options)
    options = {
      line_numbers: true,
      line_format: '<span>%i</span>'
    }

    Rouge::Formatters::HTMLLegacy.new(options)
  end
end
