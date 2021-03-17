module CreatePaginationHelper
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
    paginate_items = @page_data[:prev].nil? ? '' : "<li class=\"p-nav-pagination__item\"><a href=\"#{@page_url}#{with_query ? '&' : '?'}page=#{@page_data[:prev]}\" rel=\"prev\" class=\"p-nav-pagination__link\">前へ</a></li>"

    @page_count.times do |index|
      page_num = index + 1
      is_current = page_num == current_page
      paginate_items += is_current ? "<li class=\"p-nav-pagination__item\"><a aria-current=\"page\" class=\"p-nav-pagination__link\">#{page_num}</a></li>" : "<li class=\"p-nav-pagination__item\"><a href=\"#{@page_url}#{with_query ? '&' : '?'}page=#{page_num}\" class=\"p-nav-pagination__link\">#{page_num}</a></li>"
    end

    paginate_items += "<li class=\"p-nav-pagination__item\"><a href=\"#{@page_url}#{with_query ? '&' : '?'}page=#{@page_data[:next]}\" rel=\"next\" class=\"p-nav-pagination__link\">次へ</a></li>" unless @page_data[:next].nil?

    "<nav class=\"p-nav-pagination\" aria-labelledby=\"#{paginate_id_name}\">#{paginage_a11y_label}<ul class=\"p-nav-pagination__list\">#{paginate_items}</ul></nav>".html_safe
  end
end
