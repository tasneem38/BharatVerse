/*import { useState, useRef, useEffect } from 'react';
import api from '../services/api';
import '../styles/chat.css';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await api.post('/api/chat/', {
        message: userMessage,
        session_id: sessionId,
        language: 'en'
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
      setSessionId(response.data.session_id);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container chat-container">
      <div className="chat-box card">
        <div className="chat-header">
          <h2>🤖 AI Cultural Guide</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Ask me anything about Indian culture, heritage, festivals, and more!
          </p>
        </div>

        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="chat-empty">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👋</div>
              <p>Start a conversation! Ask me about:</p>
              <ul style={{ textAlign: 'left', marginTop: '1rem' }}>
                <li>Monuments and historical sites</li>
                <li>Festivals and celebrations</li>
                <li>Traditional art forms</li>
                <li>Cultural practices and traditions</li>
              </ul>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`message message-${msg.role}`}>
              <div className="message-avatar">
                {msg.role === 'user' ? '👤' : '🤖'}
              </div>
              <div className="message-content">
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="message message-assistant">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="chat-input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Indian culture..."
            disabled={loading}
          />
          <button type="submit" className="btn btn-primary" disabled={loading || !input.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
*/
import { useState, useRef, useEffect } from 'react';
import api from '../services/api';
import '../styles/chat.css';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    "Tell me about Taj Mahal",
    "What is Diwali festival?",
    "Explain Madhubani art",
    "Best places in Rajasthan"
  ];

  const handleSuggestion = (question) => {
    setInput(question);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await api.post('/api/chat/', {
        message: userMessage,
        session_id: sessionId,
        language: 'en'
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
      setSessionId(response.data.session_id);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '❌ Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container chat-container">
      <div className="chat-box card">
        <div className="chat-header">
          <h2>🤖 AI Cultural Guide</h2>
          <p>Ask me anything about Indian culture, heritage, festivals, and more!</p>
        </div>

        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="chat-empty">
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👋</div>
              <h3 style={{ marginBottom: '1rem' }}>Start a conversation!</h3>
              <p style={{ marginBottom: '1.5rem' }}>Try asking about:</p>
              <ul style={{ textAlign: 'left', marginTop: '1rem', marginBottom: '1.5rem' }}>
                <li>🏛️ Monuments and historical sites</li>
                <li>🎉 Festivals and celebrations</li>
                <li>🎨 Traditional art forms</li>
                <li>🕉️ Cultural practices and traditions</li>
              </ul>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                {suggestedQuestions.map((q, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSuggestion(q)}
                    className="btn btn-secondary"
                    style={{ fontSize: '14px' }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`message message-${msg.role}`}>
              <div className="message-avatar">
                {msg.role === 'user' ? '👤' : '🤖'}
              </div>
              <div className="message-content">
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="message message-assistant">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="chat-input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Indian culture..."
            disabled={loading}
          />
          <button type="submit" className="btn btn-primary" disabled={loading || !input.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
