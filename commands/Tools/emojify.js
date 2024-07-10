const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tools-emojify')
        .setDescription('Convert text to emojis')
        .addStringOption(option => option.setName('text').setDescription('The text to convert').setRequired(true)),
    async execute(interaction) {
        const text = interaction.options.getString('text');
        const emojified = text.split('').map(char => `:regional_indicator_${char.toLowerCase()}:`).join(' ');
        interaction.reply(emojified);
    },
};
