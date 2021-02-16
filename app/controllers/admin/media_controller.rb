class Admin::MediaController < ApplicationController
  UPLOAD_DIRECTORY = "/images/uploads/#{Date.today.year}"

  before_action do
    @settings = load_setting

    unless logged_in?
      redirect_to admin_login_path
    end
  end

  def index
    @media = Medium.all
  end

  def edit
    @media = Medium.find_by(:id => params[:media_id])

    # 不正なidの場合は新規追加のページへ転送
    if @media.nil?
      redirect_to admin_media_new_path
    end
  end

  def new
    @media = Medium.new
  end

  def create
    ActiveRecord::Base.transaction do
      params[:medium][:thumbnail].each do |image|
        attributes = media_params
        match_data = /(.*?)\.(.[\w]+$)/.match(image.original_filename)

        attributes[:name] = match_data[1].gsub(/\s/, '_') #スペースはアンスコに変換
        attributes[:extension] = match_data[2]
        attributes[:url] = "#{UPLOAD_DIRECTORY}/#{attributes[:name]}.#{attributes[:extension]}"

        # DB保存完了後、アップロードを実行
        if Medium.new(attributes).save!
          upload(image.tempfile, "public#{attributes[:url]}")
        end
      end
    end
      redirect_to admin_media_path
    rescue => e
      # エラー処理！！
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

  def update
    @media = Medium.find_by(:id => params[:media_id])
    image = params[:medium][:thumbnail]

    return if @media.nil?

    # 画像差し替えなので、ファイル名・拡張子が変わると不都合（画像のリンク切れが起こる）なので画像の上書きのみ
    ActiveRecord::Base.transaction do
      attributes = media_params
      extension = /.*?\.(.[\w]+$)/.match(image.original_filename)[1]
      tempfile = image.tempfile

      # 拡張子が変わっていた場合、統一
      if extension != @media.extension
        tempfile = ImageProcessing::MiniMagick.source(tempfile).convert(@media.extension).call
      end

      if @media.update!(attributes)
        upload(tempfile, "public#{@media.url}")
      end
    end
      redirect_to admin_media_edit_path(media_id: @media.id)
    rescue => e
      # エラー処理！！
  end

  def destory
    @media = Medium.find_by(:id => params[:media_id])

    if @media.nil?
      redirect_to admin_media_path
      return
    end

    @media.delete

    if !@media.post.nil?
      @media.post.each do |post|
        MediaRelation.find_by(:medium_id => @media.id, :post_id => post.id).delete
      end
    end

    File.delete(Rails.root.join('public', @media.url.to_s[1..-1]))
    redirect_to admin_media_path
  end

  def media_params
    params.require(:medium).permit(:user_id, :alt_text)
  end
end
