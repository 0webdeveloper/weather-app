const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  outputDir: './static/dist',
  publicPath: process.env.NODE_ENV === 'production'
      ? '' //static/dist
      : '/',

  devServer: {
    port: 8080
  },
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       additionalData: '@import "@/assets/css/style.scss";'
  //     }
  //   }
  // }
})
