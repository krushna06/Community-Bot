const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Provides the bot\'s invite link'),
    async execute(interaction) {
        const inviteLink = 'https://discord.com/oauth2/authorize?client_id=1047853733431738418&permissions=8&scope=bot%20applications.commands';

        const embed = new EmbedBuilder()
            .setTitle('Invite Me!')
            .setDescription(`[Click here to invite the bot to your server](${inviteLink})`);

        await interaction.reply({ embeds: [embed] });
    },
};
