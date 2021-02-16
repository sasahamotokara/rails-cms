class Api::CategoryController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    attribute = category_collection_params
    slugs = attribute[:categories_attributes].to_h.map {|_, val| val[:slug]}
    @form = Form::CategoryCollection.new(attribute)

    if @form.save
      render json: added_categories(slugs)
    else
      render json: { status: 'error!', data: '' }, status: :not_found
    end
  end

  def added_categories(slugs)
    hash = {}

    slugs.each_with_index do |slug, index|
      hash[index] = Slug.find_by(:slug => slug).category
    end

    return hash
  end

  def category_collection_params
    params.require(:categories).permit(categories_attributes: %i[slug name])
  end
end
