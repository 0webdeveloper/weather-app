const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  },
  filenameHashing: false,

  outputDir: './static/widget-app.loc',
  publicPath: process.env.NODE_ENV === 'production'
      ? 'static/widget-app.loc' //static/dist
      : '/',

  devServer: {
    port: 8080
  },
  css: { extract: false } // при сборке не будет выносить css в отдельный файл
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       additionalData: '@import "@/assets/css/style.scss";'
  //     }
  //   }
  // }
})
