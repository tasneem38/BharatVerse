import React, { useState, useEffect } from 'react';
import Modal from './Modal';

export default function Heritage() {
  const categories = [
    { label: "Monuments", value: "monuments" },
    { label: "Festivals", value: "festivals" },
    { label: "Art & Dances", value: "art" }
  ];

  // ... Place your full monumentsList, festivalsList, artFormsList here ...
  const monumentsList = [
  {
    id: 1,
    name: "Taj Mahal",
    image_url: "/images/TajMahal.jpg",
    description: "The Taj Mahal, built in the 17th century by Mughal Emperor Shah Jahan, stands as an eternal symbol of love and architectural brilliance. Crafted entirely from pristine white marble, it exhibits perfect symmetry, intricate carvings, and inlaid gemstones that shimmer under the sunlight. Its breathtaking reflection in the Yamuna River adds to its ethereal beauty.",
    city: "Agra",
    state: "Uttar Pradesh",
    type: "Monument",
    significance: "A UNESCO World Heritage Site and one of the Seven Wonders of the World, the Taj Mahal represents India’s cultural elegance and Mughal craftsmanship. It stands as a timeless expression of love, beauty, and the fusion of Persian, Islamic, and Indian architectural styles."
  },
  {
    id: 2,
    name: "Red Fort",
    image_url: "/images/RedFort.jpg",
    description: "Built in 1648 by Emperor Shah Jahan, the Red Fort (Lal Qila) is an imposing fortress of red sandstone that served as the Mughal seat of power for nearly 200 years. Its massive walls, intricate palaces, and gardens reflect the grandeur of Mughal architecture. Every stone tells tales of royal assemblies, court life, and India’s historical evolution.",
    city: "Delhi",
    type: "Monument",
    significance: "As a symbol of India’s independence and sovereignty, the Red Fort holds immense national value — it’s from its ramparts that the Prime Minister delivers the Independence Day address every year. A UNESCO World Heritage Site, it reflects resilience and pride in India’s struggle for freedom."
  },
  {
    id: 3,
    name: "Qutub Minar",
    image_url: "/images/Qutub_Minar.jpg",
    description: "Constructed in the early 13th century by Qutb-ud-din Aibak and later completed by Iltutmish, the Qutub Minar is a towering masterpiece of Indo-Islamic architecture. Standing 73 meters tall, it’s carved with intricate Arabic inscriptions and geometric motifs, showcasing artistic excellence of the Delhi Sultanate era.",
    city: "Delhi",
    type: "Monument",
    significance: "A UNESCO World Heritage Site, Qutub Minar symbolizes the beginning of Muslim rule in India. It’s admired for its architectural grandeur, historical importance, and engineering marvel that has stood strong for over eight centuries."
  },
  {
    id: 4,
    name: "Gateway of India",
    image_url: "/images/Gateway.png",
    description: "Built in 1924 to commemorate the visit of King George V and Queen Mary, the Gateway of India stands as Mumbai’s most iconic landmark on the Arabian Sea. Blending Indo-Saracenic and Islamic architectural styles, this basalt arch became the ceremonial entry point to India during British rule.",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Monument",
    significance: "The Gateway marks both colonial grandeur and independence — the last British troops departed through it in 1948. Today, it serves as a proud symbol of Mumbai’s spirit and India’s transition from colonialism to freedom."
  },
  {
    id: 5,
    name: "Sun Temple, Konark",
    image_url: "/images/Konark.png",
    description: "Built in the 13th century by King Narasimhadeva I of the Eastern Ganga dynasty, the Sun Temple at Konark is designed as a colossal chariot dedicated to the Sun God, Surya. Its intricately carved wheels, pillars, and walls depict scenes from daily life, mythology, and celestial beings, showcasing Odisha’s sculptural artistry.",
    city: "Konark",
    state: "Odisha",
    type: "Monument",
    significance: "A UNESCO World Heritage Site, the Sun Temple represents India’s mastery of stone architecture and astronomical precision. Its artistic brilliance and mythological depth make it one of the finest examples of Kalinga architecture and devotion to the Sun God."
  },
  {
    id: 6,
    name: "Meenakshi Temple",
    image_url: "/images/Meenakshi_Temple.png",
    description: "The Meenakshi Amman Temple in Madurai, dedicated to Goddess Meenakshi and Lord Sundareswarar, dates back to ancient Tamil civilization and flourished under the Nayaka dynasty in the 16th century. Its towering gopurams, adorned with thousands of colorful sculptures, narrate divine legends in vivid detail.",
    city: "Madurai",
    state: "Tamil Nadu",
    type: "Monument",
    significance: "A living temple and architectural gem, Meenakshi Temple symbolizes the heart of Tamil culture and Dravidian artistry. It continues to be a thriving spiritual hub, attracting millions of devotees and art admirers worldwide."
  },
  {
    id: 7,
    name: "Amer Fort (Amber Fort)",
    image_url: "/images/Amer_Fort.png",
    description: "Built in the 16th century by Raja Man Singh I, Amer Fort sits majestically on the Aravalli hills overlooking Maota Lake. Crafted from red sandstone and marble, it showcases ornate courtyards, mirror work, and intricate frescoes that blend Mughal and Rajput styles. The fort glows golden at sunrise, narrating Rajasthan’s royal legacy.",
    city: "Jaipur",
    state: "Rajasthan",
    type: "Monument",
    significance: "A testament to Rajput valor and elegance, Amer Fort is part of the UNESCO-listed Hill Forts of Rajasthan. It reflects India’s royal opulence, artistic mastery, and fusion of cultural influences that define Jaipur’s historical charm."
  },
  {
    id: 8,
    name: "Victoria Memorial",
    image_url: "/images/Victoria_Memorial.png",
    description: "Constructed between 1906 and 1921 in memory of Queen Victoria, this grand marble monument in Kolkata blends British and Mughal architectural styles. Surrounded by lush gardens and a reflecting pool, its galleries display paintings, artifacts, and relics from the colonial era.",
    city: "Kolkata",
    state: "West Bengal",
    type: "Monument",
    significance: "The Victoria Memorial is both a historical archive and a symbol of British colonial influence. Today, it stands as a museum of India’s transition from colonial rule to independence, representing cultural reflection and artistic heritage."
  }
];

const festivalsList = [
  {
    id: 101,
    name: "Diwali",
    image_url: "/images/Diwali.jpg",
    description: "Known as the Festival of Lights, Diwali celebrates the triumph of light over darkness and good over evil. Streets, homes, and temples illuminate with lamps and fireworks as families gather for feasts and prayers. It marks Lord Rama’s return to Ayodhya after defeating Ravana in the Ramayana.",
    type: "Festival",
    significance: "Diwali symbolizes prosperity, purity, and inner awakening. Beyond religion, it unites India in joy and renewal — inspiring the victory of hope, community bonding, and the pursuit of light in every heart."
  },
  {
    id: 102,
    name: "Holi",
    image_url: "/images/Holi.png",
    description: "Holi, the festival of colors, heralds the arrival of spring and celebrates love, laughter, and the triumph of good over evil. People smear colors, dance, and sing traditional songs, commemorating the legend of Prahlada’s devotion and Holika’s fall.",
    type: "Festival",
    significance: "It represents inclusivity, equality, and forgiveness — a vibrant reminder to let go of negativity and celebrate togetherness and joy."
  },
  {
    id: 103,
    name: "Onam",
    image_url: "/images/Onam.jpg",
    description: "Onam, Kerala’s grand harvest festival, celebrates the mythical return of King Mahabali. The festival is marked by floral carpets, snake boat races, traditional dances, and the grand Onam Sadhya feast.",
    type: "Festival",
    significance: "Onam embodies unity, gratitude, and cultural pride. It honors the spirit of equality and prosperity that defined Mahabali’s reign — a reminder of harmony between people and nature."
  },
  {
    id: 104,
    name: "Pongal",
    image_url: "/images/Pongal.jpg",
    description: "Pongal is a South Indian harvest festival where farmers express gratitude to the Sun God for agricultural abundance. The ritual of boiling milk and rice in new pots signifies prosperity and renewal.",
    type: "Festival",
    significance: "Pongal marks a spiritual and cultural thanksgiving — a celebration of nature’s generosity, unity in rural life, and respect for tradition."
  },
  {
    id: 105,
    name: "Durga Puja",
    image_url: "/images/Durga_Puja.png",
    description: "Durga Puja celebrates Goddess Durga’s victory over the demon Mahishasura. Streets of Bengal come alive with artistic pandals, idols, music, and rituals blending devotion and creativity.",
    type: "Festival",
    significance: "It signifies the power of good over evil, feminine divinity, and artistic expression. Durga Puja is not just a festival — it’s a cultural phenomenon celebrating community, art, and empowerment."
  },
  {
    id: 106,
    name: "Navaratri / Garba",
    image_url: "/images/Navaratri.png",
    description: "Navaratri is a nine-night festival dedicated to the Goddess Durga’s nine forms. In Gujarat and beyond, vibrant Garba and Dandiya dances bring communities together in joy and devotion.",
    type: "Festival",
    significance: "It represents feminine strength, spiritual awakening, and joy through cultural rhythm — a divine dance between devotion and celebration."
  },
  {
    id: 107,
    name: "Eid",
    image_url: "/images/Eid.png",
    description: "Eid marks the end of Ramadan, a month of fasting and reflection in Islam. Families come together for prayers, feasts, and acts of charity, spreading peace and unity.",
    type: "Festival",
    significance: "Eid embodies compassion, gratitude, and communal harmony — a universal reminder of kindness, humility, and togetherness."
  }
];

const artFormsList = [
  {
    id: 201,
    name: "Madhubani Art",
    image_url: "/images/Madhubani.png",
    description: "Originating in the Mithila region of Bihar, Madhubani art is a vivid folk painting tradition using natural dyes and intricate geometric patterns. Often painted on walls during festivals, it reflects themes from nature, mythology, and daily life.",
    type: "Art",
    location: "Mithila region, Bihar",
    significance: "A UNESCO-recognized art form, it showcases rural India’s creative storytelling and women’s empowerment through artistic expression."
  },
  {
    id: 202,
    name: "Warli Art",
    image_url: "/images/Warli.png",
    description: "Practiced by the Warli tribe of Maharashtra, this ancient art uses simple white patterns on mud backgrounds. Its motifs of humans, animals, and nature form a rhythmic representation of life and community.",
    type: "Art",
    location: "Sahyadri region, Maharashtra",
    significance: "Warli art preserves tribal simplicity, ecological harmony, and human connection with nature — an artistic bridge between culture and environment."
  },
  {
    id: 203,
    name: "Tanjore Art",
    image_url: "/images/tanjore.jpg",
    description: "Emerging in the 16th century under the Nayaka dynasty, Tanjore paintings are known for rich colors, gold leaf work, and depictions of Hindu deities. The art’s intricate detailing brings divine figures to life with grace and grandeur.",
    type: "Art",
    location: "Thanjavur (Tanjore), Tamil Nadu",
    significance: "Tanjore art reflects devotion and royal elegance, symbolizing South India’s spiritual artistry and cultural opulence."
  },
  {
    id: 204,
    name: "Pattachitra Art",
    image_url: "/images/pattachitra_art.jpg",
    description: "Pattachitra, from Odisha and West Bengal, is a traditional scroll painting form illustrating mythological tales of Lord Jagannath and other deities. Artists use natural pigments on cloth, preserving a storytelling tradition over centuries.",
    type: "Art",
    location: "Raghurajpur, Odisha and Nabadwip, West Bengal",
    significance: "This heritage art form merges narrative and devotion — a visual scripture that embodies cultural continuity and faith."
  },
  {
    id: 205,
    name: "Kalamkari Art",
    image_url: "/images/kalamkari_art.jpg",
    description: "Kalamkari, meaning ‘art with pen’, is a textile painting technique from Andhra Pradesh and Telangana. Using natural colors and fine brushwork, it depicts mythological scenes and floral motifs on cotton fabrics.",
    type: "Art",
    location: "Srikalahasti (Andhra Pradesh) & Machilipatnam (Telangana)",
    significance: "Kalamkari blends craftsmanship and spirituality — an art form where storytelling, religion, and design flow seamlessly together."
  },
  {
    id: 206,
    name: "Kathakali",
    image_url: "/images/Kathakali.jpg",
    description: "Kathakali is a classical dance-drama from Kerala combining acting, dance, and music. With elaborate makeup, colorful costumes, and expressive gestures, performers narrate epics like the Ramayana and Mahabharata.",
    type: "Art",
    location: "Kottayam & Kochi, Kerala",
    significance: "Kathakali represents the pinnacle of Indian theatrical tradition — merging devotion, discipline, and artistic grandeur in one mesmerizing performance."
  }
];
  const [selectedCategory, setSelectedCategory] = useState('monuments');
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const dataSource =
      selectedCategory === 'monuments' ? monumentsList :
      selectedCategory === 'festivals' ? festivalsList :
      artFormsList;
    const filtered = dataSource.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSuggestions(filtered);
    setShowSuggestions(true);
  }, [searchQuery, selectedCategory]);

  const renderCardGrid = () => {
    let list = [];
    if (selectedCategory === 'monuments') list = monumentsList;
    else if (selectedCategory === 'festivals') list = festivalsList;
    else list = artFormsList;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          marginTop: '1.5rem'
        }}
      >
        {list.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedInfo(item)}
            style={{
              borderRadius: '10px',
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              cursor: 'pointer',
              padding: '0',
              overflow: 'hidden',
              border: '1px solid #eee',
              transition: 'box-shadow 0.2s',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start'
            }}
          >
            <img
              src={item.image_url || '/images/placeholder.jpg'}
              alt={item.name}
              style={{
                width: '100%',
                height: '140px',
                objectFit: 'cover'
              }}
            />
            <div style={{ padding: '1rem' }}>
              <div style={{ fontWeight: 600, fontSize: '1.15rem', marginBottom: '0.3rem' }}>
                {item.name}
              </div>
              <div style={{ color: '#888', fontSize: '0.97rem' }}>
                {item.city || item.location ? `${item.city || item.location}${item.state ? ', ' + item.state : ''}` : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem', position: 'relative' }}>
      <h1 style={{ textAlign: 'center', color: '#00796b' }}>Explore Indian Heritage</h1>
      <p style={{ textAlign: 'center', marginBottom: '1rem', color: '#555' }}>
        Discover India's rich culture, monuments, festivals & art forms.
      </p>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{
          width: '100%',
          padding: '0.7rem 1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          marginBottom: '1rem'
        }}
      >
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>{cat.label}</option>
        ))}
      </select>

      {showSuggestions && suggestions.length > 0 && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 3rem)',
          left: 0,
          right: 0,
          maxHeight: '350px',
          overflowY: 'auto',
          background: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          zIndex: 999,
          padding: '0.5rem'
        }}>
          {suggestions.map(item => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                gap: '1rem',
                padding: '0.6rem',
                borderBottom: '1px solid #eee',
                cursor: 'pointer'
              }}
              onMouseDown={() => {
                setSelectedInfo(item);
                setSearchQuery(item.name);
                setShowSuggestions(false);
              }}
            >
              <img
                src={item.image_url || '/images/placeholder.jpg'}
                alt={item.name}
                style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 6 }}
              />
              <div>
                <div style={{ fontWeight: '600', color: '#00796b' }}>{item.name}</div>
                <small style={{ color: '#666' }}>{item.type} • {item.state || item.city}</small>
                <p style={{
                  margin: 0,
                  fontSize: '13px',
                  color: '#444',
                  maxWidth: 350,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reusable modal with video & animated text */}
      <Modal data={selectedInfo} onClose={() => setSelectedInfo(null)} />

      {!showSuggestions && !selectedInfo && renderCardGrid()}
    </div>
  );
}
