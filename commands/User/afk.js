const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const db = require('../../handlers/databaseHandler');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('afk')
        .setDescription('Set your AFK status')
        .addStringOption(option => option.setName('reason').setDescription('Reason for being AFK').setRequired(false)),
    async execute(interaction) {
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const userId = interaction.user.id;

        db.run('INSERT INTO afk_users (user_id, reason, timestamp) VALUES (?, ?, ?)', [userId, reason, Date.now()], (err) => {
            if (err) {
                if (err.code === 'SQLITE_CONSTRAINT') {
                    return interaction.reply({ content: 'You are already AFK.', ephemeral: true });
                }
                console.error('Could not set AFK status', err);
                return interaction.reply({ content: 'Failed to set AFK status.', ephemeral: true });
            }
            interaction.reply({ content: `You are now AFK: ${reason}`, ephemeral: true });
        });
    },
    async messageHandler(message) {
        const userId = message.author.id;

        db.get('SELECT * FROM afk_users WHERE user_id = ?', [userId], (err, row) => {
            if (err) {
                console.error('Could not fetch AFK status', err);
                return;
            }
            if (row) {
                db.run('DELETE FROM afk_users WHERE user_id = ?', [userId], (err) => {
                    if (err) {
                        console.error('Could not remove AFK status', err);
                        return;
                    }

                    db.all('SELECT * FROM afk_pings WHERE user_id = ?', [userId], (err, rows) => {
                        if (err) {
                            console.error('Could not fetch pings', err);
                            return;
                        }

                        let description = 'You got pinged:\n';
                        rows.forEach(row => {
                            description += `From ${row.pinger_tag}: [Link to message](${row.message_link})\n`;
                        });

                        const embed = new EmbedBuilder()
                            .setTitle('Welcome back!')
                            .setDescription(description || 'You have no new pings.');

                        message.channel.send({ embeds: [embed] });

                        db.run('DELETE FROM afk_pings WHERE user_id = ?', [userId], (err) => {
                            if (err) {
                                console.error('Could not clear pings', err);
                            }
                        });
                    });
                });
            }
        });
    },
    async pingHandler(message) {
        if (message.mentions.users.size > 0) {
            message.mentions.users.forEach(user => {
                db.get('SELECT * FROM afk_users WHERE user_id = ?', [user.id], (err, row) => {
                    if (err) {
                        console.error('Could not fetch AFK status', err);
                        return;
                    }
                    if (row) {
                        const afkTime = `<t:${Math.floor(row.timestamp / 1000)}:R>`;
                        const embed = new EmbedBuilder()
                            .setDescription(`${user.tag} is AFK: ${row.reason} (${afkTime})`);

                        message.channel.send({ embeds: [embed] });

                        db.run('INSERT INTO afk_pings (user_id, pinger_tag, message_link) VALUES (?, ?, ?)', [user.id, message.author.tag, message.url], (err) => {
                            if (err) {
                                console.error('Could not log AFK ping', err);
                            }
                        });
                    }
                });
            });
        }
    }
};
