const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const logger = require('../utils/logger');

// Create a new database connection
const dbPath = path.resolve(__dirname, '../database/database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        logger.error('Could not connect to database', err);
    } else {
        logger.info('Connected to SQLite database');
    }
});

// Create the warnings table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS warnings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        reason TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`, (err) => {
    if (err) {
        logger.error('Could not create warnings table', err);
    }
});

// Create the afk_users table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS afk_users (
        user_id TEXT PRIMARY KEY,
        reason TEXT,
        timestamp INTEGER
    )
`, (err) => {
    if (err) {
        logger.error('Could not create afk_users table', err);
    }
});

// Create the afk_pings table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS afk_pings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        pinger_tag TEXT NOT NULL,
        message_link TEXT NOT NULL
    )
`, (err) => {
    if (err) {
        logger.error('Could not create afk_pings table', err);
    }
});

module.exports = db;
