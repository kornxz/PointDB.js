const { MessageAttachment, MessageEmbed, MessageButton, MessageActionRow , Permissions } = require("discord.js");
var connection = require("../../events/db_connection");
module.exports = {
    name: "droppoint",

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
        if(!args[1]) return message.reply('กรุณาระบุจำนวน point ที่ต้องการลดค่ะ')
        if(isNaN(args[1])) return message.reply('กรุณาระบุจำนวน point เป็นตัวเลขเท่านั้นค่ะ')
        if(args[1] == 0) return message.reply('โปรดระบุจำนวนพ้อยมากกว่า 0 ขึ้นไปค่ะ')
        let oldpoint = `SELECT * FROM pointdb WHERE userid = '${member.id}'`
        await connection.query(oldpoint, async function (err,result, fields){
            if(!result[0]) return message.channel.send(`${member} ไม่มีบัญชี Point`)
            if(args[1] > result[0].point) return message.channel.send(`ไม่สามารถหักพ้อยจำนวน ${args[1]} point ในบัญชีของ ${member} ได้ เนื่องจากมีพ้อยเหลือในบัญชี ${result[0].point} point ค่ะ`)
        var item = parseInt(args[1]);
        let cal =  result[0].point-item
        let update = `UPDATE pointdb SET point=${cal} WHERE userid = ${member.id}`
        await connection.query(update)
        connection.query(oldpoint, async function(err, result, fields){
            message.channel.send({content: `ทำการลดพ้อย ${member} จำนวน ${args[1]} Point และผู้ใช้คงเหลือพ้อย ${result[0].point} point`})
        })

        })
    }
}