import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProjectRow = ({ title, subtitle, desc, link, linkText, imagePath, inverted = false }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: inverted ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '5%',
      padding: '100px 0',
      maxWidth: '1200px',
      margin: '0 auto',
      flexWrap: 'wrap'
    }}>
      {/* Visual Side (Image) */}
      <div style={{
        flex: '1 1 500px',
        position: 'relative',
        height: '400px',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.1)',
        group: 'image-container' // For hover effects
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}>
          <img
            src={imagePath}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s ease',
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
        </div>

        {/* Overlay Gradient for depth */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(15, 23, 42, 0.4) 100%)',
          pointerEvents: 'none'
        }} />
      </div>

      {/* Text Side */}
      <div style={{
        flex: '1 1 400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: inverted ? 'flex-end' : 'flex-start',
        textAlign: inverted ? 'right' : 'left',
        zIndex: 10 // Ensure text is above if overlap
      }}>
        <span style={{
          color: '#ffd700',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '10px',
          fontSize: '0.9rem'
        }}>
          Featured Experience
        </span>

        <h2 style={{
          fontFamily: 'Playfair Display',
          fontSize: '3.5rem',
          color: 'white',
          margin: '0 0 25px 0',
          lineHeight: 1.1,
          textShadow: '0 4px 20px rgba(0,0,0,0.5)'
        }}>
          {title}
        </h2>

        {/* Overlapping Info Card */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)', // Semi-transparent Slate
          backdropFilter: 'blur(12px)',
          padding: '35px',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          maxWidth: '550px',
          marginBottom: '20px',
          transform: inverted ? 'translateX(-40px)' : 'translateX(40px)', // Stronger overlap
          textAlign: 'left',
          position: 'relative'
        }}>
          <p style={{
            color: '#cbd5e1',
            lineHeight: 1.7,
            fontSize: '1.05rem',
            margin: 0
          }}>
            {desc}
          </p>
        </div>

        <Link to={link} style={{
          color: 'white',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginTop: '10px',
          marginLeft: inverted ? '0' : '40px', // Align with card
          marginRight: inverted ? '40px' : '0',
          transition: 'gap 0.3s'
        }}
          onMouseEnter={(e) => e.target.style.gap = '15px'}
          onMouseLeave={(e) => e.target.style.gap = '10px'}
        >
          {linkText} <span style={{ color: '#ffd700' }}>→</span>
        </Link>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div style={{
      background: '#020617', // Deepest Blue
      minHeight: '100vh',
      width: '100%',
      overflowX: 'hidden',
      color: 'white',
      paddingTop: '40px'
    }}>

      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        padding: '120px 20px 80px',
        background: 'radial-gradient(circle at top, #1e293b 0%, #020617 70%)'
      }}>
        <h1 style={{
          fontFamily: 'Playfair Display',
          fontSize: 'clamp(3rem, 7vw, 6rem)',
          background: 'linear-gradient(to right, #ffffff, #ffd700, #ffffff)',
          backgroundSize: '200% auto',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '20px',
          animation: 'shine 8s linear infinite'
        }}>
          BHARATVERSE
        </h1>
        <p style={{
          color: '#94a3b8',
          fontSize: '1.3rem',
          maxWidth: '700px',
          margin: '0 auto',
          fontFamily: 'Inter',
          fontWeight: 300
        }}>
          Experience the Soul of India through a secured, AI-powered immersive digital dimension.
        </p>
      </div>

      {/* Content Rows */}
      <div style={{ padding: '0 20px 100px' }}>

        <ProjectRow
          title="Heritage Viewer"
          desc="Explore the Taj Mahal in a stunning interactive 3D environment. Click on architectural details to uncover their history, powered by our digital archives."
          link="/heritage"
          linkText="Enter Simulation"
          imagePath="/assets/taj_mahal.png"
          inverted={false}
        />

        <ProjectRow
          title="AI Cultural Guide"
          desc="Your intelligent companion for cultural discovery. The AI Guide uses advanced natural language processing to answer your deepest questions about history."
          link="/chat"
          linkText="Start Conversation"
          imagePath="/assets/ai_guide.png"
          inverted={true}
        />

        <ProjectRow
          title="Art Gallery"
          desc="A curated digital museum of India's finest artistic traditions. Immerse yourself in the intricate patterns of Madhubani and Mandala art in high definition."
          link="/art"
          linkText="View Gallery"
          imagePath="/assets/art_gallery.png"
          inverted={false}
        />

        <ProjectRow
          title="Procedural World"
          desc="Step into the future of exploration. Generate and wander through infinite, procedurally created 3D landscapes designed for the metaverse."
          link="/explore-3d"
          linkText="Launch World"
          imagePath="/assets/procedural_world.png"
          inverted={true}
        />

      </div>

      <style>{`
                @keyframes shine {
                    to {
                        background-position: 200% center;
                    }
                }
            `}</style>
    </div>
  );
}
