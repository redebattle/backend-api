import { Http } from '@sentry/node/dist/integrations';
import axios from 'axios';

import Configuracoes from '../models/Configuracoes';

class GetPlayersOnline {
  // async getSkinName(req, res) {
  //   try {
  //     const { username } = req.query;
  //     const skin = await axios.get(`https://minotar.net/body/${username}/100`);
  //     res.set({ 'Content-Type': 'image/jpg' });
  //     res.send(skin.data);
  //   } catch (e) {
  //     res.status(400).json({
  //       error: 'Não foi possível completar a requisição ',
  //       message: e.message,
  //     });
  //   }
  // }

  async getOnlineServer(req, res) {
    try {
      const { server_ip, server_port } = await Configuracoes.findOne();
      const minetools = await axios.get(
        `https://api.mcsrvstat.us/2/${server_ip}`
        // `https://api.minetools.eu/api/${server_ip}/${server_port}`
      );
      res.json(minetools.data);
    } catch (e) {
      res.status(400).json({
        status: '400',
        type: 'MinecraftAPI.Unexpected.OnlineServer',
        title: 'Ocorreu um erro durante a execução.',
        message: 'Não foi possível completar a requisição.',
        details: e.message,
        instance: '/api/v1/api/server',
      });
    }
  }

  async getOnlineServerQuery(req, res) {
    try {
      const { server_ip, server_port } = await Configuracoes.findOne();
      const minetools = await axios.get(
        `https://api.minetools.eu/query/${server_ip}/${server_port}`
      );
      res.json(minetools.data);
    } catch (e) {
      res.status(400).json({
        status: '400',
        type: 'MinecraftAPI.Unexpected.OnlineServerQuery',
        title: 'Ocorreu um erro durante a execução.',
        message: 'Não foi possível completar a requisição.',
        details: e.message,
        instance: '/api/v1/api/query',
      });
    }
  }

  async getOnlineDiscord(req, res) {
    try {
      const { discord_guild_id } = await Configuracoes.findOne();
      const discord = await axios.get(
        `https://discordapp.com/api/guilds/${discord_guild_id}/widget.json`
      );
      res.json(discord.data);
    } catch (e) {
      res.status(400).json({
        status: '400',
        type: 'MinecraftAPI.Unexpected.DiscordOnline',
        title: 'Ocorreu um erro durante a execução.',
        message: 'Não foi possível completar a requisição.',
        details: e.message,
        instance: '/api/v1/api/discord',
      });
    }
  }
}

export default new GetPlayersOnline();
