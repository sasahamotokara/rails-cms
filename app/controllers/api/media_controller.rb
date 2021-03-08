class Api::MediaController < ApplicationController
  skip_before_action :verify_authenticity_token
  UPLOAD_DIRECTORY = "/images/uploads/#{Date.today.year}"

  def create
    uploads = {}
    errors = []
    valid_images = []

    raise ActiveRecord::RecordInvalid.new(Medium.new) if params[:medium][:thumbnail].nil?

    ActiveRecord::Base.transaction do
      params[:medium][:thumbnail].each do |image|
        attributes = media_params
        match_data = /(.*?)\.(.[\w]+$)/.match(image.original_filename)

        attributes[:name] = match_data[1].gsub(/\s/, '_') #スペースはアンスコに変換
        attributes[:extension] = match_data[2]
        attributes[:url] = "#{UPLOAD_DIRECTORY}/#{attributes[:name]}.#{attributes[:extension]}"

        @media = Medium.new(attributes)

        if @media.save
          valid_images.push([image.tempfile, "public#{attributes[:url]}"])
          uploads[uploads.length] = @media
        else
          errors.push("「#{attributes[:name]}.#{attributes[:extension]}」 #{@media.errors.full_messages.join(',')}")
          next
        end
      end

      raise ActiveRecord::RecordInvalid.new(Medium.new) unless errors.empty?

      # エラーが無い場合は、アップロードを実行
      valid_images.each do |image|
        upload(image[0], image[1])
      end
    end
      render json: uploads
    rescue => e
      render json: { status: 'error', message: errors }, status: 400
  end

  def upload(tempfile, file_path)
    create_upload_dir

    image = File.open(file_path, 'w+b')
    image.write(image_format(tempfile).read)
    image.close
  end

  def image_format(image)
    ImageProcessing::MiniMagick.source(image).resize_to_limit(800, nil).call
  end

  def create_upload_dir
    return if File.directory?(UPLOAD_DIRECTORY)

    directories = UPLOAD_DIRECTORY.split('/')
    directory = ''

    directories.each do |sub|
      directory += "#{sub}/"

      next if File.directory?(directory)
      Dir.mkdir(directory)
    end
  end

  def media_params
    params.require(:medium).permit(:user_id)
  end
end
