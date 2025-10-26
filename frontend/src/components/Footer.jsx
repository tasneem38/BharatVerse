export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(95deg, #322041 0%, #3a233c 35%, #e8c15f 120%)',
      color: 'white',
      padding: '2rem 1.5rem 1rem 1.5rem',
      marginTop: 'auto',
      borderTop: '1.5px solid #4b3455'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2.5rem',
          flexWrap: 'wrap',
          marginBottom: '0.75rem'
        }}>
          {/* Left: Logo & Description */}
          <div style={{ flex: '0 0 auto' }}>
            <h3 style={{
              fontSize: '1.3rem',
              color: '#e8c15f',
              fontWeight: 'bold',
              marginBottom: '0.25rem',
              letterSpacing: '0.03em'
            }}>
              🇮🇳 BharatVerse
            </h3>
            <p style={{
              color: 'white',
              opacity: 0.85,
              fontSize: '0.87rem',
              maxWidth: '300px'
            }}>
              Celebrating India's Heritage with AI-powered exploration & guides.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.1rem',
            fontSize: '0.98rem',
            flex: '1 1 auto',
            justifyContent: 'center'
          }}>
            <a href="/home" style={{
              color: '#fff',
              textDecoration: 'none',
              opacity: 0.95,
              fontWeight: 600
            }}>🏠 Home</a>
            <span style={{ color: '#e8c15f', opacity: 0.59 }}>|</span>
            <a href="/heritage" style={{
              color: '#fff',
              textDecoration: 'none',
              opacity: 0.95,
              fontWeight: 600
            }}>🏛️ Heritage</a>
            <span style={{ color: '#e8c15f', opacity: 0.59 }}>|</span>
            <a href="/chat" style={{
              color: '#fff',
              textDecoration: 'none',
              opacity: 0.95,
              fontWeight: 600
            }}>🤖 AI Guide</a>
            <span style={{ color: '#e8c15f', opacity: 0.59 }}>|</span>
            <a href="/itinerary" style={{
              color: '#fff',
              textDecoration: 'none',
              opacity: 0.95,
              fontWeight: 600
            }}>🗺️ Itinerary</a>
          </div>

          {/* Right: Connect */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.9rem',
            flex: '0 0 auto'
          }}>
            <span style={{ color: '#e8c15f', fontWeight: 'bold', fontSize: '0.95rem' }}>
              Connect:
            </span>
            <a href="mailto:info@bharatverse.com" style={{
              color: '#e8c15f', fontSize: '1.3rem', textDecoration: 'none'
            }}>📧</a>
            <a href="tel:+911234567890" style={{
              color: '#e8c15f', fontSize: '1.3rem', textDecoration: 'none'
            }}>📱</a>
            <a href="https://bharatverse.com" style={{
              color: '#e8c15f', fontSize: '1.3rem', textDecoration: 'none'
            }}>🌐</a>
          </div>
        </div>

        {/* Copyright - Separate line */}
        <div style={{
          borderTop: '1px solid rgba(232,193,95,0.19)',
          paddingTop: '0.7rem',
          textAlign: 'center',
          color: 'white',
          opacity: 0.85,
          fontSize: '0.87rem'
        }}>
          © 2025 BharatVerse • All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
