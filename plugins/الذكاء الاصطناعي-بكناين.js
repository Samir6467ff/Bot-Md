import fetch from 'node-fetch';
import fs from 'fs';
import uploader from '../lib/uploadImage.js';

const handler = async (m, {conn, text, usedPrefix, command}) => {
  const datas = global;
  const language = datas.db.data.users[m.sender].language;
  const translation = JSON.parse(fs.readFileSync(`./language/${language}.json`));
  const messages = translation.BK9.BK9;

  let fakecontact = { 
    'key': { 
      'participants': '0@s.whatsapp.net', 
      'remoteJid': 'status@broadcast', 
      'fromMe': false, 
      'id': '𝐒𝐇𝐀𝐖𝐀𝐙𝐀-𝐁𝐎𝐓' 
    }, 
    'message': { 
      'contactMessage': { 
        'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
      } 
    }, 
    'participant': '0@s.whatsapp.net' 
  };

  if (command === 'تخيل') {
    if (!text) throw 'الرجاء إدخال النص للتخيل.';

    await conn.sendMessage(m.chat, {text: 'الرجاء الانتظار، يتم الآن معالجة طلبك...'}, {quoted: m});

    try {
      const response = await fetch(`https://api.bk9.site/ai/photoleap?q=${encodeURIComponent(text)}`);
      const result = await response.json();

      if (result.status) {
        await conn.sendButton(
          m.chat,
          `نتيجة التخيل عن : ${text}`, 
          '𝐒𝐇𝐀𝐖𝐀𝐙𝐀-𝐁𝐎𝐓',
          result.BK9,
          [
            ['صورة آخري 🧞', `${usedPrefix + command} ${text}`]
          ],
          { quoted: fakecontact }
        );
      }
    } catch (error) {
      throw 'حدث خطأ أثناء معالجة طلب التخيل.';
    }
  } else if (command === 'بكناين') {
    if (!text) throw 'الرجاء إدخال النص.';

    try {
      conn.sendPresenceUpdate('composing', m.chat);
      const response = await fetch(`https://api.bk9.site/ai/gpt4?q=${encodeURIComponent(text)}`);
      const result = await response.json();

      if (result.status && result.BK9) {
        conn.reply(m.chat, result.BK9, m);
      } else {
        throw 'حدث خطأ أثناء معالجة طلب بكناين.';
      }
    } catch (error) {
      throw 'حدث خطأ أثناء معالجة طلب بكناين.';
    }
  } else if (command === 'شوف') {
    let quotedMessage = m.quoted ? m.quoted : m;
    let mediaType = (quotedMessage.msg || quotedMessage).mimetype || quotedMessage.mediaType || '';

    if (/image/g.test(mediaType) && !/webp/g.test(mediaType)) {
      try {
        let imageBuffer = await quotedMessage.download();
        let uploadedImageUrl = await uploader(imageBuffer);
        let response = await fetch(`https://api.bk9.site/ai/geminiimg?url=${uploadedImageUrl}&q=${text}`);
        let result = await response.json();

        conn.sendMessage(m.chat, { text: result.BK9 }, { quoted: m });
      } catch (error) {
        throw 'حدث خطأ أثناء معالجة الصورة.';
      }
    } else {
      throw 'الرجاء إرسال صورة بصيغة مدعومة.';
    }
  }
};

handler.command = ['تخيل', 'بكناين', 'شوف'];
handler.tags = ['ai'];
export default handler;
