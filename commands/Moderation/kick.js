const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user from the server')
        .addUserOption(option => option.setName('target').setDescription('The user to kick').setRequired(true)),
    async execute(interaction) {
        const member = interaction.options.getMember('target');
        if (!member) return interaction.reply('That user is not in the server!');
        if (!member.kickable) return interaction.reply('I cannot kick this user!');

        await member.kick();
        await interaction.reply(`${member.user.tag} has been kicked!`);
    },
};
