const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tools-button')
        .setDescription('Create a button')
        .addStringOption(option => option.setName('label').setDescription('The button label').setRequired(true)),
    async execute(interaction) {
        const label = interaction.options.getString('label');
        const button = new ButtonBuilder()
            .setCustomId('primary')
            .setLabel(label)
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder().addComponents(button);

        await interaction.reply({ content: 'Here is your button:', components: [row] });
    },
};
