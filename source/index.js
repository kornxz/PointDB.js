const { Client, Collection } = require("discord.js");
const keepAlive = require("./server");
const client = new Client({
    intents: 32767,
});
module.exports = client;
require('discord-modals')(client)
// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();
client.COOLDOWN_SECONDS = 10;
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);
keepAlive()
client.login(client.config.token);
