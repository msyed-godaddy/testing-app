import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MDEditor from '@uiw/react-markdown-editor';
import MDEditorNew from '@uiw/react-md-editor';
import { AdPreviewContainer } from '@wsb/ms-content-ui-components';
import '@wsb/ms-content-ui-components/dist/index.css';
import './App.css';

interface Content {
  title: string;
  body: string;
}

function App() {
  const [content, setContent] = useState<Content>({ title: '', body: '' });
  const [editMode, setEditMode] = useState(false);
  const [editType, setEditType] = useState<'markdown' | 'plaintext' | 'react-md-editor' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [originalContent, setOriginalContent] = useState<Content>({ title: '', body: '' });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/content');
      const data = await response.json();
      setContent(data);
      setOriginalContent(data);
    } catch (error) {
      console.error('Error fetching content:', error);
      setMessage('Error loading content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setMessage('');

      const response = await fetch('http://localhost:5000/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Content saved successfully!');
        setOriginalContent(content);
        setEditMode(false);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error saving content:', error);
      setMessage('Error saving content');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setEditType('markdown');
    setMessage('');
  };

  const handlePlainTextEdit = () => {
    setEditMode(true);
    setEditType('plaintext');
    setMessage('');
  };

  const handleReactMDEditorEdit = () => {
    setEditMode(true);
    setEditType('react-md-editor');
    setMessage('');
  };

  const handleCancel = () => {
    setContent(originalContent);
    setEditMode(false);
    setEditType(null);
    setMessage('');
  };

  const hasChanges = content.title !== originalContent.title || content.body !== originalContent.body;

  if (isLoading) {
    return (
      <div className="App">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Markdown Editor POC</h1>
        <p>Using @uiw/react-markdown-editor with live preview</p>
      </header>

      <main className="App-main">
        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        {editMode ? (
          <div className="edit-mode">
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                id="title"
                type="text"
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                placeholder="Enter blog title..."
                className="title-input"
              />
            </div>

            {editType === 'markdown' ? (
              <div className="markdown-editor-container" data-color-mode="light">
                <label>Content (React Markdown Editor):</label>
                <MDEditor
                  value={content.body}
                  onChange={(value) => setContent({ ...content, body: value || '' })}
                  height="400px"
                  className="markdown-editor"
                  visible={true}
                />
              </div>
            ) : editType === 'react-md-editor' ? (
              <div className="react-md-editor-container" data-color-mode="light">
                <label>Content (React MD Editor):</label>
                <MDEditorNew
                  value={content.body}
                  onChange={(value) => setContent({ ...content, body: value || '' })}
                  height={400}
                  className="react-md-editor"
                />
              </div>
            ) : (
              <div className="plain-text-editor-container">
                <label>Content (Plain Text):</label>
                <textarea
                  value={content.body}
                  onChange={(e) => setContent({ ...content, body: e.target.value })}
                  placeholder="Enter blog content in plain text..."
                  className="plain-text-editor"
                  rows={20}
                />
                <div className="editor-info">
                  <p><strong>Plain Text Mode:</strong> Edit content as raw text. No markdown formatting or live preview.</p>
                </div>
              </div>
            )}

            <div className="button-group">
              <button 
                onClick={handleCancel} 
                className="btn btn-secondary"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                className="btn btn-primary"
                disabled={isSaving || !hasChanges}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        ) : (
          <div className="view-mode">
            <div className="content-header">
              <h2>{content.title}</h2>
              <div className="edit-buttons">
                <button onClick={handleEdit} className="btn btn-primary">
                  Edit with React Markdown Editor
                </button>
                <button onClick={handleReactMDEditorEdit} className="btn btn-secondary">
                  Edit with React MD Editor
                </button>
                <button onClick={handlePlainTextEdit} className="btn btn-secondary">
                  Edit as Plain Text
                </button>
              </div>
            </div>

            <div className="markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content.body}
              </ReactMarkdown>
            </div>

            {/* Ad Preview Components Demo */}
            <div className="component-demo">
              <h3>Ad Preview Components Demo</h3>
              
              {/* Facebook Ad */}
              <div className="ad-preview-section" style={{ marginBottom: '40px' }}>
                <h4>Facebook Ad Preview:</h4>
                <AdPreviewContainer
                  provider="fb"
                  adContent={{
                    title: 'Start a New Chapter With Our Realtors',
                    message: 'Being a top-selling real estate team, homeowners trust us for expert guidance, seamless service, and proven success. Call us today: 900-MOCK-DATA.',
                    buttonLabel: 'CONTACT_US',
                    linkUrl: 'http://mock-data.com/',
                    imageUrl: 'https://img1.wsimg.com/isteam/ip/41db0615-614b-4a50-8491-435c4058bde7/blob-0010-e4a6632.png',
                    details: 'Thinking of making a move? Contact us today!'
                  }}
                  platforms={['FACEBOOK', 'INSTAGRAM']}
                  websiteDomain="mock-data.com"
                  businessName="McKee Kubasko Group of Long & Foster Real Estate"
                  connection={{
                    profilePhoto: 'https://scontent-iad3-2.xx.fbcdn.net'
                  }}
                />
              </div>

              {/* Google Ad */}
              <div className="ad-preview-section">
                <h4>Google Ad Preview:</h4>
                <AdPreviewContainer
                  provider="googleAds"
                  adContent={{
                    headlines: ['Amazing Product Sale', '50% Off Everything', 'Limited Time Only'],
                    descriptions: ['Get 50% off on all products this week only!', 'Shop now and save big on your favorite items.'],
                    buttonLabel: 'SHOP_NOW',
                    linkUrl: 'https://example.com',
                    phoneNumber: '555-1234'
                  }}
                  platforms={['GOOGLE']}
                  websiteDomain="example.com"
                  businessName="Amazing Products Store"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
