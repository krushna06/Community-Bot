const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search-npm')
        .setDescription('Get info on an NPM package')
        .addStringOption(option => option.setName('package').setDescription('The NPM package name').setRequired(true)),
    async execute(interaction) {
        const packageName = interaction.options.getString('package');
        try {
            const response = await axios.get(`https://registry.npmjs.org/${encodeURIComponent(packageName)}`);
            const { name, description, 'dist-tags': distTags, versions } = response.data;

            const embed = {
                title: name,
                description: description,
                fields: [
                    { name: 'Latest Version', value: distTags.latest, inline: true },
                    { name: 'Homepage', value: versions[distTags.latest].homepage || 'N/A', inline: true },
                ],
                timestamp: new Date(),
                footer: {
                    text: 'NPM Package Info',
                },
            };

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            await interaction.reply({ content: 'Error fetching NPM package info. Please ensure the package name is correct and try again.', ephemeral: true });
        }
    },
};
