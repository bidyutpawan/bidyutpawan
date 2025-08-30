import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [template, setTemplate] = useState('default');
  const [videoUrl, setVideoUrl] = useState('');
  const templates = ['default', 'modern', 'fun', 'minimal'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, template }),
    });
    const data = await res.json();
    setVideoUrl(data.videoUrl);
  };

  return (
    <div>
      <h1>Text to Insta Reel Video Converter</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter your text"
          rows={4}
          cols={50}
        />
        <br />
        <label>Choose Template: </label>
        <select value={template} onChange={e => setTemplate(e.target.value)}>
          {templates.map(tpl => <option key={tpl} value={tpl}>{tpl}</option>)}
        </select>
        <br />
        <button type="submit">Generate Video</button>
      </form>
      {videoUrl && (
        <div>
          <h2>Your Insta Reel:</h2>
          <video src={videoUrl} controls width="400" />
        </div>
      )}
    </div>
  );
}

export default App;
