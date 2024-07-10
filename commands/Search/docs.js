const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search-docs')
        .setDescription('See the discord.js docs')
        .addStringOption(option => option.setName('query').setDescription('The query to search in the docs').setRequired(true)),
    async execute(interaction) {
        const query = interaction.options.getString('query');
        try {
            const response = await axios.get(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(query)}`);
            const { title, url, description, fields } = response.data;

            const embed = {
                title: title,
                url: url,
                description: description,
                fields: fields,
                timestamp: new Date(),
                footer: {
                    text: 'discord.js Docs',
                },
            };

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            await interaction.reply({ content: 'Error fetching docs. Please try again.', ephemeral: true });
        }
    },
};
