const client = require("../index");

client.on('ready', () =>{
    console.log(`${client.user.tag}`)
  client.user.setPresence({ activities: [{ name: 'Point',
type: 'WATCHING'}] });
});