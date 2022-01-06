/* eslint-disable no-unneeded-ternary */
module.export = {
  mode: process.env.NODE_ENV === 'production' ? 'live' : 'sandbox',
  client_id: process.env.PP_CLIENT,
  client_secret: process.env.PP_SECRET,
  email: process.env.PP_EMAIL,
};
