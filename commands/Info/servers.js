const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('servers')
        .setDescription('Displays the names and guild IDs of all servers the bot is in'),
    async execute(interaction) {
        const guilds = interaction.client.guilds.cache.map(guild => ({
            name: guild.name,
            id: guild.id
        }));

        const embed = new EmbedBuilder()
            .setTitle('Servers')
            .setDescription('List of servers the bot is in:');

        guilds.forEach(guild => {
            embed.addFields({ name: guild.name, value: `ID: ${guild.id}` });
        });

        await interaction.reply({ embeds: [embed] });
    },
};
