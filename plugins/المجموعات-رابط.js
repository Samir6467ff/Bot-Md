import fs from 'fs';

const handler = async (m, {conn, args}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`))
  const tradutor = _translate.plugins.gc_link

  const group = m.chat;
  const link = 'https://chat.whatsapp.com/'+ await conn.groupInviteCode(group);
  const code = await conn.groupInviteCode(group);

const groupMetadata = await conn.groupGetInviteInfo(group);
    const groupImage = await conn.getProfilePicture(groupMetadata.id);
    const groupDescription = groupMetadata.desc;
    const groupOwner = groupMetadata.owner;
    const groupMembers = groupMetadata.participants.length;
  
    
  conn.reply(m.chat,link , m, {
    contextInfo: {externalAdReply: {mediaUrl: null, mediaType: 1, description: null,
      title: tradutor.texto1[0],
      body: '𝐒𝐇𝐀𝐖𝐀𝐙𝐀-𝐁𝐎𝐓',
      previewType: 0, thumbnail: groupImage,
      sourceUrl: `https://whatsapp.com/channel/0029Vael6wMJP20ze3IXJk0z`}}});
};
handler.help = ['linkgroup'];
handler.tags = ['group'];
handler.command = /^link|رابط|لينك$/i;
handler.group = true;
handler.botAdmin = true;
export default handler;
//fs.readFileSync('./Menu2.png')
