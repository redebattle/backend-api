module.exports = {
  generateVerifyCode2FA: (n) => {
    let num = '';
    for (let i = 0; i < n; i++) num += Math.floor(Math.random() * 10);
    return num;
  },
};
