module WebpackBundleHelper
    class BundleNotFound < StandardError
    end

    def asset_bundle_path(file)
        if assets.key?(file)
            return assets.fetch(file)
        end

        raise BundleNotFound, "Could not find bundle with name #{file}"
    end

    private

    def assets
        @assets = Hash.new
        Dir.glob("public/assets/**/*.{js,css}") do |file|
            unless File.directory?(file)
                @assets[File.basename(file)] = file.scan(/\/assets.+/)[0]
            end
        end

        return @assets
    end
end
