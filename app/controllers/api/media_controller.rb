class Api::MediaController < ApplicationController
  skip_before_action :verify_authenticity_token
  UPLOAD_DIRECTORY = "/images/uploads/#{Date.today.year}"

  def create
    uploads = {}

    ActiveRecord::Base.transaction do
      params[:medium][:thumbnail].each do |image|
        attributes = media_params
        match_data = /(.*?)\.(.[\w]+$)/.match(image.original_filename)

        attributes[:name] = match_data[1].gsub(/\s/, '_') #スペースはアンスコに変換
        attributes[:extension] = match_data[2]
        attributes[:url] = "#{UPLOAD_DIRECTORY}/#{attributes[:name]}.#{attributes[:extension]}"

        @medium = Medium.new(attributes)

        # DB保存完了後、アップロードを実行
        if @medium.save!
          upload(image.tempfile, "public#{attributes[:url]}")
          uploads[uploads.length] = @medium
        end
      end
    end
      render json: uploads
    rescue => e
      render json: { status: 'error!', data: '' }, status: :not_found
  end

  def upload(tempfile, file_path)
    create_upload_dir()

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
