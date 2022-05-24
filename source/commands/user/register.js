const { MessageAttachment, MessageEmbed, MessageButton, MessageActionRow , Permissions } = require("discord.js");
var connection = require("../../events/db_connection");
module.exports = {
    name: "register",

    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async (client, message, args) => {
        await message.react('✅')
        var registerdb = `INSERT INTO pointdb(id,userid,users,point,account_opening_date) VALUES ('','${message.author.id}','${message.author.tag}','',NOW())`;
        let checkaccount = `SELECT * FROM pointdb WHERE userid = '${message.author.id}'`
        connection.query(checkaccount, async function (err, result, fields){
            if(result[0]) return message.reply('คุณมีบัญชี point อยู่แล้ว ไม่สามารถเปิดบัญชีได้อีก')
            await connection.query(registerdb)
            message.reply({content: `${message.author} ทำการเปิดบัญชีของคุณสำเร็จ` ,ephemeral: true})
        })
    }
}