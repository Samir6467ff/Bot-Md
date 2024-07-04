const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
let enviando;
const handler = async (m, { conn, text, isMods, isOwner, isPrems }) => {
  const datas = global;

  if (enviando) return;
  enviando = true;
  try {
    const link = text;
    if (!link || !link.match(linkRegex)) throw "الرابط غير صالح أو مفقود.";
    const [_, code] = link.match(linkRegex) || [];

    // الحصول على معلومات المجموعة
    const groupMetadata = await conn.groupGetInviteInfo(code);
    const groupImage = await conn.getProfilePicture(groupMetadata.id);
    const groupDescription = groupMetadata.desc;
    const groupOwner = groupMetadata.owner;
    const groupMembers = groupMetadata.participants.length;

    let chatInfo = "شات خاص";
    if (m.isGroup) {
      const groupChatMetadata = await conn.groupMetadata(m.chat);
      chatInfo = `مجموعة: ${groupChatMetadata.subject}`;
    }

    if (isPrems || isMods || isOwner || m.fromMe) {
      const res = await conn.groupAcceptInvite(code);
      await conn.sendMessage(m.chat, { text: "تم الانضمام إلى المجموعة بنجاح." }, { quoted: m });
      enviando = false;
    } else {
      await conn.sendMessage(m.chat, { text: "ليس لديك الإذن للانضمام إلى المجموعة مباشرة. سيتم إرسال طلب إلى المسؤول." }, { quoted: m });
      const data = global.owner.filter(([id]) => id)[0];
      const dataArray = Array.isArray(data) ? data : [data];
      for (const entry of dataArray) {
        await conn.sendMessage(
          entry + '@s.whatsapp.net',
          {
            text: `طلب من @${m.sender.split('@')[0]} للانضمام إلى المجموعة من ${chatInfo}:\n\n*—◉ رابط المجموعة:* ${link}\n*—◉ وصف المجموعة:* ${groupDescription}\n*—◉ المنشئ:* @${groupOwner.split('@')[0]}\n*—◉ عدد الأعضاء:* ${groupMembers}`,
            mentions: [m.sender, groupOwner],
            contextInfo: {
              forwardingScore: 9999999,
              isForwarded: true,
              mentionedJid: [m.sender, groupOwner],
              externalAdReply: {
                showAdAttribution: true,
                containsAutoReply: true,
                renderLargerThumbnail: true,
                title: global.titulowm2,
                mediaType: 1,
                thumbnail: groupImage, // استخدام صورة المجموعة هنا
                mediaUrl: `${link}`,
                sourceUrl: `${link}`
              }
            }
          },
          { quoted: m }
        );
      }
      enviando = false;
    }
  } catch {
    enviando = false;
    throw "حدث خطأ أثناء محاولة الانضمام إلى المجموعة. يرجى المحاولة مرة أخرى لاحقًا.";
  }
};
handler.help = ['join [chat.whatsapp.com]'];
handler.tags = ['premium'];
handler.command = /^join|ادخل$/i;
handler.private = true;
export default handler;









/*
const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
let enviando;
const handler = async (m, {conn, text, isMods, isOwner, isPrems}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`))
  const tradutor = _translate.plugins.owner_join

 if (enviando) return;
     enviando = true 
  try {
    const link = text //(m.quoted ? m.quoted.text ? m.quoted.text : text : text) || text;
    if (!link || !link.match(linkRegex)) throw tradutor.texto1;
    const [_, code] = link.match(linkRegex) || [];
    if ( isPrems || isMods || isOwner || m.fromMe) {
      const res = await conn.groupAcceptInvite(code);
      await conn.sendMessage(m.chat, {text: tradutor.texto2}, {quoted: m})
      enviando = false 
    } else {
      conn.sendMessage(m.chat, {text: tradutor.texto3}, {quoted: m});
      const data = global.owner.filter(([id]) => id)[0];
      const dataArray = Array.isArray(data) ? data : [data];
      for (const entry of dataArray) await conn.sendMessage(entry + '@s.whatsapp.net', {text: tradutor.texto4 + '@' + m.sender.split('@')[0] + '\n*—◉ Link del grupo:* ' + link, mentions: [m.sender], contextInfo: {forwardingScore: 9999999, isForwarded: true, mentionedJid: [m.sender], "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "renderLargerThumbnail": true, "title": global.titulowm2, "containsAutoReply": true, "mediaType": 1, "thumbnail": imagen6, "mediaUrl": `${link}`, "sourceUrl": `${link}`}}}, {quoted: m});
      enviando = false 
    }
  } catch {
    enviando = false 
    throw tradutor.texto5;
  }
};
handler.help = ['join [chat.whatsapp.com]'];
handler.tags = ['premium'];
handler.command = /^join|ادخل$/i;
handler.private = true;
export default handler;
*/
