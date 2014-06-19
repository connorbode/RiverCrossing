module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage',
      'karma-chrome-launcher'
    ],

    files: [

      // dependencies
      'bower_components/lodash/dist/lodash.min.js',

      // app
      'app/**/*.js',
      'spec/**/*.spec.js'
    ],

    preprocessors: {
      'app/**/*.js': ['coverage']
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },

    browsers: ['PhantomJS']
  })
};