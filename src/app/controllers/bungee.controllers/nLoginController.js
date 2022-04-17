import nLogin from 'nlogin';

import Users from '../../models/Users';

class nLoginController {
  async checkUser(req, res) {
    try {
      let isCorrectPass;
      const { username, password } = req.body;

      const isExist = await Users.findOne({ where: { username } });

      const nloginInstance = new nLogin(
        process.env.DB_HOST_BUNGEE,
        process.env.DB_USER_BUNGEE,
        process.env.DB_PASS_BUNGEE,
        process.env.DB_NAME_BUNGEE,
        (err) => {
          console.log(err == null ? 'Connected!' : 'Error connecting!');
        }
      );

      nloginInstance.checkPassword(
        username,
        password,
        async (isCorrectPass) => {
          console.log(isCorrectPass);
          if (isCorrectPass) {
            if (!isExist) {
              const cadastro = await Users.create({
                name: req.body.username,
                username,
                email: 'none',
                password,
                refresh_token: 'none',
                token_expires_date: new Date(),
                is_validated: false,
                is_administrator: false,
                is_email_notification_enable: false,
                is_verified: false,
                is_banned: false,
              });
              console.log(cadastro);
            } else {
              console.log('NAO FOI DEsSA VEZ');
            }
          }
          if (!isCorrectPass) {
            console.log('Não passou');
          }
        }
      );

      return res.json('Olhe o console!');
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Ocorreu um erro', message: e.message });
    }
  }
}
export default new nLoginController();
