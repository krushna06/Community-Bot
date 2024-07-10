const { SlashCommandBuilder } = require('discord.js');
const db = require('../../handlers/databaseHandler');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warns a user in the server')
        .addUserOption(option => option.setName('user').setDescription('The user to warn').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the warning')),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const member = interaction.guild.members.cache.get(user.id);

        // Insert the warning into the database
        db.run('INSERT INTO warnings (user_id, reason) VALUES (?, ?)', [user.id, reason], (err) => {
            if (err) {
                console.error('Could not log warning', err);
                return interaction.reply({ content: `Failed to warn ${user.tag}`, ephemeral: true });
            }

            interaction.reply({ content: `Warned ${user.tag} for: ${reason}`, ephemeral: true });
        });
    },
};
