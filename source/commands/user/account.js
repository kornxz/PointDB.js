const { MessageAttachment, MessageEmbed, MessageButton, MessageActionRow , Permissions } = require("discord.js");
var connection = require("../../events/db_connection");
module.exports = {
    name: "account",

    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async (client, message, args) => {
        await message.react('✅')
        let checkaccount = `SELECT * FROM pointdb WHERE userid = '${message.author.id}'`
        connection.query(checkaccount, async function (err, result, fields){
            if(!result[0]) return message.reply('คุณยังไม่มีบัญชี point เปิดบัญชีโดยการพิมพ์คำสั่ง -register')
            const embed = new MessageEmbed()
            .setAuthor({name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
            .setTitle('ข้อมูลบัญชี Point ของท่าน')
            .setDescription(`\`\`\`css\n
บัญชีลำดับที่ : ${result[0].id}
เจ้าของบัญชี : ${result[0].users}
คงเหลือ Point : ${result[0].point} Point
ผู้ใช้ไอดี : ${result[0].userid}
วันที่เปิดบัญชี : ${result[0].account_opening_date}\`\`\``)
            .setColor('GREEN')
            message.reply({embeds: [embed],ephemeral: true})
        })
    }
}