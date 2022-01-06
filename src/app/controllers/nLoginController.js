// /* eslint-disable new-cap */
// import nLogin from 'nlogin';

// class nLoginController {
//   async checkRegister(req, res) {
//     let deu = false;

//     const nloginInstance = await new nLogin(
//       process.env.NLOGIN_HOST,
//       process.env.NLOGIN_USER,
//       process.env.NLOGIN_PASS,
//       process.env.NLOGIN_DBNAME,
//       (err) => {
//         if (err !== null) {
//           deu = true;
//         }
//       }
//     );

//     nloginInstance.isUserRegistered('themito', (isRegistered) => {
//       console.log(isRegistered ? 'Registered' : 'Not registered');
//     });

//     nloginInstance.checkPassword('SrMitinho', '123456', (isCorrectPass) => {
//       console.log(isCorrectPass ? 'Access granted!' : 'Access denied!');
//     });

//     return res.json({ deu });
//   }
// }

// export default new nLoginController();
