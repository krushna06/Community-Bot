const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const db = require('../../handlers/database.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('afk')
        .setDescription('Sets your AFK message')
        .addStringOption(option => option.setName('message').setDescription('Your AFK message').setRequired(true)),
    async execute(interaction) {
        const afkMessage = interaction.options.getString('message');
        const userId = interaction.user.id;

        db.run("INSERT OR REPLACE INTO afk_users (id, message, timestamp) VALUES (?, ?, ?)", [userId, afkMessage, Date.now()], (err) => {
            if (err) {
                console.error(err);
                return interaction.reply({ content: 'There was an error setting your AFK message.', ephemeral: true });
            }

            const embed = new EmbedBuilder()
                .setTitle('AFK Status Set')
                .setDescription(`You are now AFK: ${afkMessage}`)
                .setTimestamp();

            interaction.reply({ embeds: [embed], ephemeral: true });
        });
    },
};
