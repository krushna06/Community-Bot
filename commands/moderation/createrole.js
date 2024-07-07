const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createrole')
        .setDescription('Creates a new role')
        .addStringOption(option => option.setName('name').setDescription('The name of the role').setRequired(true)),
    async execute(interaction) {
        const roleName = interaction.options.getString('name');
        const role = await interaction.guild.roles.create({ name: roleName });
        await interaction.reply(`Created role ${role.name}`);
    },
};
