const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tools-mcskin')
        .setDescription('See the skin of a Minecraft user')
        .addStringOption(option => option.setName('username').setDescription('The Minecraft username').setRequired(true)),
    async execute(interaction) {
        const username = interaction.options.getString('username');
        const skinURL = `https://minotar.net/skin/${username}`;
        const embed = {
            color: 0x00ff00,
            title: `${username}'s Minecraft Skin`,
            image: { url: skinURL },
        };
        interaction.reply({ embeds: [embed] });
    },
};
