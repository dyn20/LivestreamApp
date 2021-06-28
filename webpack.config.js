const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const path = require('path');
module.exports = {
    entry: './src/Livestream/src/app.js',
    output: {
      path: path.join(__dirname, "src/public/dist"),
      filename: 'bundle.js',
    },
    mode: 'development',
    plugins: [
        new NodePolyfillPlugin()
    ]
}