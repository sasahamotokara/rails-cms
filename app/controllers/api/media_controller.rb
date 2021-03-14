class Api::MediaController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    images = params[:medium][:images]
    uploads = {}
    errors = []

    ActiveRecord::Base.transaction do
      images.each do |image|
        attributes = media_params
        image.original_filename.gsub!(/\s/, '_') #スペースはアンスコに変換
        image.tempfile = ImageProcessing::MiniMagick.source(image.tempfile).resize_to_limit(800, nil).call
        match_data = /(.*?)\.(.\w+$)/.match(image.original_filename)

        attributes[:name] = match_data[1]
        attributes[:extension] = match_data[2]
        attributes[:image] = image

        @media = Medium.new(attributes)

        if @media.save
          uploads[uploads.length] = @media
        else
          errors.push("「#{@media[:name]}.#{@media[:extension]}」 #{@media.errors.full_messages.join(',')}")
        end
      end

      raise ActiveRecord::RecordInvalid.new(errors, Medium.new) unless errors.empty?
    end
    render json: uploads
    rescue
      render json: { status: 'error', message: errors }, status: 400
  end

  def media_params
    params.require(:medium).permit(:user_id)
  end
end
