const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search-corona')
        .setDescription('See the corona stats')
        .addStringOption(option => option.setName('country').setDescription('The country to get stats for').setRequired(true)),
    async execute(interaction) {
        const country = interaction.options.getString('country');
        try {
            const response = await axios.get(`https://disease.sh/v3/covid-19/countries/${encodeURIComponent(country)}`);
            const { country: countryName, cases, deaths, recovered } = response.data;

            const embed = {
                title: `COVID-19 Stats for ${countryName}`,
                fields: [
                    { name: 'Cases', value: cases.toString(), inline: true },
                    { name: 'Deaths', value: deaths.toString(), inline: true },
                    { name: 'Recovered', value: recovered.toString(), inline: true },
                ],
                timestamp: new Date(),
                footer: {
                    text: 'COVID-19 Stats',
                },
            };

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            await interaction.reply({ content: 'Error fetching COVID-19 stats. Please ensure the country name is correct and try again.', ephemeral: true });
        }
    },
};
