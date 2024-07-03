import fetch from 'node-fetch';

const handler = async (m, {conn, text, usedPrefix, command}) => {

  if (!text) {
    throw `$◉─━════════════━─◉\n> *مرحبًا، أنا خدمة `Character Ai`، خدمة قادرة على كتابة المقالات وكتابة الاكواد البرمجية، على سبيل المثال:*\n\n- ${usedPrefix + command} `كتابة مقال عن الذكاء الاصطناعي`\n◉─━════════════━─◉`;
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);

    const API_URL = `https://vihangayt.me/tools/characterai?q=${encodeURIComponent(text)}`;
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.status && data.data) {
      const respuestaAPI = data.data;
      conn.reply(m.chat, respuestaAPI, m);
    } else {
      throw `◉─━════════════━─◉\n> خطأ : لم يتم العثور على الإجابة، يرجى المحاولة مجددًا.\n◉─━════════════━─◉`;
    }
  } catch (error) {
    throw `◉─━════════════━─◉\n> خطأ : انتهت مدة الجلسة، يرجى المحاولة لاحقًا.\n◉─━════════════━─◉`;
  }
};

handler.command = /^شرك$/i;

export default handler;
