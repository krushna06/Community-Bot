const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addrole')
        .setDescription('Adds roles to a user')
        .addUserOption(option => option.setName('user').setDescription('The user to add roles to').setRequired(true))
        .addRoleOption(option => option.setName('role1').setDescription('The first role to add').setRequired(true))
        .addRoleOption(option => option.setName('role2').setDescription('The second role to add').setRequired(false))
        .addRoleOption(option => option.setName('role3').setDescription('The third role to add').setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id);
        const roles = ['role1', 'role2', 'role3'].map(roleOption => interaction.options.getRole(roleOption)).filter(role => role);

        for (const role of roles) {
            await member.roles.add(role);
        }

        await interaction.reply({
            content: `Added roles to ${user.tag}`,
            ephemeral: true,
        });
    },
};
