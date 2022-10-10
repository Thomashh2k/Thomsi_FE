const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: [
    'quasar'
  ],

  configureWebpack: {

    plugins: [
      // new MonacoEditorWebpackPlugin()
    ]
  },

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  }
})
