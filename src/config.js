const defaultConfig = {
  isProduction: false,
  apiURL: 'http://localhost:8080',
  port: process.env.PORT,
  vat: 0.07,
  serviceFee: 0.07,
  stripeKey: 'pk_test_NrQ8vs4zfGcppdcFjw8jFNDV',
  s3Bucket: 'hyperworks-tix-dev',
  s3URL: 'https://s3-ap-southeast-1.amazonaws.com',
  maxSellPrice: 1.2,
  app: {
    name: 'Ticketlister'
  }
};

const defaultStaging = Object.assign({}, defaultConfig);
const defaultProd = Object.assign({}, defaultConfig);

module.exports = {
  development: defaultConfig,
  staging: Object.assign(defaultStaging, {
    apiURL: 'http://tix.hyperworks.co.th/api',
    s3Bucket: 'hyperworks-tix-staging'
  }),
  production: Object.assign(defaultProd, {
    isProduction: true,
    apiURL: 'http://ticketlister.com/api',
    stripeKey: 'pk_test_NrQ8vs4zfGcppdcFjw8jFNDV',
    s3Bucket: 'hyperworks-tix'
  })
}[process.env.NODE_ENV || 'development'];
