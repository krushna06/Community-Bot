const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('Sets slowmode for the channel')
        .addIntegerOption(option => option.setName('seconds').setDescription('The number of seconds for slowmode').setRequired(true)),
    async execute(interaction) {
        const seconds = interaction.options.getInteger('seconds');
        await interaction.channel.setRateLimitPerUser(seconds);
        await interaction.reply({ content: `Set slowmode to ${seconds} seconds.`, ephemeral: true });
    },
};