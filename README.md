# Discord Community Bot

## Table of Contents
- [What is this bot?](#what-is-this-bot)
- [Setup Instructions](#setup-instructions)
- [REST API Usage](#rest-api-usage)
  - [Base URL](#base-url)
  - [Endpoints](#endpoints)
    - [Get Command Details](#get-command-details)
    - [Example Request](#example-request)
    - [Example Response](#example-response)
    - [Example Using Postman](#example-using-postman)
- [Dashboard Setup Instructions](#dashboard-setup-instructions)
- [Contributing](#contributing)
- [Issues](#issues)
- [License](#license)

## What is this bot?
The Discord Community Bot is designed to make community management easier for server admins and mods, regardless of the size of the community.

## Setup Instructions
To set up the Discord Community Bot, follow these steps:

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/krushna06/Community-Bot
   ```
   
2. **Install Dependencies:**
   ```sh
   npm install
   ```

3. **Rename** `example.config.json` to `config.json` and fill it inside the `config` folder.

4. **Start the Bot:**
   ```sh
   node index.js
   ```

## REST API Usage
The REST API provides information about the commands available in the Discord bot. Here are the details on how to use the API.

### Base URL
```
http://localhost:3000/api/v1
```

### Endpoints
#### Get Command Details
- **URL**: `/commands`
- **Method**: `GET`
- **Description**: Retrieves a list of command categories and the commands within each category.

### Fetching API Data

```javascript
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.use(cors());

// Middleware to log requests
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

const getCommandDetails = (dir) => {
  const commandDetails = [];
  const commandFolders = fs.readdirSync(dir);

  for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(path.join(dir, folder)).filter(file => file.endsWith('.js'));
    const commands = commandFiles.map(file => path.basename(file, '.js'));

    if (commands.length > 0) {
      commandDetails.push({
        category: folder,
        commands: commands,
      });
    }
  }
  return commandDetails;
};

router.get('/commands', (req, res) => {
  const commandDetails = getCommandDetails(path.join(__dirname, '../../commands'));
  res.json({ commandDetails });
});

module.exports = router;
```

#### Example Request
To get the command details, you can use any HTTP client like `curl`, Postman, or simply open your browser and navigate to the following URL:
```
http://localhost:3000/api/v1/commands
```

#### Example Response
```json
{
  "commandDetails": [
    {
      "category": "Info",
      "commands": ["help", "uptime"]
    },
    {
      "category": "Moderation",
      "commands": ["kick"]
    }
  ]
}
```

#### Example Using Postman
1. Open Postman.
2. Create a new GET request.
3. Enter the request URL: `http://localhost:3000/api/v1/commands`.
4. Send the request.
5. View the response in JSON format, showing the command categories and the commands within each category.

---

## Dashboard Setup Instructions
To set up the Discord Community Bot's Dashboard, follow these steps:

1. **Install Dependencies:**
   ```sh
   npm install
   ```

2. Enter your `base api url` in `dashboard/config.json` or `dashboard/.env`.

3. **Build the nextjs project:**
   ```sh
   npm run build
   ```

4. **Start the dashboard:**
   ```sh
   npm run start
   ```

> If you disable the REST API in the config.json, the dashboard won't be able to fetch the stats & commands.

## Contributing
Contributions to this project are welcome! If you'd like to contribute, please fork the repository and submit a pull request with your changes.

## Issues
If you encounter any issues or have suggestions, please open an issue on the GitHub repository.

## License
This project is licensed under the MIT License. See the LICENSE file for details.