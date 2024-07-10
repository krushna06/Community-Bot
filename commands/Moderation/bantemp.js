const { SlashCommandBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bantemp')
        .setDescription('Temporarily bans a user from the server')
        .addUserOption(option => option.setName('user').setDescription('The user to tempban').setRequired(true))
        .addStringOption(option => option.setName('duration').setDescription('The duration of the tempban (e.g., 1d, 2h, 30m)').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the tempban')),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const duration = interaction.options.getString('duration');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const member = interaction.guild.members.cache.get(user.id);

        const durationMs = ms(duration);
        if (!durationMs) {
            return interaction.reply({ content: 'Invalid duration format. Please use a format like 1d, 2h, 30m.', ephemeral: true });
        }

        await member.ban({ reason });
        await interaction.reply({ content: `Temporarily banned ${user.tag} for: ${reason}. Duration: ${duration}`, ephemeral: true });

        setTimeout(async () => {
            await interaction.guild.members.unban(user.id, 'Temporary ban expired');
        }, durationMs);
    },
};
