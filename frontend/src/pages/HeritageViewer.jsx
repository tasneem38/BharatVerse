import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ThreeDScene from '../components/ThreeDScene';
import api from '../services/api';
import { monumentsData } from './Heritage'; // Import data

export default function HeritageViewer() {
    const location = useLocation();
    const navigate = useNavigate();

    // State to track currently selected monument ID
    // If passed via navigation, use it. Otherwise null (Selection Mode)
    const [activeMonumentId, setActiveMonumentId] = useState(location.state?.monumentId || null);

    // Derived selected monument object
    const activeMonument = monumentsData.find(m => m.id === activeMonumentId);

    const [selectedInfo, setSelectedInfo] = useState(null);
    const [infoLoading, setInfoLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [chatLoading, setChatLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('history');
    const [panelMinimized, setPanelMinimized] = useState(false);
    const [language, setLanguage] = useState('en'); // 'en' or 'hi'
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleObjectClick = async (objectId) => {
        setInfoLoading(true);
        setSelectedInfo(null);
        setActiveTab('history');
        setPanelMinimized(false);
        try {
            const response = await api.post('/api/scene/interact', {
                object_id: objectId,
                query: `Explain this specific part of ${activeMonument?.name}`, // Use active name
                language: language
            });
            setSelectedInfo(response.data);
        } catch (err) {
            setSelectedInfo({
                title: "Connection Error",
                description: "Could not retrieve history data.",
                cultural_significance: "N/A"
            });
        } finally {
            setInfoLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInput('');
        setChatLoading(true);

        try {
            const context = selectedInfo ? `Context: User is looking at ${selectedInfo.title} in ${activeMonument?.name}. ` : `Context: User is exploring ${activeMonument?.name}. `;
            const response = await api.post('/api/chat/', {
                message: context + userMsg,
                language: language
            });
            setMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now." }]);
        } finally {
            setChatLoading(false);
        }
    };

    const handleBack = () => {
        if (location.state?.monumentId) {
            // If they came from the map, go back to the map
            navigate('/heritage');
        } else {
            // If they were browsing the list, go back to the list
            setActiveMonumentId(null);
            setMessages([]); // Clear chat
            setSelectedInfo(null);
        }
    };

    // --- SELECTION SCREEN (If no active monument) ---
    if (!activeMonumentId) {
        return (
            <div style={{
                minHeight: '100vh',
                background: '#020617',
                padding: '40px 20px',
                color: 'white'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
                        <button
                            onClick={() => navigate('/')}
                            style={{
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '30px',
                                cursor: 'pointer',
                                marginRight: '20px',
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.2)'}
                            onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
                        >
                            ← Home
                        </button>
                        <h1 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', color: '#ffd700', margin: 0 }}>
                            Select a 3D Experience
                        </h1>
                    </div>

                    {/* Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '30px'
                    }}>
                        {monumentsData.map(monument => (
                            <div
                                key={monument.id}
                                onClick={() => setActiveMonumentId(monument.id)}
                                style={{
                                    background: 'rgba(30, 41, 59, 0.5)',
                                    backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${monument.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: '20px',
                                    height: '350px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    padding: '20px',
                                    cursor: 'pointer',
                                    border: '1px solid rgba(255, 215, 0, 0.1)',
                                    transition: 'transform 0.3s, border-color 0.3s',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.borderColor = '#ffd700';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.1)';
                                }}
                            >
                                <div style={{ zIndex: 2 }}>
                                    <span style={{
                                        background: '#ffd700',
                                        color: '#000',
                                        padding: '4px 12px',
                                        borderRadius: '12px',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        marginBottom: '10px',
                                        display: 'inline-block'
                                    }}>
                                        {monument.type.toUpperCase()}
                                    </span>
                                    <h2 style={{ fontFamily: 'Playfair Display', margin: '5px 0', fontSize: '1.8rem' }}>{monument.name}</h2>
                                    <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: 0 }}>📍 {monument.city}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // --- 3D VIEW MODE ---
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
            background: '#020617'
        }}>
            {/* Full-Screen 3D Scene */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                <ThreeDScene onObjectClick={handleObjectClick} monumentId={activeMonumentId} />
            </div>

            {/* Navigation Header */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                background: 'rgba(2, 6, 23, 0.7)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(255, 215, 0, 0.1)',
                padding: '15px 30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <button
                        onClick={handleBack}
                        style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontSize: '0.9rem',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => {
                            e.target.style.background = 'rgba(255,255,255,0.1)';
                            e.target.style.borderColor = '#ffd700';
                        }}
                        onMouseLeave={e => {
                            e.target.style.background = 'transparent';
                            e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                        }}
                    >
                        ← Back
                    </button>
                    <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '1.5rem' }}>🏛️</span>
                        <div>
                            <h1 style={{
                                color: '#ffd700',
                                fontSize: '1.5rem',
                                fontFamily: 'Playfair Display',
                                margin: 0,
                                letterSpacing: '1px'
                            }}>
                                {activeMonument?.name} 3D
                            </h1>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <button
                        onClick={() => setPanelMinimized(!panelMinimized)}
                        style={{
                            background: 'rgba(255, 215, 0, 0.1)',
                            border: '1px solid rgba(255, 215, 0, 0.3)',
                            color: '#ffd700',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontWeight: '500'
                        }}
                    >
                        {panelMinimized ? 'Show Info' : 'Hide Info'}
                    </button>
                </div>
            </div>

            {/* Info / Chat Panel */}
            {!panelMinimized && (
                <div style={{
                    position: 'absolute',
                    right: '20px',
                    top: '90px',
                    width: '380px',
                    height: 'calc(100vh - 120px)',
                    background: 'rgba(15, 23, 42, 0.75)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                    zIndex: 100,
                    animation: 'slideInRight 0.3s ease-out'
                }}>
                    <style>{`
                        @keyframes slideInRight {
                            from { opacity: 0; transform: translateX(20px); }
                            to { opacity: 1; transform: translateX(0); }
                        }
                    `}</style>

                    {/* Language Toogle */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 15px 0' }}>
                        <div style={{
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '20px',
                            padding: '2px',
                            display: 'flex',
                            gap: '2px'
                        }}>
                            <button
                                onClick={() => setLanguage('en')}
                                style={{
                                    background: language === 'en' ? '#ffd700' : 'transparent',
                                    color: language === 'en' ? '#000' : '#fff',
                                    border: 'none',
                                    padding: '4px 10px',
                                    borderRadius: '18px',
                                    fontSize: '0.75rem',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s'
                                }}
                            >
                                English
                            </button>
                            <button
                                onClick={() => setLanguage('hi')}
                                style={{
                                    background: language === 'hi' ? '#ffd700' : 'transparent',
                                    color: language === 'hi' ? '#000' : '#fff',
                                    border: 'none',
                                    padding: '4px 10px',
                                    borderRadius: '18px',
                                    fontSize: '0.75rem',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontFamily: 'Noto Sans Devanagari',
                                    transition: 'all 0.3s'
                                }}
                            >
                                हिंदी
                            </button>
                        </div>
                    </div>

                    {/* Panel Tabs */}
                    <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <button
                            onClick={() => setActiveTab('history')}
                            style={{
                                flex: 1,
                                padding: '15px',
                                background: activeTab === 'history' ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                                border: 'none',
                                color: activeTab === 'history' ? '#ffd700' : '#94a3b8',
                                cursor: 'pointer',
                                fontWeight: activeTab === 'history' ? 'bold' : 'normal',
                                borderBottom: activeTab === 'history' ? '2px solid #ffd700' : 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}
                        >
                            📜 History
                        </button>
                        <button
                            onClick={() => setActiveTab('chat')}
                            style={{
                                flex: 1,
                                padding: '15px',
                                background: activeTab === 'chat' ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                                border: 'none',
                                color: activeTab === 'chat' ? '#ffd700' : '#94a3b8',
                                cursor: 'pointer',
                                fontWeight: activeTab === 'chat' ? 'bold' : 'normal',
                                borderBottom: activeTab === 'chat' ? '2px solid #ffd700' : 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}
                        >
                            🤖 AI Guide
                        </button>
                    </div>

                    {/* Content Area */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                        {activeTab === 'history' ? (
                            <div>
                                {infoLoading ? (
                                    <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                                        Scanning structure...
                                    </div>
                                ) : selectedInfo ? (
                                    <>
                                        <h2 style={{ fontFamily: 'Playfair Display', color: '#ffd700', marginTop: 0 }}>
                                            {selectedInfo.title}
                                        </h2>
                                        <p style={{ lineHeight: 1.6, color: '#e2e8f0' }}>{selectedInfo.description}</p>

                                        <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(255, 215, 0, 0.05)', borderRadius: '10px', borderLeft: '3px solid #ffd700' }}>
                                            <h4 style={{ margin: '0 0 10px 0', color: '#ffd700' }}>Cultural Significance</h4>
                                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#cbd5e1' }}>{selectedInfo.cultural_significance}</p>
                                        </div>
                                    </>
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
                                        <div style={{ fontSize: '3rem', marginBottom: '15px', opacity: 0.5 }}>👆</div>
                                        <p>Click on any {activeMonument?.type.slice(0, -1)} part to learn its history.</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Chat UI
                            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {messages.length === 0 && (
                                        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
                                            <p>Ask anything about the {activeMonument?.name}!</p>
                                        </div>
                                    )}
                                    {messages.map((msg, idx) => (
                                        <div key={idx} style={{
                                            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                            maxWidth: '85%',
                                            background: msg.role === 'user' ? 'linear-gradient(135deg, #ffd700, #bfa100)' : 'rgba(255,255,255,0.1)',
                                            color: msg.role === 'user' ? '#0f172a' : '#f1f5f9',
                                            padding: '10px 15px',
                                            borderRadius: '12px',
                                            fontSize: '0.95rem',
                                            lineHeight: 1.5,
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                        }}>
                                            {msg.content}
                                        </div>
                                    ))}
                                    {chatLoading && (
                                        <div style={{ alignSelf: 'flex-start', color: '#94a3b8', fontSize: '0.9rem' }}>Thinking...</div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                <form onSubmit={handleSendMessage} style={{ marginTop: '20px', position: 'relative' }}>
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask a question..."
                                        style={{
                                            width: '100%',
                                            background: 'rgba(0, 0, 0, 0.3)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            borderRadius: '25px',
                                            padding: '12px 45px 12px 20px',
                                            color: 'white',
                                            outline: 'none',
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        disabled={!input.trim() || chatLoading}
                                        style={{
                                            position: 'absolute',
                                            right: '5px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: '#ffd700',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '32px',
                                            height: '32px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: input.trim() ? 'pointer' : 'default',
                                            opacity: input.trim() ? 1 : 0.5,
                                            color: '#0f172a'
                                        }}
                                    >
                                        ➤
                                    </button>
                                </form>
                                <div style={{
                                    marginTop: '10px',
                                    textAlign: 'center',
                                    fontSize: '0.7rem',
                                    color: '#64748b',
                                    borderTop: '1px solid rgba(255,255,255,0.05)',
                                    paddingTop: '8px'
                                }}>
                                    Sources: ASI / INTACH / Sahapedia (RAG-Verified) ✅
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
