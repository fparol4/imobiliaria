const axios = require('axios');
const config = require('./configurations');

module.exports = axios(config.url)