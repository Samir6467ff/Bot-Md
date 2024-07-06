const nodemailer = require('nodemailer'); // استيراد مكتبة nodemailer

handler.exec = async (m, { conn, text }) => {

  
    if (!text) return reply('**أدخل بريد البريد المرسل إليه وموضوع الرسالة ونص الرسالة.**');
    const [to, subject, message] = text.split('|');

    if (!to || !subject || !message) {
      return reply('**تأكد من إدخال البريد المرسل إليه وموضوع الرسالة ونص الرسالة مفصولة بـ "|"**');
    }

    try {
      await sendEmail(to, subject, message);
      reply('**تم إرسال البريد الإلكتروني بنجاح.**');
    } catch (error) {
      reply('**حدث خطأ أثناء إرسال البريد الإلكتروني.**');
      console.error(error);
    }
  
};

handler.command = /^(بريد)$/i;

// وظيفة إرسال البريد الإلكتروني
async function sendEmail(to, subject, message) {
  // إنشاء ناقل البريد الإلكتروني
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: email, // استخدام البريد الإلكتروني من ملف config.js
      pass: password // استخدام كلمة المرور من ملف config.js
    }
  });
  

  const mailOptions = {
    from: email, // استخدام البريد الإلكتروني من ملف config.js
    to: to,
    subject: subject,
    text: message
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        console.log('Email sent: ' + info.response);
        resolve(info);
      }
    });
  });
}

function reply(message) {
  console.log(message); // يمكنك استبدال هذا بتوجيه الرسالة إلى المستخدم
  m.reply(message);
}

