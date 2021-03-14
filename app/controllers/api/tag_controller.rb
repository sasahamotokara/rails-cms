class Api::TagController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @tag = Tag.new(tag_params)
    slug = params[:tag][:slug]

    ActiveRecord::Base.transaction do
      if @tag.save
        @term = Term.new({ slug: slug, tag_id: @tag.id })

        unless @term.save
          @tag.errors.merge!(@term.errors)
          raise ActiveRecord::RecordInvalid.new(@term.errors.full_messages, Term.new)
        end

        @tag.update!({ term_id: @term.id })
      else
        @term = Term.new({ slug: slug })
        @tag.errors.merge!(@term.errors) if @term.invalid?
        raise ActiveRecord::RecordInvalid.new(@tag.errors.full_messages, Tag.new)
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
