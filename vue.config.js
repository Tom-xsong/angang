const CompressionWebpackPlugin = require("compression-webpack-plugin");

// cdn预加载使用
const externals = {
  vue: "Vue",
  "vue-router": "VueRouter",
  axios: "axios",
  "element-ui": "ELEMENT",
  echarts: "echarts"
};
// 是否使用gzip
const productionGzip = true;
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ["js", "css"];


module.exports = {
  outputDir: "drawArt",
  assetsDir: "static",
  publicPath: "/",
  productionSourceMap: false,
  devServer: {
    port: 5000,
    proxy: {
      '/api': {
        target: 'http://119.84.70.208:7506',
        changeOrigin: true, 
        pathRewrite: {   
          '^/api': 'http://119.84.70.208:7506'
        }
      }
    }
  },
  // 修改webpack config, 使其不打包externals下的资源
  configureWebpack: function() {
    const myConfig = {};
    if (process.env.NODE_ENV === "production") {
      // 1. 生产环境npm包转CDN
      myConfig.externals = externals;
      myConfig.plugins = [];
      // 2. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      productionGzip &&
        myConfig.plugins.push(
          new CompressionWebpackPlugin({
            test: new RegExp(
              "\\.(" + productionGzipExtensions.join("|") + ")$"
            ),
            threshold: 8192,
            minRatio: 0.8
          })
        );
    }
    if (process.env.NODE_ENV === "development") {
      /**
       * 关闭host check，方便使用ngrok之类的内网转发工具
       */
      myConfig.devServer = {
        disableHostCheck: true
      };
    }
    return myConfig;
  },
  chainWebpack: function(config) {
    config.plugin("html").tap(args => {
      const cdn = {
        // 开发环境
        dev: {
          css: ["/static/css/common.css", "/static/css/element-ui-2.13.0.css"],
          js: []
        },
        // 生产环境
        build: {
          css: ["/static/css/common.css", "/static/css/element-ui-2.13.0.css"],
          js: [
            "/static/js/vue/vue-2.6.10.min.js",
            "/static/js/vue-router/vue-router-3.1.3.min.js",
            "/static/js/axios/axios-0.19.0.min.js",
            "/static/js/element/element-ui-2.13.0.min.js",
            "/static/js/echarts/echarts.4.3.0.min.js"
          ]
        }
      };
      if (process.env.NODE_ENV === "production") {
        args[0].cdn = cdn.build;
      }
      if (process.env.NODE_ENV === "development") {
        args[0].cdn = cdn.dev;
      }
      return args;
    });
  }
};
