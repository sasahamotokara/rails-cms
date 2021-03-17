module WebpackBundleHelper
  class BundleNotFound < StandardError
  end

  def asset_bundle_path(file)
    return assets.fetch(file) if assets.key?(file)

    raise BundleNotFound, "Could not find bundle with name #{file}"
  end

  private

  def assets
    assets = {}

    Dir.glob('public/assets/**/*.{js,css}') do |file|
      assets[File.basename(file)] = file.scan(%r{/assets.+})[0] unless File.directory?(file)
    end

    assets
  end
end
