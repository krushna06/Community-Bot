const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deleterole')
        .setDescription('Deletes roles from the server')
        .addRoleOption(option => option.setName('role1').setDescription('The first role to delete').setRequired(true))
        .addRoleOption(option => option.setName('role2').setDescription('The second role to delete').setRequired(false))
        .addRoleOption(option => option.setName('role3').setDescription('The third role to delete').setRequired(false)),
    async execute(interaction) {
        const roles = ['role1', 'role2', 'role3'].map(roleOption => interaction.options.getRole(roleOption)).filter(role => role);

        for (const role of roles) {
            await role.delete();
        }
        
        await interaction.reply(`Deleted selected roles.`);
    },
};
