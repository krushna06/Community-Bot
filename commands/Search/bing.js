const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search-bing')
        .setDescription('Find something on Bing')
        .addStringOption(option => option.setName('query').setDescription('The search query').setRequired(true)),
    async execute(interaction) {
        const query = interaction.options.getString('query');
        try {
            const response = await axios.get(`https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(query)}`, {
                headers: { 'Ocp-Apim-Subscription-Key': 'YOUR_BING_API_KEY' }
            });
            const result = response.data.webPages.value[0];

            const embed = {
                title: result.name,
                url: result.url,
                description: result.snippet,
                timestamp: new Date(),
                footer: {
                    text: 'Bing Search Result',
                },
            };

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            await interaction.reply({ content: 'Error fetching search results. Please try again.', ephemeral: true });
        }
    },
};
