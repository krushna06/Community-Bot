const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search-translate')
        .setDescription('Translate some text')
        .addStringOption(option => option.setName('text').setDescription('The text to translate').setRequired(true))
        .addStringOption(option => option.setName('target').setDescription('The target language (e.g., en, es, fr)').setRequired(true)),
    async execute(interaction) {
        const text = interaction.options.getString('text');
        const target = interaction.options.getString('target');
        try {
            const response = await axios.post(`https://translation.googleapis.com/language/translate/v2`, null, {
                params: {
                    q: text,
                    target: target,
                    key: 'YOUR_GOOGLE_TRANSLATE_API_KEY'
                }
            });
            const translation = response.data.data.translations[0].translatedText;

            await interaction.reply(`Translation: ${translation}`);
        } catch (error) {
            await interaction.reply({ content: 'Error translating text. Please ensure the text and target language are correct and try again.', ephemeral: true });
        }
    },
};
