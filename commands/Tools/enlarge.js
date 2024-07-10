const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tools-enlarge')
        .setDescription('Enlarge an emoji')
        .addStringOption(option => option.setName('emoji').setDescription('The emoji to enlarge').setRequired(true)),
    async execute(interaction) {
        const emoji = interaction.options.getString('emoji');
        const emojiURL = `https://cdn.discordapp.com/emojis/${emoji.match(/\d+/)[0]}.png`;
        interaction.reply(emojiURL);
    },
};
