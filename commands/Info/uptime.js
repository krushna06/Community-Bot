const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Shows the bot\'s uptime'),
    async execute(interaction) {
        const uptime = interaction.client.uptime;
        await interaction.reply(`I have been up for ${Math.floor(uptime / (1000 * 60 * 60))} hours, ${Math.floor((uptime / (1000 * 60)) % 60)} minutes and ${Math.floor((uptime / 1000) % 60)} seconds.`);
    },
};
