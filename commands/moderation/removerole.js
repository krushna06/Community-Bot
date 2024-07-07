const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removerole')
        .setDescription('Removes a role from a user')
        .addUserOption(option => option.setName('user').setDescription('The user to remove the role from').setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('The role to remove').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const role = interaction.options.getRole('role');
        const member = interaction.guild.members.cache.get(user.id);

        await member.roles.remove(role);
        await interaction.reply(`Removed role ${role.name} from ${user.tag}`);
    },
};
