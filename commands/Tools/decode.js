const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tools-decode')
        .setDescription('Decode binary code to text')
        .addStringOption(option => option.setName('binary').setDescription('The binary code to decode').setRequired(true)),
    async execute(interaction) {
        const binary = interaction.options.getString('binary');
        const text = binary.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
        interaction.reply(`The decoded text is: ${text}`);
    },
};
