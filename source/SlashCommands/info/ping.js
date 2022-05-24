const { Client, CommandInteraction  } = require("discord.js");

module.exports = {
    name: "u",
    description: "returns websocket ping",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        await interaction.deferReply({ ephemeral: true })
        interaction.followUp({ content: `${client.ws.ping}ms!` });
    },
};
