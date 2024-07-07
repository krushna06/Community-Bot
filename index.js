const { Client, Collection, GatewayIntentBits, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const express = require('express');
const { token, clientId } = require('./config/config.json');
const logger = require('./utils/logger');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Load events
const loadEvents = (dir) => {
    const eventFiles = fs.readdirSync(path.join(__dirname, dir)).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(path.join(__dirname, dir, file));
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
};

loadEvents('./events/client');
loadEvents('./events/guild');

// Load commands
client.commands = new Collection();
const commands = [];
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
    }
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        logger.info('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        logger.info('Successfully reloaded application (/) commands.');
    } catch (error) {
        logger.error(error);
    }
})();

client.login(token).then(() => {
    logger.info(`Logged in as ${client.user.tag}`);
});

// Set up the Express server
const app = express();
const port = 3000;

// Use the stats route
const statsRoute = require('./api/v1/stats');
app.use('/api/v1', statsRoute);

app.listen(port, () => {
    logger.info(`API server running on http://localhost:${port}`);
});
