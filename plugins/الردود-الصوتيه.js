import fs from 'fs';
const handler = (m) => m;
handler.all = async function(m) {

const sounds = [
        "./media/احا.mp3",
        "./media/احا1.mp3"
    ];

const sounds2 = [
        "./media/بضاني.mp3",
        "./media/من انت.mp3"
    ];

const sounds3 = [
        "./media/انها المخدرات.mp3",
        "./media/ولا ايه.mp3"
    ];
const sounds4 = "./media/الصدمه.mp3";
const sounds5 = "./media/اسمع.mp3";
const sounds6 = "./media/اقلعي.mp3";

  const chat = global.db.data.chats[m.chat];

  if (/^احا|احيه$/i.test(m.text) && !chat.isBanned) {

const vn = sounds[Math.floor(Math.random() * sounds.length)];

 conn.sendPresenceUpdate('recording', m.chat);
    
m.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'sound.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
  
  } else if (/^شخره|خخخخ$/i.test(m.text) && !chat.isBanned) {

const vn = sounds2[Math.floor(Math.random() * sounds2.length)];

 conn.sendPresenceUpdate('recording', m.chat);
    
m.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'sound.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});

} else if (/^ههه|ضحك|😂$/i.test(m.text) && !chat.isBanned) {

const vn = sounds3[Math.floor(Math.random() * sounds3.length)];

 conn.sendPresenceUpdate('recording', m.chat);
    
m.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'sound.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});

} else if (/^صدمه|تبا|🙂$/i.test(m.text) && !chat.isBanned) {

const vn = sounds4;

 conn.sendPresenceUpdate('recording', m.chat);
    
m.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'sound.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});

} else if (/^اي|ايه|بقولك|قول$/i.test(m.text) && !chat.isBanned) {

const vn = sounds5;

 conn.sendPresenceUpdate('recording', m.chat);
    
m.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'sound.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});

} else if (/^خد|اقلع|لف|بعبص$/i.test(m.text) && !chat.isBanned) {

const vn = sounds6;

 conn.sendPresenceUpdate('recording', m.chat);
    
m.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'sound.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});

}
  return !0;
};
export default handler;
