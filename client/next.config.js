module.exports = {
  webpaclDevMiddleware: config => {
    config.watchOptions.poll = 300;
    return config;
  }
}