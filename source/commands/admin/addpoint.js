const { MessageAttachment, MessageEmbed, MessageButton, MessageActionRow , Permissions, Guild } = require("discord.js");
var connection = require("../../events/db_connection");
module.exports = {
    name: "addpoint",

    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async (client, message, args) => {
        let member = message.mentions.members.first()
        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;
        await message.react('✅')
        if(!member) return message.reply('โปรดเลือกผู้ใช้หรือไอดีผู้ใช้ที่ต้องการ')
        if(!args[1]) return message.reply('กรุณาระบุจำนวน point ที่ต้องการเพิ่ม')
        if(isNaN(args[1])) return message.reply('กรุณาระบุจำนวน point เป็นตัวเลขเท่านั้นค่ะ')
        if(args[1] == 0) return message.reply('โปรดระบุจำนวนพ้อยมากกว่า 0 ขึ้นไปค่ะ')
        let oldpoint = `SELECT * FROM pointdb WHERE userid = '${member.id}'`
        await connection.query(oldpoint, async function (err,result, fields){
            if(!result[0]) return message.channel.send(`ผู้ใช้ ${member} ยังไม่มีบัญชี Point`)
        var item = parseInt(args[1]);
        let cal =  result[0].point+item
        let update = `UPDATE pointdb SET point=${cal} WHERE userid = ${member.id}`
        await connection.query(update)
        const embed = new MessageEmbed()
        .setDescription(`<a:HEARTFELT_037:897836773617569822>  ทำการเพิ่มพ้อยให้กับ ${member} จำนวน ${args[1]} Point เรียบร้อยแล้วค่ะ`)
        .setColor('BLURPLE')
        message.channel.send({embeds: [embed]})
        })
    }
}