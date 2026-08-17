
// More info here : https://blog.jakoblind.no/webpack-bundle-analyzer/#should-you-analyze-the-production-or-dev-bundle

const webpack = require("webpack")
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin
  const webpackConfigProd = require("./webpack.config");
// const webpackConfigProd = require("webpack.config")(
//   "production"
// )

webpackConfigProd.plugins.push(new BundleAnalyzerPlugin())

webpack(webpackConfigProd, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err)
  }
})