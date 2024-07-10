const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search-itunes')
        .setDescription('Search on iTunes for any song')
        .addStringOption(option => option.setName('query').setDescription('The song or artist to search for').setRequired(true)),
    async execute(interaction) {
        const query = interaction.options.getString('query');
        try {
            const response = await axios.get(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&limit=1`);
            const result = response.data.results[0];

            const embed = {
                title: result.trackName,
                url: result.trackViewUrl,
                description: `Artist: ${result.artistName}\nAlbum: ${result.collectionName}`,
                thumbnail: {
                    url: result.artworkUrl100,
                },
                timestamp: new Date(),
                footer: {
                    text: 'iTunes Search Result',
                },
            };

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            await interaction.reply({ content: 'Error fetching iTunes search results. Please try again.', ephemeral: true });
        }
    },
};
