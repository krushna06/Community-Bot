const { SlashCommandBuilder } = require('discord.js');
const db = require('../../handlers/databaseHandler');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warnlist')
        .setDescription('Lists warnings for a user')
        .addUserOption(option => option.setName('user').setDescription('The user to list warnings for').setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');

        db.all('SELECT id, reason, timestamp FROM warnings WHERE user_id = ?', [user.id], (err, rows) => {
            if (err) {
                console.error('Could not retrieve warnings', err);
                return interaction.reply({ content: 'Failed to retrieve warnings', ephemeral: true });
            }

            if (rows.length === 0) {
                return interaction.reply({ content: `${user.tag} has no warnings.`, ephemeral: true });
            }

            const warnings = rows.map(row => `ID: ${row.id} - Reason: ${row.reason} - Date: ${row.timestamp}`).join('\n');
            interaction.reply({ content: `Warnings for ${user.tag}:\n${warnings}`, ephemeral: true });
        });
    },
};
