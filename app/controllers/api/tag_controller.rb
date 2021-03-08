class Api::TagController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @tag = Tag.new(tag_params)

    ActiveRecord::Base.transaction do
      if @tag.save
        @slug = Slug.new(:slug => params[:tag][:slug], :tag_id => @tag.id)

        unless @slug.save
          @tag.errors.merge!(@slug.errors)
          raise ActiveRecord::RecordInvalid.new(Slug.new)
        end

        @tag.update!(:slug_id => @slug.id)
      else
        @slug = Slug.new(:slug => params[:tag][:slug])
        @tag.errors.merge!(@slug.errors) if @slug.invalid?
        raise ActiveRecord::RecordInvalid.new(Tag.new)
      end
    end
      render json: { id: @tag.id, name: @tag.name }
    rescue
      render json: { status: 'error', message: @tag.errors.full_messages }, status: 400
  end

  def tag_params
    params.require(:tag).permit(:name)
  end
end
