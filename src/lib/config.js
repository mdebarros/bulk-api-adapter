const RC = require('parse-strings-in-object')(require('rc')('BKAPI', require('../../config/default.json')))

const DEFAULT_PROTOCOL_VERSION = {
  CONTENT: '1.1',
  ACCEPT: {
    DEFAULT: '1', // This is not currently used by this service, but it is here for consistency between services. In future if we need to default the ACCEPT protocol, then this should be used.
    VALIDATELIST: [
      '1',
      '1.1'
    ]
  }
}

const getProtocolVersions = (defaultProtocolVersions, overrideProtocolVersions) => {
  const T_PROTOCOL_VERSION = { ...defaultProtocolVersions, ...overrideProtocolVersions }
  if (overrideProtocolVersions && overrideProtocolVersions.ACCEPT) T_PROTOCOL_VERSION.ACCEPT = { ...defaultProtocolVersions.ACCEPT, ...overrideProtocolVersions.ACCEPT }
  if (T_PROTOCOL_VERSION.ACCEPT && T_PROTOCOL_VERSION.ACCEPT.VALIDATELIST && (typeof T_PROTOCOL_VERSION.ACCEPT.VALIDATELIST === 'string' || T_PROTOCOL_VERSION.ACCEPT.VALIDATELIST instanceof String)) {
    T_PROTOCOL_VERSION.ACCEPT.VALIDATELIST = JSON.parse(T_PROTOCOL_VERSION.ACCEPT.VALIDATELIST)
  }
  return T_PROTOCOL_VERSION
}

// Set config object to be returned
const config = {
  HOSTNAME: RC.HOSTNAME.replace(/\/$/, ''),
  PORT: RC.PORT,
  MONGODB_URI: RC.MONGODB.URI,
  AMOUNT: RC.AMOUNT,
  DFSP_URLS: RC.DFSP_URLS,
  HANDLERS: RC.HANDLERS,
  HANDLERS_DISABLED: RC.HANDLERS.DISABLED,
  HANDLERS_API: RC.HANDLERS.API,
  HANDLERS_API_DISABLED: RC.HANDLERS.API.DISABLED,
  KAFKA_CONFIG: RC.KAFKA,
  ENDPOINT_CACHE_CONFIG: RC.ENDPOINT_CACHE_CONFIG,
  ENDPOINT_SOURCE_URL: RC.ENDPOINT_SOURCE_URL,
  ENDPOINT_HEALTH_URL: RC.ENDPOINT_HEALTH_URL,
  INSTRUMENTATION_METRICS_DISABLED: RC.INSTRUMENTATION.METRICS.DISABLED,
  INSTRUMENTATION_METRICS_CONFIG: RC.INSTRUMENTATION.METRICS.config,
  ENDPOINT_SECURITY: RC.ENDPOINT_SECURITY,
  ENDPOINT_SECURITY_TLS: RC.ENDPOINT_SECURITY.TLS,
  MAX_FULFIL_TIMEOUT_DURATION_SECONDS: RC.MAX_FULFIL_TIMEOUT_DURATION_SECONDS,
  PROTOCOL_VERSIONS: getProtocolVersions(DEFAULT_PROTOCOL_VERSION, RC.PROTOCOL_VERSIONS)
}

module.exports = config
