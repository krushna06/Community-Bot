const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search-hexcolour')
        .setDescription('Get info from a color')
        .addStringOption(option => option.setName('color').setDescription('The hex color code (e.g., #FFFFFF)').setRequired(true)),
    async execute(interaction) {
        const color = interaction.options.getString('color');
        try {
            const response = await axios.get(`https://www.thecolorapi.com/id?hex=${color.replace('#', '')}`);
            const { name, hex, rgb, cmyk, image } = response.data;

            const embed = {
                color: parseInt(hex.value.replace('#', ''), 16),
                title: name.value,
                description: `HEX: ${hex.value}\nRGB: ${rgb.value}\nCMYK: ${cmyk.value}`,
                thumbnail: {
                    url: image.bare,
                },
                timestamp: new Date(),
                footer: {
                    text: 'Color Info',
                },
            };

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            await interaction.reply({ content: 'Error fetching color info. Please ensure the color code is correct and try again.', ephemeral: true });
        }
    },
};
