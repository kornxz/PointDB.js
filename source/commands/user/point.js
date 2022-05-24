const { MessageAttachment, MessageEmbed, MessageButton, MessageActionRow , Permissions } = require("discord.js");
var connection = require("../../events/db_connection");
module.exports = {
    name: "point",

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
            .setDescription(`คุณมีพ้อยคงเหลือในบัญชีจำนวน **${result[0].point}** Point`)
            .setColor('GREEN')
            message.reply({embeds: [embed],ephemeral: true})
        })
    }
}