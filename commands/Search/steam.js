const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search-steam')
        .setDescription('Get info on an application on Steam')
        .addStringOption(option => option.setName('appid').setDescription('The Steam app ID').setRequired(true)),
    async execute(interaction) {
        const appId = interaction.options.getString('appid');
        try {
            const response = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${appId}`);
            const { name, developers, publishers, short_description, header_image, website } = response.data[appId].data;

            const embed = {
                title: name,
                url: website || `https://store.steampowered.com/app/${appId}`,
                description: short_description,
                thumbnail: {
                    url: header_image,
                },
                fields: [
                    { name: 'Developers', value: developers.join(', '), inline: true },
                    { name: 'Publishers', value: publishers.join(', '), inline: true },
                ],
                timestamp: new Date(),
                footer: {
                    text: 'Steam App Info',
                },
            };

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            await interaction.reply({ content: `Error fetching data for app ID **${appId}**. Please ensure the app ID is correct and try again.`, ephemeral: true });
        }
    },
};
