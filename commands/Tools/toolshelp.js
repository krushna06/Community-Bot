const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tools-help')
        .setDescription('Get information about the tools category commands'),
    async execute(interaction) {
        const embed = {
            color: 0x0099ff,
            title: 'Tools Commands Help',
            description: 'List of available commands in the tools category:',
            fields: [
                { name: '/tools-anagram', value: 'Form a word with certain letters' },
                { name: '/tools-button', value: 'Create a button' },
                { name: '/tools-decode', value: 'Decode binary code to text' },
                { name: '/tools-emojify', value: 'Convert text to emojis' },
                { name: '/tools-encode', value: 'Encode text to binary code' },
                { name: '/tools-enlarge', value: 'Enlarge an emoji' },
                { name: '/tools-mcskin', value: 'See the skin of a Minecraft user' },
                { name: '/tools-mcstatus', value: 'See the status of a Minecraft server' },
                { name: '/tools-pwdgen', value: 'Generate a password' },
                { name: '/tools-qrcode', value: 'Send a QR code photo of text you have given' },
                { name: '/tools-remind', value: 'Set a reminder' },
                { name: '/tools-sourcebin', value: 'Upload code to Sourcebin' },
                { name: '/tools-url', value: 'Make a shortened URL' },
                { name: '/tools-review', value: 'Write a review' },
            ],
            timestamp: new Date(),
            footer: {
                text: 'Tools Commands',
            },
        };

        interaction.reply({ embeds: [embed] });
    },
};
