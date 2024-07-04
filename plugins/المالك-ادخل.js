const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
let enviando;
const handler = async (m, {conn, text, isMods, isOwner, isPrems, usedPrefix ,command}) => {
  

 if (enviando) return;
     enviando = true 
     m.reply('جاري طلب الانضمام 🧞‍♂️...');
  try {
    const link = text //(m.quoted ? m.quoted.text ? m.quoted.text : text : text) || text;
    if (!link || !link.match(linkRegex)) throw `فين اللينك ي حوب 🧞`;
    const [_, code] = link.match(linkRegex) || [];

// الحصول على معلومات المجموعة
    const groupMetadata = await conn.groupGetInviteInfo(code);
    const groupImage = await conn.getProfilePicture(groupMetadata.id);
    const groupDescription = groupMetadata.desc;
    const groupOwner = groupMetadata.owner;
    const groupMembers = groupMetadata.participants.length;

    const data = global.owner.filter(([id]) => id)[0];
      const dataArray = Array.isArray(data) ? data : [data];
      const ownerNumber = dataArray[0];
    
    if ( isPrems || isMods || isOwner || m.fromMe) {
      const res = await conn.groupAcceptInvite(code);
      await conn.sendMessage(m.chat, {text: `تم الانضمام ي مطوري 🧞‍♂️.`}, {quoted: m})
      enviando = false 
    } else {
    
      conn.sendMessage(m.chat, {text:`تم ارسال طلب الانضمام إلي مطوري ${ownerNumber.split('@')[0]} 🧞`}, {quoted: m});
      const msg = `طلب من @${m.sender.split('@')[0]} للانضمام إلى المجموعة:\n\n*—◉ رابط المجموعة:* ${link}\n*—◉ وصف المجموعة:* ${groupDescription}\n*—◉ المنشئ:* @${groupOwner.split('@')[0]}\n*—◉ عدد الأعضاء:* ${groupMembers}`;
     const buttons = [['انضمــام', `${usedPrefix + command} ${link}`]];
     
      for (const entry of dataArray) await conn.sendButton(entry + '@s.whatsapp.net', msg, author, groupImage, buttons, m);
      
      //conn.sendMessage(entry + '@s.whatsapp.net', {text: tradutor.texto4 + '@' + m.sender.split('@')[0] + '\n*—◉ Link del grupo:* ' + link, mentions: [m.sender], contextInfo: {forwardingScore: 9999999, isForwarded: true, mentionedJid: [m.sender], "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "renderLargerThumbnail": true, "title": global.titulowm2, "containsAutoReply": true, "mediaType": 1, "thumbnail": imagen6, "mediaUrl": `${link}`, "sourceUrl": `${link}`}}}, {quoted: m});
      enviando = false 
    }
  } catch (error) {
    enviando = false 
    console.error("خطأ أثناء محاولة الانضمام إلى المجموعة:", error); 
    throw "خيرها في غيرها جرب تاني ي حوب 🧞.";
  }
};
handler.help = ['join [chat.whatsapp.com]'];
handler.tags = ['premium'];
handler.command = /^join|ادخل|انضمام$/i;
handler.private = true;
export default handler;
