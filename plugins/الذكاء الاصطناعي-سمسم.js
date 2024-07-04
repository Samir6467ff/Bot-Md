import translate from '@vitalets/google-translate-api';
import axios from 'axios';
import fs from 'fs';

const handler = async (m, { conn, text, command, usedPrefix }) => {
  const datas = global;
  const idioma = datas.db.data.users[m.sender].language;
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`));
  const tradutor = _translate.plugins.fun_simi;

  if (!text) throw `يرجى إدخال نص لاستخدام هذا الأمر: ${usedPrefix + command}`;

  try {
    // Translate input text to Arabic if it's not in Arabic
    const inputLang = await detectLanguage(text);
    if (inputLang !== 'ar') {
      text = (await translate(text, { to: 'ar' })).text;
    }

    const resSimi = await simitalk(text);

    // Translate response to Arabic if it's not in Arabic
    const responseLang = await detectLanguage(resSimi.resultado.simsimi);
    if (responseLang !== 'ar') {
      resSimi.resultado.simsimi = (await translate(resSimi.resultado.simsimi, { to: 'ar' })).text;
    }

    conn.sendMessage(m.chat, { text: resSimi.resultado.simsimi }, { quoted: m });
  } catch {
    throw "حدث خطأ أثناء محاولة الحصول على رد من سمسمي. يرجى المحاولة لاحقًا.";
  }
};

handler.help = ['سمسم'].map((v) => v + ' <نص>');
handler.tags = ['fun'];
handler.command = /^(سمسمي|سمسم)$/i;

export default handler;

async function simitalk(ask, apikeyyy = "iJ6FxuA9vxlvz5cKQCt3", language = "ar") {
  if (!ask) return { status: false, resultado: { msg: "يجب عليك إدخال نص للتحدث مع سمسمي." }};
  try {
    const response1 = await axios.get(`https://delirios-api-delta.vercel.app/tools/simi?text=${encodeURIComponent(ask)}`);
    let trad1 = await translate(`${response1.data.data.message}`, { to: language, autoCorrect: true });
    if (trad1.text === 'indefinida' || !response1.data) throw new Error("الرد غير محدد");
    return { status: true, resultado: { simsimi: trad1.text } };
  } catch {
    try {
      const response2 = await axios.get(`https://anbusec.xyz/api/v1/simitalk?apikey=${apikeyyy}&ask=${ask}&lc=${language}`);
      return { status: true, resultado: { simsimi: response2.data.message } };
    } catch (error2) {
      return { status: false, resultado: { msg: "جميع واجهات برمجة التطبيقات فشلت. حاول مرة أخرى لاحقًا.", error: error2.message }};
    }
  }
}

async function detectLanguage(text) {
  try {
    const result = await translate(text, { to: 'en' });
    return result.from.language.iso;
  } catch (error) {
    return 'und'; // If language detection fails, return undefined
  }
}
