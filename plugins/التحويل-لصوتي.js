import {toAudio} from '../lib/converter.js';

const handler = async (m, {conn, usedPrefix, command}) => {
 


  const q = m.quoted ? m.quoted : m;
  const mime = (q || q.msg).mimetype || q.mediaType || '';

  if (!/video|audio/.test(mime)) throw `*[❗مساعده❗] قم بالرد علي الفيديو اللي عايز تحولوا لصوت*`;
  const media = await q.download();
  if (!media) throw '*[❗𝐈𝐍𝐅𝐎❗] لقد حصل خطأ من حجم الفيديو او غيره*';
  const audio = await toAudio(media, 'mp4');
  if (!audio.data) throw '*لا يدعم*';
/*
  if (!/video|audio/.test(mime)) throw `*${tradutor.texto1}*`;
  const media = await q.download();
  if (!media) throw `*${tradutor.texto2}*`;
  const audio = await toAudio(media, 'mp4');
  if (!audio.data) throw `*${tradutor.texto3}*`;
*/
  conn.sendMessage(m.chat, {audio: audio.data, mimetype: 'audio/mpeg'}, {quoted: m});
};
handler.alias = ['tomp3', 'toaudio'];
handler.command = /^(لصوتي)$/i;
export default handler;





/*import {toAudio} from '../lib/converter.js';

const handler = async (m, {conn, usedPrefix, command}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`))
  const tradutor = _translate.plugins.convertidor_tomp3


  const q = m.quoted ? m.quoted : m;
  const mime = (q || q.msg).mimetype || q.mediaType || '';
  if (!/video|audio/.test(mime)) throw `*${tradutor.texto1}*`;
  const media = await q.download();
  if (!media) throw `*${tradutor.texto2}*`;
  const audio = await toAudio(media, 'mp4');
  if (!audio.data) throw `*${tradutor.texto3}*`;
  conn.sendMessage(m.chat, {audio: audio.data, mimetype: 'audio/mpeg'}, {quoted: m});
};
handler.alias = ['tomp3', 'toaudio'];
handler.command = /^to(mp3|audio)|لصوتي$/i;
export default handler;
