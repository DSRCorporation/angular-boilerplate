const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const StringReplacePlugin = require('string-replace-webpack-plugin')
const _ = require('lodash')
const glob = require('glob')

const packageJson = JSON.parse(fs.readFileSync('./package.json'))

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      //checks standard rules
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'standard-loader',
        exclude: /(node_modules)/
      },
      // loads assets files
      {
        test: /\.(png|jpg|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            exportAsEs6Default: true
          }
        }
      },
      // extracts .less to one .css file
      {
        test: /index.less$/i,
        use: ExtractTextPlugin.extract({
          use: [
            {loader: 'css-loader'},
            {loader: 'postcss-loader'},
            {loader: 'less-loader'}]
        })
      },
      // injects @import statements in the index.less file
      {
        test: /index.less$/,
        loader: StringReplacePlugin.replace({
          replacements: [
            {
              pattern: /\/\/@inject imports/ig,
              replacement: function (match, p1, offset, string) { //eslint-disable-line
                let imports = ''

                glob.sync('src/**/*.less').forEach(function (fileName) {
                  fileName = fileName.replace(/^(src)\//, '')
                  imports += `@import "${fileName}";`
                })

                return imports
              }
            }
          ]
        })
      },
      // generates index.js for containers and components
      {
        test: /index.js$/,
        loader: StringReplacePlugin.replace({
          replacements: [
            {
              pattern: /\/\/ @inject imports/ig,
              replacement: function (match, p1, offset, string) { //eslint-disable-line
                let context = this.context
                let contextFolder = path.relative(path.join(__dirname, 'src'), context)

                let components = glob.sync(path.join(context, '**'))
                  .filter(source => {
                    // only folders with index.js file or .js file but not index.js
                    if (fs.lstatSync(source).isDirectory()) {
                      return path.relative(source, context) && fs.existsSync(path.join(source, 'index.js'))
                    }

                    return path.extname(source) === '.js' && path.basename(source) !== 'index.js'
                  })
                  .map(directory => path.relative(context, directory).replace('\\', '/').replace(/\.js+$/, ''))

                let importStatements = components.reduce((res, c) => {
                  res += `import ${_.camelCase(path.basename(c))} from '${contextFolder}/${c}';`
                  return res
                }, '')
                return `${importStatements} export default { 
                        ${components.map(c => _.camelCase(path.basename(c))).join(',')} };`
              }
            }
          ]
        })
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, './src'),
      'node_modules'
    ]
  },
  context: __dirname,
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.ejs'),
      title: packageJson.name,
      module: packageJson.name
    }),
    new ExtractTextPlugin({filename: '[contenthash].styles.css'}),
    new StringReplacePlugin()
  ]
}
