Rails.application.routes.draw do
  root 'front_page#index'

  namespace :admin do
    root 'dashboard#index'

    get 'login' => 'login#index'
    post 'login' => 'login#create'
    delete 'logout' => 'login#destory'

    get 'post/edit'
    get 'post/new'
    get 'post' => 'post#index'
    post 'post' => 'post#create'
    patch 'post' => 'post#update'
    delete 'post' => 'post#destory'

    get 'category/edit'
    get 'category' => 'category#index'
    post 'category' => 'category#create'
    patch 'category' => 'category#update'
    delete 'category' => 'category#destory'

    get 'tag/edit'
    get 'tag' => 'tag#index'
    post 'tag' => 'tag#create'
    patch 'tag' => 'tag#update'
    delete 'tag' => 'tag#destory'

    get 'media/edit'
    get 'media/new'
    get 'media' => 'media#index'
    post 'media' => 'media#create'
    patch 'media' => 'media#update'
    delete 'media' => 'media#destory'

    get 'user/edit'
    get 'user/new'
    get 'user' => 'user#index'
    post 'user' => 'user#create'
    patch 'user' => 'user#update'
    delete 'user' => 'user#destory'

    get 'setting' => 'setting#index'
    patch 'setting' => 'setting#update'
  end

  namespace :api do
    post 'markdown-parser' => 'markdown#parse'
    post 'add-categories' => 'category#create'
    post 'add-tags' => 'tag#create'
    post 'media-upload' => 'media#create'
  end

  get 'search' => 'search#index'
  get '/:slug' => 'blog#term'
  get '/:category/:postname' => 'blog#post'
end
