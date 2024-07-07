const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Times out a user for a specified duration')
        .addUserOption(option => option.setName('user').setDescription('The user to timeout').setRequired(true))
        .addIntegerOption(option => option.setName('duration').setDescription('The duration of the timeout in minutes').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the timeout')),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const duration = interaction.options.getInteger('duration');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const member = interaction.guild.members.cache.get(user.id);

        await member.timeout(duration * 60 * 1000, reason);
        await interaction.reply(`Timed out ${user.tag} for ${duration} minutes. Reason: ${reason}`);
    },
};
