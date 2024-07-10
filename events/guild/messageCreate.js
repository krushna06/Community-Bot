const { MessageEmbed } = require('discord.js');
const db = require('../../handlers/databaseHandler');
const afkCommand = require('../../commands/User/afk');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return;

        await afkCommand.messageHandler(message);

        await afkCommand.pingHandler(message);
    },
};
