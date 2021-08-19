// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // baseUrl: 'https://staging.godtribe.com/wp-json/api/v1/',
  campfireBaseUrl: 'http://localhost:5000/',
  web: {
    dev: 'https://staging.godtribe.com/wp-json/api/v1/',
    prod: 'https://godtribe.com/wp-json/api/v1/',
  },
  native: {
    dev: 'https://staging.godtribe.com/wp-json/wp/v2/',
    prod: 'https://godtribe.com/wp-json/wp/v2/',
  },
  user: {
    subscribed: 'users/subscribed',
    current: 'users/current',
  },
  campfire: 'campfires/',
};
