const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Deletes a specified number of messages from the channel')
        .addIntegerOption(option => option.setName('amount').setDescription('The number of messages to delete').setRequired(true))
        .addUserOption(option => option.setName('user').setDescription('The user whose messages to delete')),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');
        const user = interaction.options.getUser('user');

        if (amount < 1 || amount > 100) {
            return interaction.reply({ content: 'You need to input a number between 1 and 100.', ephemeral: true });
        }

        const messages = await interaction.channel.messages.fetch({ limit: 100 });
        const filteredMessages = user 
            ? messages.filter(msg => msg.author.id === user.id).first(amount) 
            : messages.first(amount);

        await interaction.channel.bulkDelete(filteredMessages, true);
        await interaction.reply({ content: `Deleted ${filteredMessages.length} messages${user ? ` from ${user.tag}` : ''}.`, ephemeral: true });
    },
};
