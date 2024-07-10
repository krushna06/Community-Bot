const { SlashCommandBuilder } = require('discord.js');
const db = require('../../handlers/databaseHandler');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unwarn')
        .setDescription('Removes a warning from a user')
        .addIntegerOption(option => option.setName('id').setDescription('The ID of the warning to remove').setRequired(true)),
    async execute(interaction) {
        const warningId = interaction.options.getInteger('id');

        db.run('DELETE FROM warnings WHERE id = ?', [warningId], function(err) {
            if (err) {
                console.error('Could not remove warning', err);
                return interaction.reply({ content: 'Failed to remove warning', ephemeral: true });
            }

            if (this.changes === 0) {
                return interaction.reply({ content: 'Warning ID not found', ephemeral: true });
            }

            interaction.reply({ content: `Removed warning ID: ${warningId}`, ephemeral: true });
        });
    },
};
