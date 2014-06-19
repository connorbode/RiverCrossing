module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],
    files: [

      // dependencies
      'bower_components/lodash/dist/lodash.min.js',

      // app
      'app/**/*.js',
      'app/**/*.spec.js'
    ],
    browsers: ['PhantomJS']
  })
};