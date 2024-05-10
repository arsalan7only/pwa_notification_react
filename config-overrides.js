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
  "default-src": ["'none'"],
  "script-src": ["'self'", "https://cdnjs.cloudflare.com"],
  "style-src": [
    "'self'",
    "https://cdnjs.cloudflare.com",
    "https://fonts.gstatic.com",
    "https://fonts.googleapis.com/css?family=Handlee",
  ],
  "img-src": ["'slef'", "data:"],
  "connect-src": ["'self'", "https://fakestoreapi.com/products"],
  "font-src": [
    "'self'",
    "https://fonts.gstatic.com/s/handlee/v18/-F6xfjBsISg9aMakPm3wow.woff2",
    "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/fonts/slick.woff",
    "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/fonts/slick.ttf",
  ],
  "frame-src": ["'self'"],
  "form-action": ["'self'"],
  "manifest-src": ["'self'"],
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
