const { SlashCommandBuilder } = require('discord.js');
const QRCode = require('qrcode');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tools-qrcode')
        .setDescription('Send a QR code photo of text you have given')
        .addStringOption(option => option.setName('text').setDescription('The text to convert to QR code').setRequired(true)),
    async execute(interaction) {
        const text = interaction.options.getString('text');
        const qrCode = await QRCode.toDataURL(text);

        const embed = {
            color: 0x0000ff,
            title: 'QR Code',
            image: { url: qrCode },
        };

        interaction.reply({ embeds: [embed] });
    },
};
