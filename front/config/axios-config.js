const axios = require('axios');
const config = require('./configurations');

module.exports = axios.default.create({
  baseURL: config.url
})
