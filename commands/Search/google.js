const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('google')
        .setDescription('Search something on Google')
        .addStringOption(option => option.setName('query').setDescription('The search query').setRequired(true)),
    async execute(interaction) {
        let query = encodeURIComponent(interaction.options.getString('query'));
        let link = `https://www.google.com/search?q=${query}`;

        const embed = {
            title: 'Google Search Result',
            description: `I have found the following for: \`${interaction.options.getString('query')}\``,
            fields: [
                {
                    name: `🔗┇Link`,
                    value: `[Click here to see the link](${link})`,
                    inline: true,
                }
            ],
            timestamp: new Date(),
            footer: {
                text: 'Google Search',
            },
        };

        interaction.reply({ embeds: [embed] });
    },
};
