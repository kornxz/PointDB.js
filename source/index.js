const { Client, Collection } = require("discord.js");
const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();
client.COOLDOWN_SECONDS = 10;
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);
client.login(client.config.token);
