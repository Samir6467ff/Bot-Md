 import fetch from 'node-fetch';

var handler = async (m, { text, usedPrefix, command }) => {
  if (!text) {
    throw "◉─━════════════━─◉\n> *مرحبًا، أنا خدمة `Bard Ai`، خدمة قادرة على كتابة المقالات وكتابة الاكواد البرمجية، على سبيل المثال:*\n\n- .بيرد `كتابة مقال عن الذكاء الاصطناعي`\n◉─━════════════━─◉";
  }

  try {

    const apiUrl = `https://aemt.me/bard?text=${text}`;
    const response = await fetch(apiUrl);
    const res = await response.json();

    if (res.result.length > 0) {
      m.reply(res.result);
    } else {
      throw '◉─━════════════━─◉\n> خطأ : لم يتم العثور على الإجابة، يرجى المحاولة مجددًا.\n◉─━════════════━─◉';
    }

  } catch (error) {
    console.error(error);
    throw '◉─━════════════━─◉\n> خطأ : انتهت مدة الجلسة، يرجى المحاولة لاحقًا.\n◉─━════════════━─◉';
  }
};

handler.command = ['bard', 'بيرد'];
handler.help = ['bard'];
handler.tags = ['أدوات'];
export default handler;