const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Displays information about a user')
        .addUserOption(option => option.setName('target').setDescription('The user to show information for')),
    async execute(interaction) {
        const user = interaction.options.getUser('target') || interaction.user;
        const member = interaction.guild.members.cache.get(user.id);

        const embed = new EmbedBuilder()
            .setTitle(`${user.username}'s Information`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Username', value: `${user.tag}`, inline: true },
                { name: 'Server Join Date', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`, inline: true },
                { name: 'Discord Join Date', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: true }
            );

        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('home')
                    .setLabel('Home')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('show_roles')
                    .setLabel('Show Roles')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('show_permissions')
                    .setLabel('Show Permissions')
                    .setStyle(ButtonStyle.Secondary)
            );

        await interaction.reply({ embeds: [embed], components: [buttons] });

        const filter = i => ['home', 'show_roles', 'show_permissions'].includes(i.customId) && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            if (i.customId === 'show_roles') {
                const roles = member.roles.cache
                    .filter(role => role.id !== interaction.guild.id)
                    .map(role => role.toString())
                    .join(', ') || 'None';

                const rolesEmbed = new EmbedBuilder()
                    .setTitle(`${user.username}'s Roles`)
                    .setDescription(roles);

                await i.update({ embeds: [rolesEmbed], components: [buttons] });
            } else if (i.customId === 'show_permissions') {
                const permissions = member.permissions.toArray().join(', ') || 'None';

                const permissionsEmbed = new EmbedBuilder()
                    .setTitle(`${user.username}'s Permissions`)
                    .setDescription(permissions);

                await i.update({ embeds: [permissionsEmbed], components: [buttons] });
            } else if (i.customId === 'home') {
                await i.update({ embeds: [embed], components: [buttons] });
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                interaction.editReply({ components: [] });
            }
        });
    },
};
