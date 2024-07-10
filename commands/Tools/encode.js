const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tools-encode')
        .setDescription('Encode text to binary code')
        .addStringOption(option => option.setName('text').setDescription('The text to encode').setRequired(true)),
    async execute(interaction) {
        const text = interaction.options.getString('text');
        const binary = text.split('').map(char => char.charCodeAt(0).toString(2)).join(' ');
        interaction.reply(`The binary code is: ${binary}`);
    },
};
