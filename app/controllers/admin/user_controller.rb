class Admin::UserController < ApplicationController
  UPLOAD_DIRECTORY = '/images/users'
  DEFAULT_USER_IMAGE = 'user_image.jpg'

  before_action do
    @settings = load_setting

    unless logged_in?
      redirect_to admin_login_path
    end
  end

  def index
    if params[:commit] == 'bulk_operation'
      bulk(params[:user][:action], params[:user][:selector])
      return
    end

    @current_page = params[:page].nil? ? 1 : params[:page].to_i
    @per_page = 10
    offset = @current_page <= 1 ? 0 : @per_page * (@current_page - 1)

    @users = User.all.limit(@per_page).offset(offset).order(:created_at => 'DESC')
    @user_count = @users.length
  end

  def edit
    @user = User.find_by(:id => params[:user_id])

    return unless @user.nil?

    redirect_to admin_user_path
  end

  def new
    @user = User.new
  end

  def create
    attributes = user_params
    image = params[:user][:image]
    use_default_image = image.nil?

    ActiveRecord::Base.transaction do
      if use_default_image
        attributes[:image] = "#{UPLOAD_DIRECTORY}/#{DEFAULT_USER_IMAGE}"
      else
        extension = /.*?\.(.[\w]+$)/.match(image.original_filename)[1]
        attributes[:image] = "#{UPLOAD_DIRECTORY}/user_image_#{@user.id}.#{extension}"
      end

      # DB保存完了後、デフォルト画像以外を使用する場合アップロードを実行
      if User.new(attributes).save!
        upload(image.tempfile, "public#{attributes[:image]}") if !use_default_image
      end
    end
      redirect_to admin_user_path
    rescue => e
      # エラー処理！！
  end

  def update
    @user = User.find_by(:id => params[:user_id])
    image = params[:user][:image]
    attributes = user_params
    upload_image = !image.nil?

    return if @user.nil?

    ActiveRecord::Base.transaction do
      if upload_image
        extension = /.*?\.(.[\w]+$)/.match(image.original_filename)[1]
        attributes[:image] = "#{UPLOAD_DIRECTORY}/user_image_#{@user.id}.#{extension}"
      end

      # DB保存完了後、デフォルト画像以外を使用する場合アップロードを実行
      if @user.update!(attributes)
        return if !upload_image

        File.delete(Rails.root.join('public', @user.image.to_s[1..-1])) if @user.image != "#{UPLOAD_DIRECTORY}/#{DEFAULT_USER_IMAGE}"
        upload(image.tempfile, "public#{attributes[:image]}")
      end
    end
      redirect_to admin_user_edit_path(:user_id => @user.id)
    rescue => e
      # エラー処理！！
  end

  def destory
    @user = User.find_by(:id => params[:user_id])

    return if @user.nil?

    @user.delete
    File.delete(Rails.root.join('public', @user.image.to_s[1..-1])) if @user.image != "#{UPLOAD_DIRECTORY}/#{DEFAULT_USER_IMAGE}"

    # ログインユーザーを削除した場合はログイン画面へ遷移させる
    if current_user?(@user)
      log_out()
      redirect_to login_path
    else
      redirect_to admin_user_path
    end
  end

  def user_params
    params.require(:user).permit(:name, :email, :display_name, :password, :password_confirmation)
  end

  def upload(tempfile, file_path)
    create_upload_dir

    image = File.open(file_path, 'w+b')
    image.write(image_format(tempfile).read)
    image.close
  end

  def image_format(image)
    ImageProcessing::MiniMagick.source(image).resize_to_fill(120, 120).call
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

  def bulk(action, user_ids)
    if !user_ids.nil? && action == 'delete'
      user_ids.each do |id|
        user = User.find(id)

        user.delete
        File.delete(Rails.root.join('public', user.image.to_s[1..-1])) if user.image != "#{UPLOAD_DIRECTORY}/#{DEFAULT_USER_IMAGE}"
      end
    end

    redirect_to admin_user_path
  end
end
