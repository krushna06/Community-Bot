const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('github')
        .setDescription('Get info on a GitHub user')
        .addSubcommand(subcommand =>
            subcommand
                .setName('github')
                .setDescription('Get info on a GitHub user')
                .addStringOption(option => option.setName('username').setDescription('The GitHub username').setRequired(true))),
    async execute(interaction) {
        const username = interaction.options.getString('username');

        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            const { login, avatar_url, html_url, public_repos, followers, following, created_at, bio } = response.data;

            const embed = {
                title: login,
                url: html_url,
                author: {
                    name: 'GitHub',
                    icon_url: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
                    url: 'https://github.com',
                },
                description: bio || 'No bio available',
                thumbnail: {
                    url: avatar_url,
                },
                fields: [
                    { name: 'Public Repos', value: public_repos.toString(), inline: true },
                    { name: 'Followers', value: followers.toString(), inline: true },
                    { name: 'Following', value: following.toString(), inline: true },
                    { name: 'Account Created', value: new Date(created_at).toLocaleDateString(), inline: true },
                ],
                timestamp: new Date(),
                footer: {
                    text: 'GitHub User Info',
                    icon_url: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
                },
            };

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            await interaction.reply({ content: `Error fetching data for user **${username}**. Please ensure the username is correct and try again.`, ephemeral: true });
        }
    },
};
