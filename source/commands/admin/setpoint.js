const { MessageAttachment, MessageEmbed, MessageButton, MessageActionRow , Permissions } = require("discord.js");
var connection = require("../../events/db_connection");
module.exports = {
    name: "setpoint",

    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async (client, message, args) => {
        const member =  message.mentions.members.first()
        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;
        await message.react('✅')
        if(!member) return message.reply('โปรดเลือกผู้ใช้หรือไอดีผู้ใช้ที่ต้องการค่ะ')
        if(!args[1]) return message.reply('กรุณาระบุจำนวน point ที่ต้องการเซ็ทค่ะ')
        if(isNaN(args[1])) return message.reply('กรุณาระบุจำนวน point เป็นตัวเลขเท่านั้นค่ะ')
        if(args[1] < 0) return message.reply('ไม่สามารถระบุ point ติดลบได้ค่ะ')
        let oldpoint = `SELECT * FROM pointdb WHERE userid = '${member.id}'`
        await connection.query(oldpoint, async function (err,result, fields){
            if(!result[0]) return message.channel.send(`${member} ไม่มีบัญชี Point`)
        var item = parseInt(args[1]);
        let update = `UPDATE pointdb SET point=${item} WHERE userid = ${member.id}`
        await connection.query(update)
        connection.query(oldpoint, async function(err, result, fields){
            message.channel.send({content: `ทำการเซ็ตพ้อยในบัญชีของ ${member} เป็น ${item} Point เรียบร้อยแล้วค่ะ`})
        })

        })
    }
}