const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('membercount')
        .setDescription('Shows the member count of the server'),
    async execute(interaction) {
        const memberCount = interaction.guild.memberCount;
        await interaction.reply(`This server has ${memberCount} members.`);
    },
};
