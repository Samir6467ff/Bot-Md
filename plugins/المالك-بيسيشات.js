import fs from 'fs';

const DELAY_TIME = 500; // Delay time in milliseconds
const LATITUDE = 35.685506276233525;
const LONGITUDE = 139.75270667105852;
const ACCURACY = 0;
const CLOCKWISE_FROM_MAGNETIC_NORTH = 2;
const SEQUENCE_NUMBER = 2;
const TIME_OFFSET = 3;

const delay = (time) => new Promise((res) => setTimeout(res, time));


const handler = async (m, { conn, text }) => {
  try {
    

    if (!text) throw "*فين الرسالة ي مطوري 🧞‍♂️*";

    const chats = Object.entries(conn.chats)
      .filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats)
      .map(([jid]) => jid);

    const cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m;
    const teks = text || cc.text;

    for (const i of chats) {
      await delay(DELAY_TIME);
      await conn.relayMessage(
        i,
        {
          liveLocationMessage: {
            degreesLatitude: LATITUDE,
            degreesLongitude: LONGITUDE,
            accuracyInMeters: ACCURACY,
            degreesClockwiseFromMagneticNorth: CLOCKWISE_FROM_MAGNETIC_NORTH,
            caption: `*موقع مباشر:* ${teks}`,
            sequenceNumber: SEQUENCE_NUMBER,
            timeOffset: TIME_OFFSET,
            contextInfo: m,
          },
        },
        {}
      ).catch((err) => console.error(`فشل في إرسال الرسالة إلى ${i}:`, err));
    }

    m.reply(`*تم الإرسال إلى ≽${chats.length}≼ محادثة 🧞.*`);
  } catch (err) {
    console.error('حدث خطأ في المعالج:', err);
    m.reply('حدث خطأ أثناء بث الرسالة.');
  }
};

handler.help = ['broadcastchats', 'bcchats'].map((v) => v + ' <نص>');
handler.tags = ['owner'];
handler.command = /^(بيسيشات|bcchat)$/i;
handler.rowner = true;

export default handler;
