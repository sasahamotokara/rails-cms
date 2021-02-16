class Api::TagController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    attribute = tag_collection_params
    slugs = attribute[:tags_attributes].to_h.map {|_, val| val[:slug]}
    @form = Form::TagCollection.new(attribute)

    if @form.save
      render json: added_tags(slugs)
    else
      render json: { status: 'error!', data: '' }, status: :not_found
    end
  end

  def added_tags(slugs)
    hash = {}

    slugs.each_with_index do |slug, index|
        hash[index] = Slug.find_by(:slug => slug).tag
    end

    return hash
  end

  def tag_collection_params
    params.require(:tags).permit(tags_attributes: %i[slug name])
  end
end
