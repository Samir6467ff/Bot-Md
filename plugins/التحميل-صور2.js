import fs from 'fs';
import { googleImage } from '@bochilteam/scraper';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  

  if (!text) {
    throw `يجب عليك إدخال نص بعد الأمر. مثال: ${usedPrefix + command} ناروتو`; // Fixed text if query is missing
  }

  try {
    const res = await googleImage(text);
    const images = await res.getImages(); // Get all images
    if (images.length === 0) {
      throw 'لم يتم العثور على صور.'; // No images found
    }

    const sendImage = async (index) => {
      if (index >= images.length) {
        throw 'لا توجد صور إضافية.'; // No more images
      }

      const link = images[index];
      const messa = await prepareWAMessageMedia({ image: { url: link } }, { upload: conn.waUploadToServer });
      const dataMessage = `هنا هي الصورة التي وجدتها عن ${text}.\nيمكنك مشاهدة الصورة في الرابط التالي: ${link}.\nتم البحث باستخدام Google Image.`;
      const msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: { text: dataMessage },
              footer: { text: `${global.wm}`.trim() },
              header: {
                hasMediaAttachment: true,
                imageMessage: messa.imageMessage,
              },
              nativeFlowMessage: {
                buttons: [
                  {
                    name: 'quick_reply',
                    buttonParamsJson: JSON.stringify({
                      display_text: 'التالي',
                      id: `${usedPrefix + command} ${text} ${index + 1}`
                    })
                  }
                ],
                messageParamsJson: "",
              },
            },
          }
        }
      }, { userJid: conn.user.jid, quoted: m });
      await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    };

    // Initial image
    await sendImage(0);

  } catch (error) {
    console.error('Error fetching image:', error);
    throw 'حدث خطأ أثناء جلب الصورة. يرجى المحاولة مرة أخرى لاحقًا.'; // Generic error message for image fetching issues
  }
};

handler.help = ['صور <query>', 'images <query>'];
handler.tags = ['internet', 'tools'];
handler.command = /^(صور|images)$/i;

export default handler;
