import React from 'react';

export default function Modal({ data, onClose }) {
  if (!data) return null;

  const isVideoPlace = data.name === "Taj Mahal" || data.name === "Red Fort";

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
        padding: '20px',
        overflow: 'hidden',
      }}
      onClick={onClose}
    >
      {isVideoPlace && (
        <>
          <video
            src={data.name === "Taj Mahal" ? "/videos/tajmahal_background.mp4" : "/videos/redfort_background.mp4"}
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.4)',
              zIndex: -1,
              borderRadius: '10px',
            }}
          />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '700px',
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '10px',
            color: 'white',
            padding: '1.2rem 1.6rem',
            animation: 'fadeScaleIn 0.5s ease forwards',
            opacity: 0,
            maxHeight: '80vh',
            overflowY: 'auto',
          }}>
            <p style={{ whiteSpace: 'pre-wrap' }}>{data.description}</p>
            {data.extra_description && <p style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>{data.extra_description}</p>}
          </div>
          <style>
            {`
            @keyframes fadeScaleIn {
              to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
              }
              from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.95);
              }
            }
            `}
          </style>
        </>
      )}

      {!isVideoPlace && (
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 10,
            maxWidth: '800px',
            width: '90%',
            display: 'flex',
            flexDirection: 'row',
            gap: '1.5rem',
            padding: '20px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
            position: 'relative',
            animation: 'fadeScaleIn 0.4s ease forwards',
            opacity: 0
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Your existing modal content for other items */}
          <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={data.image_url || '/images/placeholder.jpg'}
              alt={data.name}
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '400px',
                objectFit: 'cover',
                borderRadius: '10px',
              }}
            />
          </div>
          <div style={{ flex: '1.2', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            <button
              onClick={onClose}
              style={{
                alignSelf: 'flex-end',
                fontWeight: 'bold',
                fontSize: '1.4rem',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: '#666',
                position: 'absolute',
                right: 30,
                top: 10
              }}
              aria-label="Close modal"
            >
              ×
            </button>
            <h2 style={{ marginTop: 0, color: '#00796b', marginBottom: '0.8rem' }}>{data.name}</h2>
            {(data.city || data.location) && (
              <p style={{ color: '#555', margin: '0 0 0.6rem 0' }}>
                <strong>Location:</strong> {data.location ? data.location : `${data.city}, ${data.state}`}
              </p>
            )}
            <p style={{ lineHeight: 1.6, color: '#333', textAlign: 'justify' }}>
              {data.description}
            </p>
            {data.significance && (
              <p style={{ marginTop: '1rem', lineHeight: 1.6, color: '#00796b', fontStyle: 'italic' }}>
                <strong>Significance:</strong> {data.significance}
              </p>
            )}
            <button
              onClick={onClose}
              style={{
                marginTop: '1.2rem',
                alignSelf: 'flex-start',
                padding: '0.6rem 1.4rem',
                background: '#00796b',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background 0.3s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = '#00695c')}
              onMouseOut={(e) => (e.currentTarget.style.background = '#00796b')}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <style>
        {`
        @keyframes fadeScaleIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
          from {
            opacity: 0;
            transform: scale(0.95);
          }
        }
        `}
      </style>
    </div>
  );
}
