class Admin::UserController < ApplicationController
  UPLOAD_DIRECTORY = '/images/users'
  DEFAULT_USER_IMAGE = 'user_image.png'

  before_action do
    basic_auth
    @settings = load_setting
  end

  def index
    if params[:commit] == 'bulk_operation'
      bulk(params[:user][:action], params[:user][:selector])
      return
    end

    @current_page = params[:page].nil? ? 1 : params[:page].to_i
    @per_page = 10
    offset = @current_page <= 1 ? 0 : @per_page * (@current_page - 1)

    @users = User.all.limit(@per_page).offset(offset).order(:name)
    @user_count = @users.length
  end

  def edit
    @user = User.find_by(:id => params[:user_id])

    return unless @user.nil?

    redirect_to admin_user_path, alert: 'ユーザーが見つかりませんでした。'
  end

  def new
    @user = User.new
  end

  def confirm
    attributes = user_params
    attributes[:image] = "#{UPLOAD_DIRECTORY}/#{DEFAULT_USER_IMAGE}"
    attributes[:display_name] = attributes[:name]

    @user = User.new(attributes)

    if @user.valid?
      session[:temporary_password] = attributes[:password]
      flash.now[:notice] = 'ユーザーを作成しました。表示名・パスワードを指定してください。'
      render :confirm
    else
      flash.now[:alert] = 'ユーザーを作成できませんでした'
      render :new
    end
  end

  def create
    attributes = user_params
    attributes[:image] = "#{UPLOAD_DIRECTORY}/#{DEFAULT_USER_IMAGE}"
    @user = User.new(attributes)

    if @user.save
      redirect_to admin_user_edit_path(:user_id => @user.id), notice: 'ユーザーを作成しました。'
    else
      flash.now[:alert] = 'ユーザーを作成できませんでした'
      render :new
    end
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
      if @user.update!(attributes) && upload_image
        if File.exist?(Rails.root.join('public', @user.image.to_s[1..-1])) && @user.image != "#{UPLOAD_DIRECTORY}/#{DEFAULT_USER_IMAGE}"
          File.delete(Rails.root.join('public', @user.image.to_s[1..-1]))
        end

        upload(image.tempfile, "public#{attributes[:image]}")
      end
    end
      redirect_to admin_user_edit_path(:user_id => @user.id), notice: '更新しました'
    rescue => e
      flash.now[:alert] = '更新できませんでした'
      render :edit
  end

  def destory
    @user = User.find_by(:id => params[:user_id])

    return if @user.nil?

    @user.delete
    File.delete(Rails.root.join('public', @user.image.to_s[1..-1])) if @user.image != "#{UPLOAD_DIRECTORY}/#{DEFAULT_USER_IMAGE}"

    # ログインユーザーを削除した場合はログイン画面へ遷移させる
    if current_user?(@user)
      log_out()
      redirect_to login_path, notice: 'ユーザーが削除されたためログアウトしました'
    else
      redirect_to admin_user_path, notice: '削除しました'
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
    if user_ids.nil?
      redirect_to admin_user_path, alert: '対象のユーザーを選択してください。' and return
    end

    if action == 'delete'
      user_ids.each do |id|
        user = User.find(id)

        user.delete
        File.delete(Rails.root.join('public', user.image.to_s[1..-1])) if user.image != "#{UPLOAD_DIRECTORY}/#{DEFAULT_USER_IMAGE}"
      end

      redirect_to admin_user_path, notice: '削除しました' and return
    end

    redirect_to admin_user_path, alert: '一括操作を選択して実行してください。'
  end
end
