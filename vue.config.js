const path = require("path");

module.exports = {
  publicPath: "./",
  outputDir: path.resolve(__dirname, "./cordova/www"),

  pluginOptions: {
    cordovaPath: "cordova",
  },

  transpileDependencies: ["vuetify"],
};
