import axios from 'axios';

class LivestreamController {
  async getLive(req, res) {
    // const { user } = req.body;

    const getToken = await axios
      .post(
        `https://id.twitch.tv/oauth2/token?client_secret=${process.env.TWITCH_SECRET}&client_id=${process.env.TWITCH_CLIENT}&grant_type=client_credentials`
      )
      .then((response) => response.data);

    const getLive = await axios
      .get(
        `https://api.twitch.tv/helix/streams?user_login=casimito&user_login=gaules&user_login=cidcidoso&user_login=sofiaespanha&user_login=gabepeixe&user_login=loud_coringa&user_login=ofilipemoreno`,
        {
          headers: {
            Authorization: `Bearer ${getToken.access_token}`,
            'Client-ID': `${process.env.TWITCH_CLIENT}`,
          },
        }
      )
      .then((response) => response.data)
      .catch((err) => err);

    return res.json(getLive);
  }
}

export default new LivestreamController();
