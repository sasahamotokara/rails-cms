class Api::MarkdownController < ApplicationController
  skip_before_action :verify_authenticity_token
  include BlogHelper

  def parse
    render plain: markdown_to_html(request.body.read.to_s, lazyload: false, toc: false)
  end
end
