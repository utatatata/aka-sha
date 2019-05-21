const axios = require('axios')
const url = require('url')
const config = require('./config')

const joinUrl = (...urlComponents) =>
  urlComponents
    .map(component => component.replace(/^\//, '').replace(/\/$/, ''))
    .join('/')

const buildUrl = (apiUrl, params) =>
  `${joinUrl(config.host, config.base, apiUrl)}?${new url.URLSearchParams({
    api_key: config.apiKey,
    ...params,
  }).toString()}`

const get = uri => axios.get(uri).then(res => res.data)

module.exports = {
  buildUrl,
  get,
}
