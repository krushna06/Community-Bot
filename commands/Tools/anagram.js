const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tools-anagram')
        .setDescription('Form a word with certain letters')
        .addStringOption(option => option.setName('letters').setDescription('The letters to form a word').setRequired(true)),
    async execute(interaction) {
        const letters = interaction.options.getString('letters');
        const anagram = letters.split('').sort(() => Math.random() - 0.5).join('');
        interaction.reply(`An anagram for ${letters} is ${anagram}`);
    },
};
