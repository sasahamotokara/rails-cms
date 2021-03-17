class Admin::UserController < ApplicationController
  before_action do
    basic_auth
    @settings = load_setting
  end

  def index
    bulk(user_bulk_params[:action], user_bulk_params[:selector]) and return if params[:commit] == 'bulk_operation'
    per_page
  end

  def per_page
    @current_page = params[:page].nil? ? 1 : params[:page].to_i
    @per_page = 10
    @users = User.all.limit(@per_page).offset(@current_page <= 1 ? 0 : @per_page * (@current_page - 1)).order(:name)
    @user_count = @users.length
  end

  def edit
    @user = User.find_by({ id: params[:user_id] })
    redirect_to admin_user_path, alert: 'ユーザーが見つかりませんでした。' and return if @user.nil?
  end

  def new
    @user = User.new
  end

  def confirm
    attributes = user_params
    attributes[:display_name] = attributes[:name] # 初期では表示名とユーザー名を合わせる
    @user = User.new(attributes)

    if @user.valid?
      flash.now[:notice] = 'ユーザーを作成しました。表示名・パスワードを指定してください。'
      render :confirm
    else
      flash.now[:alert] = 'ユーザーを作成できませんでした'
      render :new
    end
  end

  def create
    @user = User.new(user_params)

    image.tempfile = ImageProcessing::MiniMagick.source(image.tempfile).resize_to_fill(120, 120).call if params[:image]

    if @user.save
      redirect_to admin_user_edit_path({ user_id: @user.id }), notice: 'ユーザーを作成しました'
    else
      flash.now[:alert] = 'ユーザーを作成できませんでした'
      render :new
    end
  end

  def update
    @user = User.find_by({ id: params[:user_id] })

    redirect_to admin_user_new_path, alert: '予期せぬエラーが発生しました' and return if @user.nil?

    ActiveRecord::Base.transaction do
      if params[:image]
        image.tempfile = ImageProcessing::MiniMagick.source(image.tempfile).resize_to_fill(120, 120).call
        @user.remove_image!
      end

      @user.update!(user_params)
    end
    redirect_to admin_user_edit_path({ user_id: @user.id }), notice: '更新しました'
    rescue
      flash.now[:alert] = '更新できませんでした'
      render :edit
  end

  def destory
    @user = User.find_by({ id: params[:user_id] })

    redirect_to admin_user_path, alert: '予期せぬエラーが発生しました' and return if @user.nil?

    @user.remove_image = true

    if @user.save!(validate: false)
      @user.delete
      # ログインユーザーを削除した場合はログイン画面へ遷移させる
      if current_user?(@user)
        log_out
        redirect_to login_path, notice: 'ユーザーが削除されたためログアウトしました'
      else
        redirect_to admin_user_path, notice: '削除しました'
      end

      return
    end

    redirect_to admin_user_path, notice: '削除に失敗しました'
  end

  def bulk(action, user_ids)
    redirect_to admin_user_path, alert: '対象のユーザーを選択してください' and return if user_ids.nil?

    if action == 'delete'
      user_ids.each do |id|
        user = User.find_by({ id: id })

        user.remove_image!
        user.delete
      end

      redirect_to admin_user_path, notice: '削除しました' and return
    end

    redirect_to admin_user_path, alert: '一括操作を選択して実行してください'
  end

  def user_params
    params.require(:user).permit(:name, :email, :display_name, :image, :password, :password_confirmation)
  end

  def user_bulk_params
    params.require(:user).permit(:action, :selector)
  end
end
