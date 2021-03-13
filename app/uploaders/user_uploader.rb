class UserUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  # Choose what kind of storage to use for this uploader:
  storage :file
  # storage :fog

  def root
    "#{Rails.root}/public"
  end

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    'images/users'
  end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  def default_url
    '/images/users/user_image.png'
  end

  # Process files as they are uploaded:
  # process scale: [200, 300]
  #
  def scale
    process resize_to_fill [120, 120]
  end

  # Create different versions of your uploaded files:
  # version :thumb do
  #   process resize_to_fit: [50, 50]
  # end

  # Add an allowlist of extensions which are allowed to be uploaded.
  # For images you might use something like this:
  def extension_allowlist
    %w(jpg jpeg gif png)
  end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  def filename
    "user_image_#{model.id}.#{file.extension}" if original_filename.present?
  end
end
