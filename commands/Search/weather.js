const { SlashCommandBuilder } = require('discord.js');
const weather = require('weather-js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('See the current weather')
        .addStringOption(option => option.setName('location').setDescription('The location to get the weather for').setRequired(true)),
    async execute(interaction) {
        const location = interaction.options.getString('location');

        weather.find({ search: location, degreeType: 'C' }, function (error, result) {
            if (result === undefined || result.length === 0) {
                return interaction.reply({ content: "**Invalid** location", ephemeral: true });
            }

            var current = result[0].current;
            var locationData = result[0].location;

            const embed = {
                title: `☀️・Weather - ${current.skytext}`,
                description: `Weather forecast for ${current.observationpoint}`,
                thumbnail: {
                    url: current.imageUrl,
                },
                fields: [
                    {
                        name: "Timezone",
                        value: `UTC${locationData.timezone}`,
                        inline: true,
                    },
                    {
                        name: "Degree Type",
                        value: `Celsius`,
                        inline: true,
                    },
                    {
                        name: "Temperature",
                        value: `${current.temperature}°`,
                        inline: true,
                    },
                    {
                        name: "Wind",
                        value: `${current.winddisplay}`,
                        inline: true,
                    },
                    {
                        name: "Feels like",
                        value: `${current.feelslike}°`,
                        inline: true,
                    },
                    {
                        name: "Humidity",
                        value: `${current.humidity}%`,
                        inline: true,
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: 'Weather Info',
                },
            };

            interaction.reply({ embeds: [embed] });
        });
    },
};
