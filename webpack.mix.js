const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */


mix.options({
    hmrOptions: {
        host: '127.0.0.1',
        port: 8001
    }
});

mix.react('resources/ts/app.ts', 'public/js');
mix.webpackConfig({
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: [".ts", ".tsx"]
        },
        devServer: {
            headers: {
                'Test': 'http://127.0.0.1:8001/'
            }
        }
});
