const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "setprefix",
    desc: "Update prefix with iOS style and fake vCard",
    category: "owner",
    react: "⚙️",
    filename: __filename
}, async (conn, m, mek, { from, reply, text, isOwner }) => {

    // 🛡️ Owner Check
    if (!isOwner) return reply("*❌ ᴏᴡɴᴇʀ ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ*");

    // Check for input
    if (!text) return reply("*⚠️ ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ɴᴇᴡ ᴘʀᴇғɪx (ᴇ.ɢ .sᴇᴛᴘʀᴇғɪx 𒋲⍟ᬼ⃟M💀⃝⃪U⛓ST۞༒A༒ FF⛓⍟ᬼ⃟A𒋲)*");

    try {
        const previousPrefix = config.PREFIX;
        const newPrefix = text.trim();
        
        // Update the live config
        config.PREFIX = newPrefix;

        // Define the iOS-style fake vCard (𒋲⍟ᬼ⃟M💀⃝⃪U⛓ST۞༒A༒ FF⛓⍟ᬼ⃟A𒋲)
        const fakevCard = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: " 𒋲⍟ᬼ⃟M💀⃝⃪U⛓ST۞༒A༒ FF⛓⍟ᬼ⃟A𒋲 SETTINGS",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:𒋲⍟ᬼ⃟M💀⃝⃪U⛓ST۞༒A༒ FF⛓⍟ᬼ⃟A𒋲\nORG:𒋲⍟ᬼ⃟M💀⃝⃪U⛓ST۞༒A༒ FF⛓⍟ᬼ⃟A𒋲 Systems;\nTEL;type=CELL;type=VOICE;waid=254758755663:+254758755663\nEND:VCARD`
                }
            }
        };

        // iOS Styled Caption
        const caption = `* 𒋲⍟ᬼ⃟M💀⃝⃪U⛓ST۞༒A༒ FF⛓⍟ᬼ⃟A𒋲 ꜱʏꜱᴛᴇᴍ ᴄᴏɴꜰɪɢ* ⚙️\n\n` +
                        `*✨ ꜱᴛᴀᴛᴜꜱ:* Prefix Successfully Migrated\n\n` +
                        `*⬅️ ᴘʀᴇᴠɪᴏᴜꜱ:* 「 ${previousPrefix} 」\n` +
                        `*➡️ ᴄᴜʀʀᴇɴᴛ:* 「 ${newPrefix} 」\n\n` +
                        `*💡 ɴᴏᴛᴇ:* All commands including words/letters now trigger with *${newPrefix}*\n\n` +
                        `> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𒋲⍟ᬼ⃟M💀⃝⃪U⛓ST۞༒A༒ FF⛓⍟ᬼ⃟A𒋲⍟ᬼ⃟MD💀⃝⃪V2🕷️™*`;

        // Send with Newsletter Context (Small Thumbnail - iOS Style)
        await conn.sendMessage(from, { 
            image: { url: config.ALIVE_IMG || "https://files.catbox.moe/alc8yd.jpg" }, 
            caption: caption,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: config.NEWSLETTER_JID || '120363423997837331@newsletter',
                    newsletterName: "𒋲⍟ᬼ⃟M💀⃝⃪U⛓ST۞༒A༒ FF⛓⍟ᬼ⃟A𒋲 ꜱʏꜱᴛᴇᴍ ᴜᴘᴅᴀᴛᴇꜱ",
                    serverMessageId: 1
                },
                externalAdReply: {
                    title: " ᴘʀᴇꜰɪx ᴍᴀɴᴀɢᴇʀ",
                    body: `ꜱʏꜱᴛᴇᴍ ᴘʀᴇꜰɪx: ${newPrefix}`,
                    mediaType: 1,
                    renderLargerThumbnail: false,
                    thumbnailUrl: "https://files.catbox.moe/ux2l8q.jpg",
                    sourceUrl: "https://whatsapp.com/channel/0029VbCQr93Dp2QFHPhKM904"
                }
            }
        }, { quoted: fakevCard });

    } catch (e) {
        console.error("SET_PREFIX_ERROR:", e);
        reply("*❗ sʏsᴛᴇᴍ ᴇʀʀᴏʀ: ᴜɴᴀʙʟᴇ ᴛᴏ ᴍᴏᴅɪғʏ ᴘʀᴇғɪx*");
    }
});
