import fs from 'fs';
import axios from 'axios';

let timeout = 60000;
let poin = 500;

let handler = async (m, { conn, usedPrefix }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {};

    let id = m.chat;
    if (id in conn.tekateki) {
        conn.reply(m.chat, `*⟥•════─━⋄❲ ❳⋄━─════•⟤*
*┊في سؤال لسه مجاوبتش عليه يا فاشل ┃❌ ❯*
*⟥•════─━⋄❲ ❳⋄━─════•⟤*`.trim(), conn.tekateki[id][0]);
        throw false;
    }

    try {
        const fileId = '11jJscIoOjmcSeeRcjQ1a6hmMff485aPy';
        const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
        const res = await axios.get(url);

        if (res.data && Array.isArray(res.data)) {
            let tekateki = res.data;
            let json = tekateki[Math.floor(Math.random() * tekateki.length)];
            
            let _clue = json.response;
            let clue = _clue.replace(/[A-Za-z]/g, '_');
            let img = json.image || 'https://telegra.ph/file/7e1acd4edc4c20253a447.jpg';
            let answer = json.response;
             let questions = json.question || 'من هو هذا ؟';
             

            let caption = `*⟥•════─━⋄❲ ❳⋄━─════•⟤*

*┊ السـؤال❓↞* ${questions}

*┊ الـوقـت⏳↞ ${(timeout / 1000).toFixed(2)}*

*┊ الـجـائـزة💰↞ ${poin} نقاط*

*⟥•════─━⋄❲ ❳⋄━─════•⟤*`.trim();

            conn.tekateki[id] = [
                await conn.sendMessage(m.chat, { image: { url: img }, caption: caption }, { quoted: m }),
                json, poin,
                setTimeout(async () => {
                    if (conn.tekateki[id]) await conn.reply(m.chat, `*⟥•════─━⋄❲ ❳⋄━─════•⟤*
*┊ خلص الوقت وانت زي منت فاشل مجوبتش*
*┊ الاجابه اهي : ${answer}*
*⟥•════─━⋄❲ ❳⋄━─════•⟤*`.trim(), conn.tekateki[id][0]);

                    delete conn.tekateki[id];
                }, timeout)
            ];

        } else {
            console.error('The received data is not a valid JSON array.');
        }
    } catch (error) {
        console.error('Error fetching data from Google Drive:', error);
    }
};

handler.help = ['acertijo'];
handler.tags = ['game'];
handler.command = /^(دين)$/i;

export default handler;
