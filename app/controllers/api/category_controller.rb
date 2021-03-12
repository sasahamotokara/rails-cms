class Api::CategoryController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @category = Category.new(category_params)

    ActiveRecord::Base.transaction do
      if @category.save
        @term = Term.new(:slug => params[:category][:slug], :category_id => @category.id)

        unless @term.save
          @category.errors.merge!(@term.errors)
          raise ActiveRecord::RecordInvalid.new(Term.new)
        end

        @category.update!(:term_id => @term.id)
      else
        @term = Term.new(:slug => params[:category][:slug])
        @category.errors.merge!(@term.errors) if @term.invalid?
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
