/* eslint-disable no-unneeded-ternary */
module.export = {
  mode: process.env.NODE_ENV === 'production' ? 'live' : 'sandbox',
  sandbox: process.env.NODE_ENV !== 'production' ? false : true,
  sandbox_email:
    process.env_NODE_ENV === 'production'
      ? null
      : 'c96345091068982927232@sandbox.pagseguro.com.br',
  email: process.env.PS_EMAIL,
  token: process.env.PS_TOKEN,
  notificationURL: process.env.PS_NOTIFICATIONURL,
};
