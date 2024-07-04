const linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;
let enviando = false;

const handler = async (m, { conn, text, isMods, isOwner, isPrems, usedPrefix, command }) => {
  

  try {
    const link = text;
    if (!link || !link.match(linkRegex)) throw 'فين اللينك ي حوب 🧞';
    const [_, code] = link.match(linkRegex) || [];

    // الحصول على معلومات المجموعة
    const groupMetadata = await conn.groupGetInviteInfo(code);
    const groupImage = await conn.getProfilePicture(groupMetadata.id);
    const groupDescription = groupMetadata.desc;
    const groupOwner = groupMetadata.owner;
    const groupMembers = groupMetadata.participants.length;

    const ownerData = global.owner.filter(([id]) => id)[0];
    const ownerArray = Array.isArray(ownerData) ? ownerData : [ownerData];
    const ownerNumber = ownerArray[0];

    if (isPrems || isMods || isOwner || m.fromMe) {
      await conn.groupAcceptInvite(code);
      await conn.sendMessage(m.chat, { text: 'تم الانضمام ي مطوري 🧞‍♂️.' }, { quoted: m });
    } else {
      conn.sendMessage(m.chat, { text: `تم ارسال طلب الانضمام إلي مطوري ${ownerNumber.split('@')[0]} 🧞` }, { quoted: m });

      const msg = `طلب من @${m.sender.split('@')[0]} للانضمام إلى المجموعة:\n\n*—◉ رابط المجموعة:* ${link}\n*—◉ وصف المجموعة:* ${groupDescription}\n*—◉ المنشئ:* @${groupOwner.split('@')[0]}\n*—◉ عدد الأعضاء:* ${groupMembers}`;
      const buttons = [['انضمــام', `${usedPrefix + command} ${link}`]];

      for (const entry of ownerArray) {
        await conn.sendButton(entry + '@s.whatsapp.net', msg, 'author', groupImage, buttons, m);
      }
    }
  } catch (error) {
    console.error("خطأ أثناء محاولة الانضمام إلى المجموعة:", error);
    throw 'خيرها في غيرها جرب تاني ي حوب 🧞.';
  } finally {
    enviando = false;
  }
};

handler.help = ['join [chat.whatsapp.com]'];
handler.tags = ['premium'];
handler.command = /^join|ادخل|انضمام$/i;
handler.private = true;

export default handler;

// By: 𝗦𝗔𝗬𝗘𝗗-𝗦𝗛𝗔𝗪𝗔𝗭𝗔
