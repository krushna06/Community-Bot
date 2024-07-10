const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search-youtube')
        .setDescription('Find something on YouTube')
        .addStringOption(option => option.setName('query').setDescription('The search query').setRequired(true)),
    async execute(interaction) {
        const query = interaction.options.getString('query');
        try {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=YOUR_YOUTUBE_API_KEY`);
            const result = response.data.items[0];

            const embed = {
                title: result.snippet.title,
                url: `https://www.youtube.com/watch?v=${result.id.videoId}`,
                description: result.snippet.description,
                timestamp: new Date(),
                footer: {
                    text: 'YouTube Search Result',
                },
            };

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            await interaction.reply({ content: 'Error fetching search results. Please try again.', ephemeral: true });
        }
    },
};
