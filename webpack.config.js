const path = require(`path`);

module.export = {
  mode: `development`,
  devtool: `source-map`,
  entry: `./src/main.js`,
  output: {
    path: path.join(__dirname, `public`),
    filename: `bundle.js`
  }
};
