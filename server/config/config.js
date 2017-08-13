const env = process.env.NODE_ENV || 'development'


console.log('env *****', env)

if (env === 'development' || env === 'test') {
  const config = require('./config.json') // eslint-disable-line global-require
  const envConfig = config[env]

  // Object.keys() returns an array of all the keys
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key]
  })
}
