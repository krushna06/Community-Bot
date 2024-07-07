const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('untimeout')
        .setDescription('Removes timeout from a user')
        .addUserOption(option => option.setName('user').setDescription('The user to remove timeout from').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id);

        await member.timeout(null);
        await interaction.reply(`Removed timeout from ${user.tag}`);
    },
};
