# Zesty.io Bulk Content Update Script

This Node.js script is designed to perform bulk updates on content items within a Zesty.io instance. It fetches all items from a specified content model, searches for a specific term within a designated field, replaces it with a new term, and then publishes the changes.

## Features

- Find and replace text in a specified field across multiple content items.
- Uses environment variables to securely store sensitive credentials.
- Processes multiple items concurrently for improved performance.
- Publishes updated items automatically.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.
- A Zesty.io account with an instance and a content model.

### Installation & Configuration

1.  **Install project dependencies:**
    Open your terminal in the project root and run:
    ```bash
    npm install
    ```

2.  **Set up environment variables:**
    Create a `.env` file in the project's root directory. This file will store your Zesty.io credentials and instance information. You may need to create a token in your Zesty account under the "Users" or "API" section.

    ```env
    # Your Zesty.io instance ZUID
    ZESTY_INSTANCE_ZUID=your_instance_zuid_here

    # A valid Zesty.io API token
    ZESTY_API_TOKEN=your_token_here

    # The ZUID of the content model you want to update (e.g., Articles)
    ZESTY_ARTICLES_ZUID=your_model_zuid_here
    ```

3.  **Configure the script behavior:**
    Open the `index.js` file and adjust the following constants at the top to match your requirements:

    ```javascript
    const fieldToEdit = "content_body"; // The API field name to modify
    const termToReplace = "works";      // The term to search for
    const replaceWith = "workshop";   // The term to replace with
    ```

4. **Configure Zesty.io connection**
   Ensure your `zestyConfig.js` file is correctly set up to initialize the Zesty SDK with the credentials from your `.env` file.

### Running the Script

Once you have configured your environment and the script, you can execute it by running the following command in your terminal:

```bash
npm start
```