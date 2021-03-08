class Api::CategoryController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @category = Category.new(category_params)

    ActiveRecord::Base.transaction do
      if @category.save
        @slug = Slug.new(:slug => params[:category][:slug], :category_id => @category.id)

        unless @slug.save
          @category.errors.merge!(@slug.errors)
          raise ActiveRecord::RecordInvalid.new(Slug.new)
        end

        @category.update!(:slug_id => @slug.id)
      else
        @slug = Slug.new(:slug => params[:category][:slug])
        @category.errors.merge!(@slug.errors) if @slug.invalid?
        raise ActiveRecord::RecordInvalid.new(Category.new)
      end
    end
      render json: { id: @category.id, name: @category.name, color: @category.color }
    rescue
      render json: { status: 'error', message: @category.errors.full_messages }, status: 400
  end

  def category_params
    params.require(:category).permit(:name, :color)
  end
end
