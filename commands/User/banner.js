const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banner')
        .setDescription('Get the banner URL of a user')
        .addUserOption(option => option.setName('target').setDescription('The user\'s banner to show')),
    async execute(interaction) {
        const user = interaction.options.getUser('target') || interaction.user;
        const userFetch = await interaction.client.users.fetch(user.id, { force: true });

        if (userFetch.banner) {
            const embed = new EmbedBuilder()
                .setTitle(`${user.username}'s Banner`)
                .setImage(userFetch.bannerURL({ dynamic: true }));

            await interaction.reply({ embeds: [embed] });
        } else {
            await interaction.reply(`${user.username} does not have a banner.`);
        }
    },
};
