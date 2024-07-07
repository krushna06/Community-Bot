const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('List all available commands'),
    async execute(interaction) {
        const commandFolders = fs.readdirSync('./commands');
        let helpMessage = 'Here are the available commands:\n';

        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
            helpMessage += `\n**${folder}**\n`;
            for (const file of commandFiles) {
                const command = require(`../${folder}/${file}`);
                helpMessage += `\`${command.data.name}\`: ${command.data.description}\n`;
            }
        }

        await interaction.reply(helpMessage);
    },
};
