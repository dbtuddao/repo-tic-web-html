const defaultConfig = {
  isProduction: false,
  apiURL: 'http://localhost:8080',
  port: process.env.PORT,
  vat: 0.07,
  serviceFee: 0.07,
  stripeKey: 'pk_test_NrQ8vs4zfGcppdcFjw8jFNDV',
  s3Bucket: 'ticketlister-dev',
  s3URL: 'https://s3-ap-southeast-1.amazonaws.com',
  maxSellPrice: 1.2,
  fbAppID: '899277670153838',
  app: {
    name: 'Ticketlister'
  }
};

const defaultStaging = Object.assign({}, defaultConfig);
const defaultProd = Object.assign({}, defaultConfig);

module.exports = {
  development: defaultConfig,
  staging: Object.assign(defaultStaging, {
    fbAppID: '899277926820479',
    apiURL: 'http://188.166.219.0/api',
    s3Bucket: 'ticketlister-staging'
  }),
  production: Object.assign(defaultProd, {
    isProduction: true,
    fbAppID: '869349749813297',
    apiURL: 'http://ticketlister.com/api',
    stripeKey: 'pk_test_NrQ8vs4zfGcppdcFjw8jFNDV',
    s3Bucket: 'ticketlister-prod'
  })
}[process.env.NODE_ENV || 'development'];
