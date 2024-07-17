import similarity from 'similarity'
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !/^/i.test(m.quoted.text)) return !0
    this.tekateki = this.tekateki ? this.tekateki : {}
    if (!(id in this.tekateki)) return
    if (m.quoted.id == this.tekateki[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tekateki[id][1]))
        if (m.text.toLowerCase() == json.response.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tekateki[id][2]
            m.reply(`*⟥•════─━⋄❲ ❳⋄━─════•⟤*\n\n*┊ أحسنت لقد فزت إجابتك صحيحة 🧞*\n\n*┊جائزتك : ❲ ${this.tekateki[id][2]} ❳ نقطه 🧞*\n\n*⟥•════─━⋄❲ ❳⋄━─════•⟤*`)
            clearTimeout(this.tekateki[id][3])
            delete this.tekateki[id]
        } else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= threshold) {
            m.reply(`*⟥•════─━⋄❲ ❳⋄━─════•⟤*\n*┊ قربت من الإجابة، أتأكد من النص وجرب تاني 🧞*\n*⟥•════─━⋄❲ ❳⋄━─════•⟤*`)
        } else {
            m.reply('*⟥•════─━⋄❲ ❳⋄━─════•⟤*\n*┊ أجابه خاطئه يا فاشل، جرب تاني 🧞*\n*⟥•════─━⋄❲ ❳⋄━─════•⟤*')
        }
    }
    return !0
}

handler.exp = 0

export default handler
