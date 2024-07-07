const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays the help menu with all available commands'),
    async execute(interaction) {
        const commandFolders = fs.readdirSync('./commands');
        let categories = [];

        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
            const commands = commandFiles.map(file => {
                const command = require(`../${folder}/${file}`);
                return { name: command.data.name, description: command.data.description };
            });
            categories.push({ name: folder, commands });
        }

        const totalCommands = categories.reduce((acc, category) => acc + category.commands.length, 0);
        const totalCategories = categories.length;
        const totalPages = totalCategories + 1;
        let currentPage = 0;

        const generateEmbed = (page) => {
            const embed = new EmbedBuilder();

            if (page === 0) {
                embed.setTitle('Help Menu')
                    .setDescription(`Total Commands: ${totalCommands}`)
                    .setFooter({ text: `Page 1 of ${totalPages}` });
            } else {
                const category = categories[page - 1];
                embed.setTitle(`Help Menu - ${category.name}`)
                    .setDescription(`Commands in ${category.name}`)
                    .setFooter({ text: `Page ${page + 1} of ${totalPages}` });

                for (const command of category.commands) {
                    embed.addFields({ name: `/${command.name}`, value: command.description });
                }
            }

            return embed;
        };

        const generateActionRow = () => {
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('previous')
                        .setLabel('Previous')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(currentPage === 0),
                    new ButtonBuilder()
                        .setCustomId('home')
                        .setLabel('Home')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId('next')
                        .setLabel('Next')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(currentPage === totalPages - 1)
                );

            return row;
        };

        await interaction.reply({ embeds: [generateEmbed(currentPage)], components: [generateActionRow()] });

        const filter = i => i.customId === 'previous' || i.customId === 'home' || i.customId === 'next';
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            if (i.customId === 'previous') {
                currentPage--;
            } else if (i.customId === 'next') {
                currentPage++;
            } else if (i.customId === 'home') {
                currentPage = 0;
            }

            await i.update({ embeds: [generateEmbed(currentPage)], components: [generateActionRow()] });
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                interaction.editReply({ components: [] });
            }
        });
    },
};
