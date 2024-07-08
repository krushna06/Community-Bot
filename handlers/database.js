const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '../database/afkUsers.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS afk_users (id TEXT PRIMARY KEY, message TEXT, timestamp INTEGER)");
});

module.exports = db;
