import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

let handler = async (m, { isROwner, usedPrefix, command, text }) => {
    await m.reply(global.wait);
    if (!isROwner) return;

    let [subCommand, ...args] = text.split(' ');

    switch (subCommand) {
        case 'l':
            try {
                let fileListMessage = await listFiles();
                m.reply(fileListMessage);
            } catch (e) {
                console.error(`حدث خطأ أثناء عرض قائمة الملفات: ${e.message}`);
                m.reply(`حدث خطأ أثناء عرض قائمة الملفات: ${e.message}`);
            }
            break;

        case 'c':
            if (args.length < 2 && !m.quoted) {
                throw `يرجى تحديد اسم الملف والبيانات لإنشاء الملف، مثال:\n${usedPrefix + command} c example.js <البيانات>`;
            }
            try {
                await handleCreateFile(args, m);
            } catch (e) {
                console.error(`حدث خطأ أثناء إنشاء الملف ${args[0]}: ${e.message}`);
                m.reply(`حدث خطأ أثناء إنشاء الملف ${args[0]}: ${e.message}`);
            }
            break;

        case 'v':
            if (args.length < 1) {
                throw `يرجى تحديد اسم الملف المراد عرضه، مثال:\n${usedPrefix + command} v example.js`;
            }
            let viewFilename = args[0].trim();
            if (!viewFilename.endsWith('.js')) {
                viewFilename += '.js';
            }
            try {
                await displayFileContent(viewFilename, m);
            } catch (e) {
                console.error(`حدث خطأ أثناء عرض الملف ${viewFilename}: ${e.message}`);
                m.reply(`حدث خطأ أثناء عرض الملف ${viewFilename}: ${e.message}`);
            }
            break;

        case 'e':
            if (args.length < 2) {
                throw `يرجى تحديد اسم الملف المراد تعديله والنص الجديد، مثال:\n${usedPrefix + command} e example.js <النص الجديد>`;
            }
            let [editFilename, ...newFileData] = args;
            let newData = newFileData.join(' ');
            if (!editFilename.endsWith('.js')) {
                editFilename += '.js';
            }
            try {
                await modifyFile(editFilename, newData);
                m.reply(`تم تعديل الملف ${editFilename} بنجاح.`);
            } catch (e) {
                console.error(`حدث خطأ أثناء تعديل الملف ${editFilename}: ${e.message}`);
                m.reply(`حدث خطأ أثناء تعديل الملف ${editFilename}: ${e.message}`);
            }
            break;

        case 'd':
            if (args.length < 1) {
                throw `يرجى تحديد اسم الملف المراد حذفه، مثال:\n${usedPrefix + command} d example.js`;
            }
            let deleteFilename = args[0].trim();
            if (!deleteFilename.endsWith('.js')) {
                deleteFilename += '.js';
            }
            try {
                await deleteFile(deleteFilename);
                m.reply(`تم حذف الملف ${deleteFilename} بنجاح.`);
            } catch (e) {
                console.error(`حدث خطأ أثناء حذف الملف ${deleteFilename}: ${e.message}`);
                m.reply(`حدث خطأ أثناء حذف الملف ${deleteFilename}: ${e.message}`);
            }
            break;

        default:

m.reply(`

*┏ ┅ ━━━━━━━━ ${name} ━━━━━━━━━ ┅ ━*
*┇ 「 مرحبا هذا الأمر خاص بالتحكم بمحتويات المسار `plugins`. 」*
*┣ ┅ ━━━━━━━━┇الامثلة┇━━━━━━━━━ ┅ ━*
*┃- ${usedPrefix + command} l لعرض قائمة الملفات*
*┃- ${usedPrefix + command} c لإضافة ملف جديد*
*┃- ${usedPrefix + command} v لعرض محتوى الملف *
*┃- ${usedPrefix + command} e لتعديل محتوى الملف*
*┃- ${usedPrefix + command} d لحذف ملف*
*┗ ┅ ━━━━━━━━━━━━━━━━━ ┅ ━*

`);
    }
};

handler.help = ['patch'];
handler.tags = ['owner'];
handler.command = /^(p)$/i;
handler.rowner = true;

export default handler;


// دالة لحفظ التغييرات 
const execPromise = (command) => new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            reject(error);
        } else {
            resolve(stdout || stderr);
        }
    });
});

const gitAddAndCommit = async (message) => {
    try {
        await execPromise('git add .');
        await execPromise(`git commit -m "${message}"`);
        console.log('التغييرات تم إضافتها والتزامها بنجاح.');
    } catch (err) {
        console.error(`فشل في إضافة أو الالتزام بالتغييرات: ${err.message}`);
    }
};


// دالة للحصول على قائمة الملفات في الدليل
let listFiles = async () => {
    let directoryPath = path.join('plugins');

    try {
        let files = await fs.promises.readdir(directoryPath);

        if (files.length === 0) {
            throw new Error('لا توجد ملفات في الدليل.');
        }

        // ترقيم الملفات والفصل بينها بزخارف
        let fileListMessage = `قائمة الملفات في الدليل:\n\n`;
        files.forEach((file, index) => {
            fileListMessage += `${index + 1}. ${file}\n---\n`;
        });

        return fileListMessage;
    } catch (err) {
        throw new Error(`فشل في استرداد قائمة الملفات: ${err.message}`);
    }
};


// دالة لإنشاء الملف
let createFile = async (filename, data) => {
    let filePath = path.join('plugins', filename);

    try {
        await fs.promises.writeFile(filePath, data, 'utf8');
        console.log(`تم إنشاء الملف ${filename} بنجاح.`);
        await gitAddAndCommit(`إنشاء الملف ${filename}`);
    } catch (err) {
        console.error(`فشل في إنشاء الملف ${filename}: ${err.message}`);
        throw err;
    }
};

// إضافة الملف كـ نص بعد الأمر أو كملف js يتم قراءة اسمه والمحتوى النصي الموجود بداخله
let handleCreateFile = async (args, m) => {
    let [filename, ...fileData] = args;
    if (m.quoted && m.quoted.mimetype === 'application/javascript') {
        // إذا كان الرد على ملف js، قم بقراءة الاسم والمحتوى من الملف
        filename = m.quoted.fileName;
        fileData = [await m.quoted.download()];
    }
    let data = fileData.join(' ');
    if (!filename.endsWith('.js')) {
        filename += '.js';
    }
    try {
        await createFile(filename, data);
        m.reply(`تم إنشاء الملف ${filename} بنجاح.`);
    } catch (e) {
        console.error(`حدث خطأ أثناء إنشاء الملف ${filename}: ${e.message}`);
        m.reply(`حدث خطأ أثناء إنشاء الملف ${filename}: ${e.message}`);
    }
};


// دالة لعرض محتوى الملف
let displayFileContent = async (filename, m) => {
    let filePath = path.join('plugins', filename);

    try {
        await fs.promises.access(filePath, fs.constants.F_OK);
    } catch (err) {
        throw new Error(`الملف ${filename} غير موجود.`);
    }

    try {
        let fileContent = await fs.promises.readFile(filePath, 'utf8');
        // إرسال محتوى الملف كنص
        await m.reply(`نص الملف ${filename}:\n\n${fileContent}`);
        // إرسال الملف كملف js
        await m.sendFile(filePath, filename, fileContent);
    } catch (err) {
        throw new Error(`فشل في قراءة الملف ${filename}: ${err.message}`);
    }
};

// دالة لتعديل الملف
let modifyFile = async (filename, newData) => {
    let filePath = path.join('plugins', filename);

    try {
        await fs.promises.access(filePath, fs.constants.F_OK);
    } catch (err) {
        throw new Error(`الملف ${filename} غير موجود.`);
    }

    try {
        let currentData = await fs.promises.readFile(filePath, 'utf8');
        let updatedData = currentData.replace(/.*/, newData);

        await fs.promises.writeFile(filePath, updatedData, 'utf8');
        console.log(`تم تعديل الملف ${filename} بنجاح.`);
        await gitAddAndCommit(`تعديل الملف ${filename}`);
    } catch (err) {
        console.error(`فشل في تعديل الملف ${filename}: ${err.message}`);
        throw err;
    }
};

// دالة لحذف الملف
let deleteFile = async (filename) => {
    let filePath = path.join('plugins', filename);

    try {
        await fs.promises.access(filePath, fs.constants.F_OK);
    } catch (err) {
        throw new Error(`الملف ${filename} غير موجود.`);
    }

    try {
        await fs.promises.unlink(filePath);
        console.log(`تم حذف الملف ${filename} بنجاح.`);
        await gitAddAndCommit(`حذف الملف ${filename}`);
    } catch (err) {
        console.error(`فشل في حذف الملف ${filename}: ${err.message}`);
        throw err;
    }
};
