import fs from 'fs';
import { googleImage } from '@bochilteam/scraper';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  
  if (!text) {
    throw `*فين النص اللي هتبحث عنو ي حوب 🧞* \n> ${usedPrefix + command} ناروتو`; // Fixed text if query is missing
  }

  // Example content filtering (uncomment and adjust as needed)
  // if (m.text.includes('gore') || m.text.includes('cp') || m.text.includes('porno')) {
  //   return m.reply('Content not allowed.'); // Example response for prohibited content
  // }

  try {
    const res = await googleImage(text);
    const image = await res.getRandom();
    const link = image;
    conn.sendFile(m.chat, link, 'error.jpg', `> هنا هي الصورة التي وجدتها عن ${text}.\n> يمكنك مشاهدة الصورة في الرابط التالي: ${link}.\n>.تم البحث باستخدام Google Image.`, m);
  } catch (error) {
    console.error('Error fetching image:', error);
    throw 'حدث خطأ أثناء جلب الصورة. يرجى المحاولة مرة أخرى لاحقًا 🧞.'; // Generic error message for image fetching issues
  }
};

handler.help = ['image <query>', 'صوره <query>'];
handler.tags = ['internet', 'tools'];
handler.command = /^(صوره|image)$/i;

export default handler;







/*
import {googleImage} from '@bochilteam/scraper';

const handler = async (m, {conn, text, usedPrefix, command}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`))
  const tradutor = _translate.plugins.downloader_imagen


  if (!text) throw `${tradutor.texto1} ${usedPrefix + command} Minecraft*`;
  //if (m.text.includes('gore') || m.text.includes('cp')|| m.text.includes('porno')|| m.text.includes('Gore')|| m.text.includes('rule')|| m.text.includes('CP')|| m.text.includes('Rule34')) return m.reply('[❗𝐈𝐍𝐅𝐎❗] 𝙽𝙾 𝙿𝚄𝙴𝙳𝙾 𝙴𝙽𝚅𝙸𝙰𝚁 𝙴𝚂𝚃𝙴 𝙲𝙾𝙽𝚃𝙴𝙽𝙸𝙴𝙽𝙳𝙾 𝙴𝚂𝚃𝙰 𝙿𝚁𝙾𝙷𝙸𝙱𝙸𝙳𝙾 𝙴𝙻 𝙶𝚁𝚄𝙿𝙾\n𝚂𝙸 𝙴𝚂 𝙰𝙳𝙼𝙸𝙽 𝚈 𝙳𝙴𝚂𝙴𝙰 𝙰𝙲𝚃𝙸𝚅𝙰𝚁𝙻𝙾𝚂 𝚄𝚂𝙴 𝙴𝙻 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 #enable modohorny');
  const res = await googleImage(text);
  const image = await res.getRandom();
  const link = image;
  conn.sendFile(m.chat, link, 'error.jpg', `${tradutor.texto2[0]} ${text}\n${tradutor.texto2[1]} ${link}\n${tradutor.texto2[2]}`, m);
};
handler.help = ['gimage <query>', 'imagen <query>'];
handler.tags = ['internet', 'tools'];
handler.command = /^(gimage|image|imagen)$/i;
export default handler;
*/
