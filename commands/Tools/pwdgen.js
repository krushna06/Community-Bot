const { SlashCommandBuilder } = require('discord.js');
const generator = require('generate-password');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tools-pwdgen')
        .setDescription('Generate a password')
        .addIntegerOption(option => option.setName('length').setDescription('The length of the password').setRequired(true)),
    async execute(interaction) {
        const length = interaction.options.getInteger('length');
        const password = generator.generate({
            length: length,
            numbers: true
        });
        interaction.reply(`Generated password: ${password}`);
    },
};
