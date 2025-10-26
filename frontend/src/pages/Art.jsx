import { useState } from 'react';
import api from '../services/api';

const artStyles = [
  { value: 'madhubani', label: 'Madhubani (Bihar)', icon: '🎨' },
  { value: 'warli', label: 'Warli (Maharashtra)', icon: '🖼️' },
  { value: 'tanjore', label: 'Tanjore (Tamil Nadu)', icon: '✨' },
  { value: 'pattachitra', label: 'Pattachitra (Odisha)', icon: '🖌️' },
  { value: 'kalamkari', label: 'Kalamkari (Andhra Pradesh)', icon: '🎭' }
];

const artForms = [
  {
    name: 'Madhubani',
    description: 'Traditional folk painting from Bihar, characterized by intricate patterns and vibrant colors.',
    image_url: 'images/Madhubani.png'
  },
  {
    name: 'Warli',
    description: 'A tribal art form from Maharashtra known for its geometric patterns and depiction of daily life.',
    image_url: 'images/Warli.png'
  },
  {
    name: 'Tanjore',
    description: 'Classical South Indian painting style from Tamil Nadu with rich surface and vivid colors.',
    image_url: 'images/tanjore.jpg'
  },
  {
    name: 'Pattachitra',
    description: 'Traditional cloth-based scroll painting from Odisha, known for intricate designs and mythological narratives.',
    image_url: 'images/pattachitra_art.jpg'
  },
  {
    name: 'Kalamkari',
    description: 'Hand-painted or block-printed cotton textile art from Andhra Pradesh with natural dyes.',
    image_url: 'images/kalamkari_art.jpg'
  }
];

export default function Art() {
  const [formData, setFormData] = useState({ style: 'madhubani', prompt: '' });
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await api.post('/api/art/generate', formData);
      setDescription(response.data.description);
    } catch (err) {
      setError('Failed to generate art description. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: 1100,
      margin: '2.2rem auto',
      padding: '1.5rem',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: 'var(--surface, #fcfbfa)'
    }}>
      {/* Header */}
      <div className="heritage-header">
        <h1>Indian Art Explorer</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.13rem', marginBottom: 'var(--spacing-xl)' }}>
          Explore traditional Indian art forms and generate creative themes
        </p>
      </div>
      
      {/* Notion-style Compact Grid Cards */}
      <h2 style={{
        marginBottom: 'var(--spacing-md)',
        color: 'var(--primary)',
        textAlign: 'center'
      }}>
        Traditional Heritage Art Forms
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: '1.3rem',
          margin: '0 auto 2rem auto',
          maxWidth: 960
        }}
      >
        {artForms.map((art, idx) => (
          <div
            key={idx}
            className="heritage-card"
            tabIndex={0}
            style={{
              border: '1px solid var(--border, #eee)',
              borderRadius: 'var(--radius-md, 10px)',
              background: '#fff',
              boxShadow: 'var(--shadow-lg, 0 2px 24px rgba(30,81,185,0.08))',
              padding: '1rem 0.8rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: 170,
              maxWidth: 220,
              minWidth: 0,
              margin: '0 auto',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
          >
            <img
              src={art.image_url}
              alt={art.name}
              style={{
                width: '82%',
                height: 74,
                objectFit: 'cover',
                borderRadius: 7,
                marginBottom: 10,
                background: '#f3efe3'
              }}
            />
            <h3
              style={{
                color: 'var(--primary)',
                fontWeight: 600,
                fontSize: 15,
                textAlign: 'center',
                margin: '0 0 5px 0'
              }}
            >
              {art.name}
            </h3>
            <div
              className="heritage-meta"
              style={{
                fontSize: 13,
                color: 'var(--text-secondary)',
                textAlign: 'center',
                padding: '0 2px'
              }}
            >
              {art.description}
            </div>
          </div>
        ))}
      </div>

      {/* Generate Description Form */}
      <div
        style={{
          background: 'var(--surface, #fcfbfa)',
          borderRadius: 'var(--radius-md, 10px)',
          boxShadow: 'var(--shadow-lg, 0 2px 24px rgba(30,81,185,0.08))',
          border: '1px solid var(--border, #eee)',
          padding: 'var(--spacing-lg, 2rem)'
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* Art Style Panel - now horizontal */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'stretch',
            gap: '1.2rem',
            marginBottom: '2rem'
          }}>
            {artStyles.map(({ value, label, icon }) => {
              const selected = formData.style === value;
              return (
                <button
                  key={value}
                  type="button"
                  className={`tab${selected ? ' active' : ''}`}
                  aria-pressed={selected}
                  style={{
                    flex: 1,
                    maxWidth: 180,
                    minWidth: 120,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: selected ? 700 : 500,
                    background: selected ? "var(--primary)" : "#fff",
                    color: selected ? "#fff" : "var(--text-primary)",
                    border: selected ? "2px solid var(--primary)" : "1.5px solid var(--border)",
                    boxShadow: selected ? "0 2px 10px 0 rgba(30,81,185,0.11)" : "none",
                    fontSize: 16,
                    borderRadius: '10px',
                    padding: '18px 6px 13px 6px',
                    transition: "all 0.23s cubic-bezier(.61,-0.2,.22,1.09)",
                    cursor: "pointer"
                  }}
                  onClick={() => setFormData({ ...formData, style: value })}
                >
                  <span style={{ fontSize: 32, marginBottom: 6 }}>{icon}</span>
                  {label}
                </button>
              );
            })}
          </div>

          <div style={{ marginBottom: '1.6rem' }}>
            <label htmlFor="prompt" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 600,
              color: 'var(--primary)'
            }}>
              Subject / Theme
            </label>
            <textarea
              id="prompt"
              name="prompt"
              rows="4"
              required
              placeholder="Describe what you'd like to see in this art style... e.g., 'A village festival scene' or 'Nature and wildlife'"
              value={formData.prompt}
              onChange={e => setFormData({ ...formData, prompt: e.target.value })}
              style={{
                width: '100%',
                padding: 14,
                fontSize: 16,
                borderRadius: 'var(--radius-sm, 8px)',
                border: '1px solid var(--border, #ccc)',
                resize: 'vertical',
                color: 'var(--text-primary)',
                outline: 'none',
                fontFamily: 'inherit',
                backgroundColor: "#fffcf4"
              }}
            />
          </div>

          {error && <div style={{ color: '#b14040', marginBottom: 16 }}>{error}</div>}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px 0',
              fontWeight: 'bold',
              fontSize: 19,
              color: '#fff',
              background: "var(--primary)",
              border: 'none',
              borderRadius: 'var(--radius-md, 10px)',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : 'var(--shadow-lg, 0 4px 16px rgba(30,81,185,0.11))',
              userSelect: 'none',
              letterSpacing: 0.9
            }}
          >
            {loading ? '⏳ Generating...' : '✨ Generate Art Description'}
          </button>
        </form>
      </div>

      {description && (
        <div style={{
          background: '#f3efe3',
          padding: 22,
          borderRadius: 'var(--radius-sm, 8px)',
          boxShadow: 'var(--shadow-lg, 0 4px 16px rgba(80,60,150,0.09))',
          fontSize: 16,
          lineHeight: '1.6',
          whiteSpace: 'pre-wrap',
          color: 'var(--primary)',
          marginTop: 30
        }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: 14 }}>🎨 Art Description</h2>
          {description}
        </div>
      )}
    </div>
  );
}
