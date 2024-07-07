const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removerole')
        .setDescription('Removes roles from a user')
        .addUserOption(option => option.setName('user').setDescription('The user to remove roles from').setRequired(true))
        .addRoleOption(option => option.setName('role1').setDescription('The first role to remove').setRequired(true))
        .addRoleOption(option => option.setName('role2').setDescription('The second role to remove').setRequired(false))
        .addRoleOption(option => option.setName('role3').setDescription('The third role to remove').setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id);
        const roles = ['role1', 'role2', 'role3'].map(roleOption => interaction.options.getRole(roleOption)).filter(role => role);

        for (const role of roles) {
            await member.roles.remove(role);
        }
        
        await interaction.reply(`Removed roles from ${user.tag}`);
    },
};
