const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banlist')
        .setDescription('Lists all banned users in the server'),
    async execute(interaction) {
        const bans = await interaction.guild.bans.fetch();
        if (bans.size === 0) {
            return interaction.reply({ content: 'There are no banned users in this server.', ephemeral: true });
        }

        const bannedUsers = bans.map(ban => `${ban.user.tag} (ID: ${ban.user.id})`).join('\n');
        await interaction.reply({ content: `Banned users:\n${bannedUsers}`, ephemeral: true });
    },
};
