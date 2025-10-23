const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// File path for storing markdown content
const DATA_FILE = path.join(__dirname, 'data', 'content.json');

// Ensure data directory exists
fs.ensureDirSync(path.dirname(DATA_FILE));

// Initialize default content if file doesn't exist
const initializeDefaultContent = async () => {
  try {
    await fs.access(DATA_FILE);
  } catch (error) {
    // File doesn't exist, create with default content
    const defaultContent = {
      title: 'Sample Blog Post',
      body: `# Welcome to the Markdown Editor

This is a **sample blog post** created with our markdown editor.

## Features

- *Italic text*
- **Bold text**
- \`Inline code\`
- [Links](https://example.com)

## Code Block

\`\`\`javascript
function hello() {
  console.log('Hello, World!');
}
\`\`\`

## Lists

1. First item
2. Second item
3. Third item

- Unordered item
- Another item
- Yet another item

Feel free to edit this content!`
    };
    await fs.writeJson(DATA_FILE, defaultContent, { spaces: 2 });
  }
};

// Initialize default content on server start
initializeDefaultContent();

// Routes
app.get('/api/content', async (req, res) => {
  try {
    const content = await fs.readJson(DATA_FILE);
    res.json(content);
  } catch (error) {
    console.error('Error reading content:', error);
    res.status(500).json({ error: 'Failed to read content' });
  }
});

app.post('/api/content', async (req, res) => {
  try {
    const { title, body } = req.body;
    
    if (!title || !body) {
      return res.status(400).json({ error: 'Title and body are required' });
    }

    const content = { title, body };
    await fs.writeJson(DATA_FILE, content, { spaces: 2 });
    
    res.json({ message: 'Content saved successfully', content });
  } catch (error) {
    console.error('Error saving content:', error);
    res.status(500).json({ error: 'Failed to save content' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Data file: ${DATA_FILE}`);
});
