# GoDaddy Testing App

A general testing and POC application for GoDaddy components, built with React + Express. Used to test UI components and new features.

## Features

- **Component Testing**: Test GoDaddy UI components and libraries
- **POC Development**: Quick prototyping and proof-of-concept development
- **Professional Markdown Editor**: Using `@uiw/react-markdown-editor` with live preview
- **Ad Preview Components**: Test GoogleAdPreview and MetaAdPreview components
- **File Persistence**: Content is saved to a JSON file on the server

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Backend**: Express.js
- **Markdown Editor**: @uiw/react-markdown-editor
- **Markdown Rendering**: react-markdown + remark-gfm
- **Styling**: CSS3
- **File Storage**: JSON file on server

## Project Structure

```
testing-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.tsx        # Main testing component
│   │   └── App.css        # Styles
│   └── package.json
├── server/
│   ├── index.js           # Express server
│   └── data/              # Data storage (auto-created)
└── package.json           # Root package.json
```

## Setup & Installation

1. **Install dependencies**:
   ```bash
   npm run install-all
   ```

2. **Start the development servers**:
   ```bash
   npm run dev
   ```

   This will start both servers concurrently:
   - Backend server on `http://localhost:5000`
   - Frontend dev server on `http://localhost:3000`

   **Alternative startup options**:
   - Frontend only: `npm run client`
   - Backend only: `npm run server` or `npm start`

3. **Open your browser** and navigate to `http://localhost:3000`

## API Endpoints

- `GET /api/content` - Retrieve current content
- `POST /api/content` - Save content (requires `title` and `body`)
- `GET /api/health` - Health check

## Usage

1. **View Mode**: Content is displayed as rendered markdown
2. **Edit Mode**: Click "Edit" to switch to editing mode
3. **Markdown Editor**: Use the professional markdown editor with:
   - **Toolbar**: Formatting buttons for common markdown syntax
   - **Split View**: Edit on left, live preview on right
   - **Syntax Highlighting**: Proper highlighting for markdown
4. **Make Changes**: Edit the title and/or markdown content
5. **Save**: Click "Save Changes" to persist changes
6. **Cancel**: Click "Cancel" to discard changes and return to view mode

## Markdown Editor Features

The `@uiw/react-markdown-editor` provides:

- **Live Preview**: Real-time rendering as you type
- **Toolbar**: Buttons for common formatting (bold, italic, headers, lists, etc.)
- **Split-Pane View**: Edit and preview side-by-side
- **Syntax Highlighting**: Proper highlighting for markdown syntax
- **Keyboard Shortcuts**: Common shortcuts for formatting
- **Responsive Design**: Works on different screen sizes

## Data Storage

Content is stored in `server/data/content.json` with the following structure:

```json
{
  "title": "Blog Post Title",
  "body": "# Markdown content\n\nThis is the blog post content..."
}
```

## Development

- **Frontend only**: `npm run client`
- **Backend only**: `npm run server`
- **Build for production**: `npm run build`

## Key Features Demonstrated

This POC demonstrates the core functionality needed for the marketing-agent-mfe blog editing feature:

1. **Toggle between view/edit modes** ✅
2. **Professional markdown editor with live preview** ✅
3. **Save functionality with API calls** ✅
4. **Cancel functionality** ✅
5. **Change detection** ✅
6. **Loading and error states** ✅
7. **File persistence** ✅
8. **Rich formatting toolbar** ✅

## Next Steps for Integration

To integrate this into the marketing-agent-mfe:

1. **Replace the Express server** with calls to the blog API (`/v1/blog/:blogId/post/:postId`)
2. **Integrate with existing BlogPost component** - replace the current display-only mode
3. **Add authentication headers** - use the existing `auth_idp` cookie
4. **Style to match existing UI** - adapt the MDEditor styling to match the current design system
5. **Add validation** - specific to blog post requirements

## Why @uiw/react-markdown-editor?

This library was chosen because it provides:

- **Professional UX**: Split-pane editing with live preview
- **Rich Toolbar**: Common formatting options readily available
- **Lightweight**: Minimal bundle size impact
- **TypeScript Support**: Full type safety
- **Customizable**: Easy to style and configure
- **Active Maintenance**: Well-maintained and popular

This matches exactly what was proposed in the investigation for the marketing-agent-mfe blog editing feature!
