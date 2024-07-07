const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deleterole')
        .setDescription('Deletes a role')
        .addRoleOption(option => option.setName('role').setDescription('The role to delete').setRequired(true)),
    async execute(interaction) {
        const role = interaction.options.getRole('role');
        await role.delete();
        await interaction.reply(`Deleted role ${role.name}`);
    },
};
