/**
 * 'Rails with webpack' asset templates.
 */
const fs = require('fs');
const path = require('path');
const {BannerPlugin} = require('webpack');
const browser = require('browser-sync').create();
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const LicenseCheckerWebpackPlugin = require('license-checker-webpack-plugin');

/**
 * entryFiles - 開発用フォルダに格納されている、コンパイル対象のファイル名を配列に拡張子付きで指定
 * @type {Object}
 */
const entryFiles = {
    js: ['run.js', 'admin.js'],
    sass: ['style.scss', 'admin.scss'],
};

/**
 * config - 開発・公開ファイルのディレクトリ名の設定 及び パス名取得用の処理
 * @type {Object}
 */
const config = {
    /**
     * minimizeCss - CSSの出力に関する設定
     * 圧縮されたCSSのみ出力:       compressed
     * 圧縮されていないCSSのみ出力: uncompressed
     * 圧縮・非圧縮両方を出力:      both
     * @type {String}
     */
    minimizeCss: 'both',

    /**
     * cssSourceMap - CSSファイルのMAPファイルの設定
     * webpack Devtoolと同様の指定が可能。stringで指定 または false で無効化
     * https://webpack.js.org/configuration/devtool/
     * @type {String|false}
     */
    cssSourceMap: 'source-map',

    /**
     * scriptSourceMap - JSファイルのMAPファイルの設定
     * webpack Devtoolと同様の指定が可能。stringで指定 または false で無効化
     * https://webpack.js.org/configuration/devtool/
     * @type {String|false}
     */
    scriptSourceMap: 'source-map',

    develop: {
        root: '_frontend', // 開発ファイルが格納されるルートのディレクトリ名
        sass: 'sass', // SASSリソースが格納されるディレクトリ名
        js: 'js', // JSリソースが格納されるディレクトリ名
        ecma5: 'es5', // JSリソース（es5）が格納されるディレクトリ名
    },
    production: {
        root: 'public', // 公開ファイルが格納されるルートのディレクトリ名
        common: 'assets', // 共通リソースが格納されるディレクトリ名
        css: 'stylesheets', // CSSファイルが格納されるディレクトリ名
        js: 'javascript', // JSファイルが格納されるディレクトリ名
    },
    path() {
        return {
            input: {
                sass: `./${this.develop.root}/${this.develop.sass}/`, // SASSファイルが格納されているディレクトリまでのパス
                js: `./${this.develop.root}/${this.develop.js}/`, // JSファイルが格納されているディレクトリまでのパス
                ecma5: `./${this.develop.root}/${this.develop.js}/${this.develop.ecma5}/`, // JSファイル（es5）が格納されているディレクトリまでのパス
            },
            output: {
                css: `./${this.production.root}/${this.production.common}/${this.production.css}/`, // SASS => CSSファイルのアウトプット地点までのパス
                js: `./${this.production.root}/${this.production.common}/${this.production.js}/`, // JSファイルのアウトプット地点までのパス
            },
        };
    },
};

/**
 * browserReload - browser-syncのリロードを実行するための処理
 * @return {Void}
 */
const browserReload = () => {
    browser.reload({
        stream: true,
    });
};

/**
 * getAllFilePath - 指定のディレクトリからすべてのファイルパスを再帰的に取得する
 * @param  {String} directoryName 指定のディレクトリ名
 * @return {Array<String>}  指定のディレクトリ名配下のファイルパスがすべて格納された配列
 */
const getAllFilePath = (directoryName) => {
    const filePaths = [];

    /**
     * getDirectoryEntries - ディレクトリ直下のファイルやディレクトリの情報をDirentオブジェクトの配列で返す
     * @param  {String}      targetDirectoryName 目標となるディレクトリ名
     * @return {Array}       Direntオブジェクトの配列 or 空の配列
     */
    const getDirectoryEntries = (targetDirectoryName) => {
        try {
            return fs.readdirSync(targetDirectoryName, {withFileTypes: true});
        } catch (e) {
            // ディレクトリが存在しない場合の処理
        }

        return [];
    };

    /**
     * getFilePath - 再帰的にファイルパスを取得する
     * @param  {String} targetDirectoryName 目標となるディレクトリ名
     * @return {Void}
     */
    const getFilePath = (targetDirectoryName) => {
        const directoryEntries = getDirectoryEntries(targetDirectoryName);
        const directories = [];

        for (const entry of directoryEntries) {
            // _で始まるファイル名の場合は無視
            if (entry.isFile() && /^_/u.test(entry.name)) {
                continue;
            }

            // ディレクトリだった場合`directories`にパスを追加
            if (entry.isDirectory()) {
                directories.push(`${targetDirectoryName}/${entry.name}`);

            // ファイルだった場合`filePathes`にパスを追加
            } else if (entry.isFile()) {
                filePaths.push(`${targetDirectoryName}/${entry.name}`);
            }
        }

        // ディレクトリが見つかれば、さらに深堀り
        for (const directory of directories) {
            getFilePath(directory);
        }
    };

    // 末尾の`/`を削除してパス名の取得を実行
    getFilePath(directoryName.replace(/\/$/u, ''));

    return filePaths;
};

module.exports = (env, args) => {
    const pathData = config.path();
    const ecma5Files = getAllFilePath(pathData.input.ecma5).filter((file) => /\.js$/u.test(file));

    // jsの処理
    const js = entryFiles.js.map((file) => `${pathData.input.js}${file}`).reduce((array, src) => {
        const [filename] = src.split('/').slice(-1);

        array.push({
            mode: args.mode,
            entry: src,
            output: {
                path: path.resolve(__dirname, pathData.output.js),
                filename,
            },
            cache: true,
            devtool: config.scriptSourceMap,
            module: {
                rules: [{
                    test: /\.js$/u,
                    exclude: /node_modules/u,
                    loader: 'babel-loader',
                    options: {
                        babelrc: true,
                        plugins: [
                            [
                                '@babel/plugin-transform-template-literals',
                                {
                                    loose: true,
                                },
                            ],
                        ],
                    },
                }],
            },
            optimization: {
                minimizer: [
                    new TerserPlugin({
                        test: /\.js$/u,
                        exclude: /node_modules/u,
                        terserOptions: {
                            ecma: 8,
                            compress: {
                                drop_console: args.mode !== 'development',
                                passes: 3,
                            },
                            output: {
                                beautify: args.mode === 'development',
                            },
                        },
                    }),
                ],
            },
            plugins: [
                new BannerPlugin({
                    banner: `For license information please see ${filename}.LICENSE.txt`,
                }),
                new LicenseCheckerWebpackPlugin({
                    emitError: false,
                    allow: `(${[
                        'BSD-3-Clause',
                        'BSD-2-Clause',
                        'MIT',
                        'ISC',
                        'Apache-2.0',
                        'W3C-20150513',
                        'CC0-1.0',
                    ].join(' OR ')})`,
                    outputFilename: `${filename}.LICENSE.txt`,
                }),
            ],
        });

        return array;
    }, []);

    // js(es5)の処理
    const es5 = ecma5Files.reduce((array, src) => {
        const [filename] = src.split('/').slice(-1);

        array.push({
            mode: args.mode,
            entry: src,
            output: {
                path: path.resolve(__dirname, pathData.output.js),
                filename,
            },
            cache: true,
            optimization: {
                minimizer: [
                    new TerserPlugin({
                        test: /\.js$/u,
                        exclude: /node_modules/u,
                        terserOptions: {
                            ecma: 5,
                            compress: {
                                drop_console: args.mode !== 'development',
                                passes: 3,
                            },
                        },
                    }),
                ],
            },
        });

        return array;
    }, []);

    // sassの処理
    const sass = (() => {
        const returnModules = [];
        const entryFilesObject = (() => {
            const object = {};

            for (const entry of entryFiles.sass) {
                // './docs/assets/css/style': './src/sass/style.scss'
                object[`${pathData.output.css}${entry.replace(/\.s[ac]ss$/u, '')}`] = `${pathData.input.sass}${entry}`;
            }

            return object;
        })();
        const baseModule = {
            mode: args.mode,
            entry: Object.assign(entryFilesObject),
            output: {
                path: path.resolve(__dirname, './'),
            },
            cache: true,
            module: {
                rules: [{
                    test: /\.s[ac]ss$/u,
                    use: [MiniCssExtractPlugin.loader, {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer')({
                                        grid: true,
                                    }),
                                ],
                            },
                        },
                    }, 'csscomb-loader', {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                indentWidth: 4,
                                outputStyle: 'expanded',
                            },
                        },
                    }],
                }],
            },
        };

        // 非圧縮されたCSSのみ または 圧縮・非圧縮両方出力する場合
        if (config.minimizeCss === 'uncompressed' || config.minimizeCss === 'both') {
            returnModules.push({...baseModule});

            returnModules.slice(-1)[0].plugins = [
                new FixStyleOnlyEntriesPlugin(),
                new MiniCssExtractPlugin({
                    filename: '[name].css',
                }),
            ];
        }

        // 圧縮されたCSSのみ または 圧縮・非圧縮両方出力する場合
        if (config.minimizeCss === 'compressed' || config.minimizeCss === 'both') {
            returnModules.push({...baseModule});

            returnModules.slice(-1)[0].plugins = [
                new FixStyleOnlyEntriesPlugin(),
                new MiniCssExtractPlugin({
                    filename: '[name].min.css',
                }),
            ];
            returnModules.slice(-1)[0].optimization = {
                minimizer: [
                    new OptimizeCSSAssetsPlugin({ // CSS の minify を行う
                        cssProcessorOptions: {
                            map: {
                                inline: typeof config.cssSourceMap === 'string' ? config.cssSourceMap.includes('inline') : false,
                                annotation: true,
                            },
                        },
                    }),
                ],
            };
        }

        // devtool は bothの場合、min.css のみあればOKなので最後の配列の設定のみ更新する
        returnModules.slice(-1)[0].devtool = config.cssSourceMap;

        return returnModules;
    })();

    // 開発モードの場合は browser-sync を立ち上げる
    if (args.mode === 'development') {
        browser.init({
            files: [`./${config.production.root}/**/*`, './app/views/**/*.html.*'],
            port: 3002,
            notify: false,
            server: false,
            proxy: {
                target: 'localhost:3000', // rails server を リッスン
                proxyReq: [
                    (proxyRequest) => {
                        // railsサーバーへのリクエストに対するCSRF対策
                        proxyRequest.setHeader('X-Forwarded-Host', 'localhost:3002');
                    },
                ],
            },
        });

        browserReload();
    }

    return [].concat(sass, js, es5);
};
