const handler = async (m, { conn, text, usedPrefix, command }) => {
  const datas = global;
  const idioma = datas.db.data.users[m.sender].language;
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`));
  const traductor = {
    customcmd: _translate.plugins.customcmd,
    addcmd: _translate.plugins.cmd_add,
    delcmd: _translate.plugins.cmd_del,
    listcmd: _translate.plugins.cmd_list,
  };

  const subcommand = command[1];
  switch (subcommand) {
    case 'ضيف':
      global.db.data.sticker = global.db.data.sticker || {};
      if (!m.quoted) throw `*${traductor.addcmd.texto1}*`;
      if (!m.quoted.fileSha256) throw `*${traductor.addcmd.texto2}*`;
      if (!text) throw `${traductor.addcmd.texto3[0]}\n—◉ ${usedPrefix + command} ${traductor.addcmd.texto3[1]}\n\n${traductor.addcmd.texto3[2]}\n—◉ ${usedPrefix + command} <#menu> ${traductor.addcmd.texto3[3]}`;
      
      const sticker = global.db.data.sticker;
      const hash = m.quoted.fileSha256.toString('base64');
      if (sticker[hash] && sticker[hash].locked) throw `*${traductor.addcmd.texto4}*`;
      sticker[hash] = { text, mentionedJid: m.mentionedJid, creator: m.sender, at: +new Date(), locked: false };
      m.reply(`*${traductor.addcmd.texto5}*`);
      break;

    case 'حذف':
      let hash = text;
      if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex');
      if (!hash) throw `*${traductor.delcmd.texto1} ${usedPrefix}listcmd*`;
      const stickerDel = global.db.data.sticker;
      if (stickerDel[hash] && stickerDel[hash].locked) throw `*${traductor.delcmd.texto2}*`;
      delete stickerDel[hash];
      m.reply(`*${traductor.delcmd.texto3}*`);
      break;

    case 'الكل':
      conn.reply(
        m.chat,
        `
${traductor.listcmd.texto1}

${Object.entries(global.db.data.sticker)
  .map(([key, value], index) => `*${index + 1}.*\n*𝙲𝙾𝙳𝙸𝙶𝙾:* ${value.locked ? `*(𝚋𝚕𝚘𝚚𝚞𝚎𝚊𝚍𝚘)* ${key}` : key}\n*𝙲𝙾𝙼𝙰𝙽𝙳𝙾/𝚃𝙴𝚇𝚃𝙾:* ${value.text}`)
  .join('\n\n')}
        `.trim(),
        null,
        { mentions: Object.values(global.db.data.sticker).map((x) => x.mentionedJid).reduce((a, b) => [...a, ...b], []) }
      );
      break;

    default:
      throw `ليس في قائمة الاوامر`;
  }
};

handler.command = ['امر'];
handler.rowner = true;
export default handler;
