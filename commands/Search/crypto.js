const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search-crypto')
        .setDescription('See the value of the crypto coin')
        .addStringOption(option => option.setName('coin').setDescription('The crypto coin symbol (e.g., BTC, ETH)').setRequired(true)),
    async execute(interaction) {
        const coin = interaction.options.getString('coin');
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(coin)}&vs_currencies=usd`);
            const price = response.data[coin].usd;

            await interaction.reply(`The current price of ${coin.toUpperCase()} is $${price}`);
        } catch (error) {
            await interaction.reply({ content: 'Error fetching crypto price. Please ensure the coin symbol is correct and try again.', ephemeral: true });
        }
    },
};
