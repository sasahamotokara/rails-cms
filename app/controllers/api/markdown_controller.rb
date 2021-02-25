class Api::MarkdownController < ApplicationController
  skip_before_action :verify_authenticity_token

  def parse
    render plain: markdown_to_html(request.body.read.to_s, false)
  end
end
