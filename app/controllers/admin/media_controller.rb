class Admin::MediaController < ApplicationController
  before_action do
    basic_auth
    @settings = load_setting
  end

  def index
    @media = Medium.all
  end

  def edit
    @media = Medium.find_by(:id => params[:media_id])

    # 不正なidの場合は新規追加のページへ転送
    redirect_to admin_media_new_path, alert: 'メディアが見つかりませんでした。' and return if @media.nil?
  end

  def new
    @media = Medium.new
  end

  def create
    images = params[:medium][:images]
    errors = []

    redirect_to admin_media_new_path, alert: 'メディアを選択してください' and return if images.nil?

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

        errors.push("「#{@media[:name]}.#{@media[:extension]}」 #{@media.errors.full_messages.join(',')}") unless @media.save
      end

      raise ActiveRecord::RecordInvalid.new(errors, Medium.new) unless errors.empty?
    end
    redirect_to admin_media_new_path, notice: 'メディアを追加しました'
    rescue
      @media ||= Medium.new
      @media.errors.messages[:images] = errors
      flash.now[:alert] = 'メディアを追加できませんでした'
      render :new
  end

  def update
    @media = Medium.find_by({ id: params[:media_id] })
    image = params[:medium][:image]

    redirect_to admin_media_path, notice: '予期せぬエラーが発生しました。' and return if @media.nil?

    ActiveRecord::Base.transaction do
      # 画像差し替えなので、ファイル名・拡張子が変わると不都合（画像のリンク切れが起こる）なので画像の上書きのみ
      if image
        image.original_filename = "#{@media[:name]}.#{@media[:extension]}"
        image.tempfile = ImageProcessing::MiniMagick.source(image.tempfile).resize_to_limit(800, nil).convert(@media.extension).call
        @media.remove_image!
      end

      @media.update!(media_params)
    end
    redirect_to admin_media_edit_path({ media_id: @media.id }), notice: '更新しました'
    rescue
      flash.now[:alert] = '更新失敗'
      render :edit
  end

  def destory
    @media = Medium.find_by({ id: params[:media_id] })

    redirect_to admin_media_path, notice: '予期せぬエラーが発生しました。' and return if @media.nil?

    unless @media&.post.nil?
      @media.post.each do |post|
        MediaRelation.find_by({ medium_id: @media.id, post_id: post.id }).delete
      end
    end

    # 画像の削除を実行
    @media.remove_image = true

    if @media.save!
      @media.delete
      redirect_to admin_media_path, notice: '削除しました' and return
    end

    redirect_to admin_media_path, notice: '削除に失敗しました'
  end

  def media_params
    params.require(:medium).permit(:user_id, :image, :alt_text)
  end
end
