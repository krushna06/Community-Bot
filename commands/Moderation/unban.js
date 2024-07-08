const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unbans a user from the server')
        .addUserOption(option => option.setName('user').setDescription('The user to unban').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');

        await interaction.guild.members.unban(user.id);
        await interaction.reply({ content: `Unbanned ${user.tag}`, ephemeral: true });
    },
};