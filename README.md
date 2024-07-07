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
- [Contributing](#contributing)
- [Issues](#issues)
- [License](#license)

## What is this bot?
The Discord Community Bot is designed to make community management easier for server admins and mods, regardless of the size of the community.

## Setup Instructions
To set up the Discord Community Bot, follow these steps:

1. **Clone the Repository:**
   ```
   git clone https://github.com/krushna06/Community-Bot
   ```
   
2. **Install Dependencies:**
   ```
   npm install
   ```

3. **Rename** `example.config.json` to `config.json` and fill it inside the `config` folder.

4. **Start the Bot:**
   ```
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
const http = require('http');

// Define the API endpoint
const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/v1/commands',
    method: 'GET'
};

// Make the HTTP GET request
const req = http.request(options, (res) => {
    let data = '';

    // Listen for data chunks
    res.on('data', (chunk) => {
        data += chunk;
    });

    // On end of response, parse and log the data
    res.on('end', () => {
        const commandDetails = JSON.parse(data).commandDetails;
        commandDetails.forEach(category => {
            console.log(`Category: ${category.category}`);
            console.log(`Commands: ${category.commands.join(', ')}`);
        });
    });
});

// Handle request errors
req.on('error', (error) => {
    console.error(`Error: ${error.message}`);
});

// End the request
req.end();
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

By following these steps, you can easily retrieve and display the data.

---

## Contributing
Contributions to this project are welcome! If you'd like to contribute, please fork the repository and submit a pull request with your changes.

## Issues
If you encounter any issues or have suggestions, please open an issue on the GitHub repository.

## License
This project is licensed under the MIT License. See the LICENSE file for details.