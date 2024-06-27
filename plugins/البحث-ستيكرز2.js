/* Created By https://github.com/ALBERTO9883 */
import fs from 'fs';
import fetch from 'node-fetch';
import {googleImage} from '@bochilteam/scraper';


const handler = async (m, {text, usedPrefix, command, conn}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`))
  const tradutor = _translate.plugins.buscador_stickersearch2

  if (!text) throw `*${tradutor.texto1}*`;
  try {
    const res2 = await googleImage(text);
    const sfoto = res2.getRandom();
    const json = await fetch(`https://api.lolhuman.xyz/api/stickerwa?apikey=${lolkeysapi}&query=${text}`);
    const jsons = await json.json();
    const {stickers} = jsons.result[0];
    const res = jsons.result.map((v, index) => `${tradutor.texto2[0]} ${1 + index}\n*${tradutor.texto2[1]}* ${v.title}\n*${tradutor.texto2[2]}* ${v.author}\n*${tradutor.texto2[3]}* ${v.url}`).join`\n\n───\n\n`;
    await conn.sendFile(m.chat, sfoto, 'error.jpg', res, m);
  } catch {
    await m.reply('*[❗] خطا، يرجى المحاولة مرة أخرى*');
  }
};
handler.command = ['stickersearch2', 'ستيكرز2'];
export default handler;
