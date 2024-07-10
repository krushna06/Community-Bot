const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search-ddg')
        .setDescription('Find something on DuckDuckGo')
        .addStringOption(option => option.setName('query').setDescription('The search query').setRequired(true)),
    async execute(interaction) {
        const query = interaction.options.getString('query');
        try {
            const response = await axios.get(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`);
            const result = response.data.RelatedTopics[0].Text;

            await interaction.reply({ content: `DuckDuckGo search result: ${result}` });
        } catch (error) {
            await interaction.reply({ content: 'Error fetching search results. Please try again.', ephemeral: true });
        }
    },
};
