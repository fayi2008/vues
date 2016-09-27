var webpack = require('webpack')
var ExtractTextPlugin=require('extract-text-webpack-plugin')
var path=require('path')

module.exports = {
    //页面入口文件配置
    entry: {
        index: './public/static/js/index.js'
    },
    //入口文件输出配置
    output: {
        path: 'dist',
        filename: 'js/[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            {test: /\.vue$/, loader: 'vue'},
            {test: /\.less/, loader: ExtractTextPlugin.extract("style-loader", 'css-loader!less-loader!autoprefixer-loader')},
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader','css-loader!less-loader!autoprefixer-loader')},
            {test: /\.js$/, loader: 'babel-loader',exclude: /(node_modules|bower_components)/},
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    // 配置babel转化成es5的语法
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },

    plugins: [
        new ExtractTextPlugin('css/[name].css'),
        new webpack.optimize.CommonsChunkPlugin({name: "com", minChunks: 3}),
        new webpack.ProvidePlugin({// 全局依赖,不需要import了
            $ : "jquery",
            jQuery : "jquery",
            "window.jQuery" : "jquery",
            vue:"vue",
            _plus:path.join(__dirname,'/src/public.js')
        })
    ]

}