const axios = require('axios')
const url = require('url')
const config = require('./_config')

const getUri = (uri, params) =>
  `${config.host}${config.base}${uri}?${new url.URLSearchParams({
    api_key: config.apiKey,
    ...params,
  }).toString()}`

const get = uri => axios.get(uri).then(res => res.data)

module.exports = {
  getUri,
  get,
}
