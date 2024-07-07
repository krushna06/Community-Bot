const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addrole')
        .setDescription('Adds a role to a user')
        .addUserOption(option => option.setName('user').setDescription('The user to add the role to').setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('The role to add').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const role = interaction.options.getRole('role');
        const member = interaction.guild.members.cache.get(user.id);

        await member.roles.add(role);
        await interaction.reply(`Added role ${role.name} to ${user.tag}`);
    },
};
