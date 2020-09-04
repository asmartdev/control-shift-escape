module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      title: "Control Shift Escape",
    },
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /.mdx?$/,
          use: ["babel-loader", "@mdx-js/vue-loader"],
        },
      ],
    },
  },
};
