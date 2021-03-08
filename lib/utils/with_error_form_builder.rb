class WithErrorFormBuilder < ActionView::Helpers::FormBuilder
  def pick_errors(attribute, element_string)
    return element_string if @object.nil? || (messages = @object.errors.messages[attribute]).empty?

    element_id = get_id_attribute(element_string)

    item_ids = []
    items = messages.collect.with_index do |message, index|
      id = "#{element_id}-#{index}"

      item_ids.push(id)
      %{<p class="admin-errors__item" id="#{id}">#{@object.errors.full_message(attribute, message)}</p>}
    end.join

    # aria-describedby属性付与
    element_string.sub!(/(<(input|textarea|select).*?)>/){ "#{$1} aria-describedby=\"#{item_ids.join(' ')}\">" }

    # is-error クラス付与
    element_string.sub!(/class="(.*?)"/){ "class=\"#{$1} is-error\"" }

    %{#{element_string}<div class="admin-errors">#{items}</div>}.html_safe
  end

  def text_field(attribute, options = {})
    return super if options[:no_errors]

    pick_errors(attribute, super)
  end

  def text_area(attribute, options = {})
    return super if options[:no_errors]

    pick_errors(attribute, super)
  end

  def select(attribute, method, choices = nil, options = {})
    return super if options[:no_errors]

    pick_errors(attribute, "<div class=\"admin-form-select\">#{super}</div>".html_safe)
  end

  def radio_button(attribute, method, options = {})
    return super if options[:no_errors]

    pick_errors(attribute, super)
  end

  def file_field(attribute, options = {})
    return super if options[:no_errors]

    pick_errors(attribute, super)
  end

  private

  def get_id_attribute(element_string)
    id = element_string.to_s.scan(/id="(.*?)"/).flatten!
    id.nil? ? '' : id[0]
  end
end
