const { cmd } = require('../command');
const config = require('../config'); // Make sure you have NEWSLETTER_JID and OWNER_NAME

cmd({
    pattern: "tagall",
    alias: ["everyone", "all"],
    desc: "Mention all members with a stylish header and forwarded newsletter style",
    category: "group",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, args, q, reply, botFooter, sender }) => {
    try {
        if (!isGroup) return reply("❌ *Popkid, this command only works in groups!*");

        await conn.sendMessage(from, { react: { text: "📣", key: mek.key } });

        // Fetch group participants
        const groupMetadata = await conn.groupMetadata(from);
        const participants = groupMetadata.participants;

        // Build mentions and TagAll message
        let mentions = [];
        let tagMessage = `
╔═══════════════════╗
 ✨ *𒋲⍟ᬼ⃟M💀⃝⃪U⛓ST۞༒A༒ FF⛓⍟ᬼ⃟A𒋲⍟ᬼ⃟MD💀⃝⃪V2🕷️™ 𝐀𝐋𝐋* ✨
╚═══════════════════╝

📢 *𝐀𝐧𝐧𝐨𝐮𝐧𝐜𝐞𝐦𝐞𝐧𝐭:* _${q ? q : 'Hey everyone, pay attention to this group!'}_

👤 *𝐈𝐧𝐢𝐭𝐢𝐚𝐭𝐞𝐝 𝐛𝐲:* @${m.sender.split('@')[0]}
👥 *𝐓𝐨𝐭𝐚𝐥 𝐌𝐞𝐦𝐛𝐞𝐫𝐬:* ${participants.length}

┌───⊷ *𝐆𝐑𝐎𝐔𝐏 𝐌𝐄𝐌𝐁𝐄𝐑𝐒*
`;

        for (let participant of participants) {
            tagMessage += `│🔹 @${participant.id.split('@')[0]}\n`;
            mentions.push(participant.id);
        }

        tagMessage += `└──────────────⊷

> *𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐏𝐨𝐩𝐤𝐢𝐝🇰🇪*`;

        // Forwarded newsletter style context info
        const newsletterContextInfo = {
            mentionedJid: mentions.concat(sender),
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: config.NEWSLETTER_JID || '120363423997837331@newsletter',
                newsletterName: config.OWNER_NAME || 'POPKID',
                serverMessageId: 1 // optional: can be any number
            }
        };

        // Send TagAll message with newsletter style
        await conn.sendMessage(from, { 
            image: { url: 'https://files.catbox.moe/aapw1p.png' }, 
            caption: tagMessage, 
            mentions: mentions,
            footer: botFooter || ' 𒋲⍟ᬼ⃟M💀⃝⃪U⛓ST۞༒A༒ FF⛓⍟ᬼ⃟A𒋲ᴀɪ ᴋᴇɴʏᴀ 🌠',
            contextInfo: newsletterContextInfo
        }, { quoted: mek });

    } catch (err) {
        console.error("TAGALL ERROR:", err);
        reply("❌ *Failed to tag all members.*");
    }
});
