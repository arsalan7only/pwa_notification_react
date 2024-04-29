// const { override } = require("customize-cra");
// const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

// module.exports = override((config) => {
//   // Add the CSP plugin to the Webpack config
//   config.plugins.push(
//     new cspHtmlWebpackPlugin({
//       "default-src": "'self'",
//       "script-src": ["'self'"],
//       "style-src": ["'self'"],
//       // Add more directives as needed
//       hashEnabled: {
//         "script-src": true,
//         "style-src": true,
//       },
//       nonceEnabled: {
//         "script-src": true,
//         "style-src": true,
//       },
//     })
//   );

//   return config;
// });

// const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {
//   // Other webpack configuration options...

//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./public/index.html",
//       // Add other options as needed
//     }),
//     new CspHtmlWebpackPlugin({
//       "default-src": "'self'",
//       "script-src": ["'self'"],
//       "style-src": ["'self'"],
//       // Add more directives as needed
//       hashEnabled: {
//         "script-src": true,
//         "style-src": true,
//       },
//       nonceEnabled: {
//         "script-src": true,
//         "style-src": true,
//       },
//     }),
//   ],
// };

// const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {
//   // Other webpack configuration options...
//   devServer: {
//     // Other dev server options...
//     headers: {
//       "Content-Security-Policy":
//         "default-src 'self'; script-src 'self'; style-src 'self';",
//     },
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./public/index.html",
//       // Add other options as needed
//     }),
//     new CspHtmlWebpackPlugin({
//       "default-src": "'self'",
//       "script-src": ["'self'"],
//       "style-src": ["'self'"],
//       // Add more directives as needed
//       hashEnabled: {
//         "script-src": true,
//         "style-src": true,
//       },
//       nonceEnabled: {
//         "script-src": true,
//         "style-src": true,
//       },
//     }),
//   ],
// };

const { override } = require("customize-cra");
const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");
const { webpack } = require("react-app-rewired/config-overrides");

const cspConfigPolicy = {
  "default-src": "'none'",
  "script-src": ["'self'"],
  "style-src": ["'self'"],
  "object-src": "'none'",
  "img-src": ["'self'"],
  "media-src": ["'self'"],
  "font-src": ["'self'"],
};

function addCspHtmlWebPackPlugin(config) {
  if (process.env.NODE_ENV == "production") {
    config.plugins.push(new cspHtmlWebpackPlugin(cspConfigPolicy));
  }
  return config;
}

module.exports = {
  webpack: override(addCspHtmlWebPackPlugin),
};
