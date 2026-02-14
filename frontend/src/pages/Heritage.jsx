import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IndiaMap3D from '../components/IndiaMap3D';

export const monumentsData = [
  {
    id: 1,
    name: "Taj Mahal",
    type: "monuments",
    city: "Agra",
    state: "Uttar Pradesh",
    image: "/images/TajMahal.jpg",
    video: "/videos/tajmahal_background.mp4",
    description: "An immense mausoleum of white marble, built in Agra between 1631 and 1648 by order of the Mughal emperor Shah Jahan in memory of his favourite wife, the Taj Mahal is the jewel of Muslim art in India and one of the universally admired masterpieces of the world's heritage.",
    history: " Commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal, it also houses the tomb of Shah Jahan himself. The tomb is the centerpiece of a 17-hectare (42-acre) complex, which includes a mosque and a guest house, and is set in formal gardens bounded on three sides by a crenellated wall. Construction of the mausoleum was essentially completed in 1643, but work continued on other phases of the project for another 10 years. The Taj Mahal complex is believed to have been completed in its entirety in 1653 at a cost estimated at the time to be around 32 million rupees, which in 2020 would be approximately 70 billion rupees (about U.S. $1 billion).",
    cinematicFacts: [
      "Did you know? The Taj Mahal changes color depending on the light. It appears pinkish in the morning, milky white in the evening, and golden at night when lit by the moon.",
      "Smart Architecture: The four minarets tilt slightly outwards. This was done so that if they ever collapsed during an earthquake, they would fall away from the main tomb, keeping it safe!",
      "Optical Illusions: The calligraphy on the Great Gate gets larger as it goes up, so it looks perfectly uniform when viewed from the ground."
    ],
    mythology: "A longstanding myth holds that Shah Jahan planned a mausoleum to be built in black marble as a Black Taj Mahal across the Yamuna river. The idea originates from fanciful writings of Jean-Baptiste Tavernier, a European traveller who visited Agra in 1665. It was suggested that his son Aurangzeb overthrew him before it could be built. Ruins of blackened marble across the river in Mehtab Bagh, seemed to support this legend, but excavations in the 1990s proved they were discolored white stones.",
    architecture: "The Taj Mahal incorporates and expands on design traditions of Persian and earlier Mughal architecture. Specific inspiration came from successful Timurid and Mughal buildings including the Gur-e Amir (the tomb of Timur, progenitor of the Mughal dynasty, in Samarkand), Humayun's Tomb, Itmad-Ud-Daulah's Tomb (sometimes called the Baby Taj), and Shah Jahan's own Jama Masjid in Delhi. While earlier Mughal buildings were primarily constructed of red sandstone, Shah Jahan promoted the use of white marble inlaid with semi-precious stones. Buildings under his patronage reached new levels of refinement.",
    position: { top: '38%', left: '49%' }
  },
  {
    id: 2,
    name: "Qutub Minar",
    type: "monuments",
    city: "Delhi",
    state: "Delhi",
    image: "/images/Qutub_Minar.jpg",
    video: "/videos/qutub_minar.mp4",
    description: "The Qutub Minar is a towering 73-meter high minaret that forms part of the Qutb complex, a UNESCO World Heritage Site in the Mehrauli area of Delhi. It is an exquisite example of Indo-Islamic Afghan architecture and one of the most visited tourist spots in India.",
    history: "Inspired by the Minaret of Jam in Afghanistan, Qutb ud-Din Aibak, the founder of the Delhi Sultanate, started construction of the Qutub Minar's first storey around 1192. In 1220, his successor and son-in-law Iltutmish completed a further three storeys. In 1369, a lightning strike destroyed the top storey. Firoz Shah Tughlaq replaced the damaged storey and added one more. Sher Shah Suri also added an entrance to this tower while he was the emperor and Humayun was in exile.",
    cinematicFacts: [
      "Built on Ancient Ruins: The complex was built over the ruins of 27 ancient Jain temples, and you can still see the original intricate carvings on some of the pillars.",
      "The Leaning Tower of Delhi: The Minar leans about 65 cm from the vertical, but don't worry—it's been monitored and is considered safe!",
      "A Tale of Two Stones: Look closely at the top two stories—they are made of white marble, unlike the bottom three which are red sandstone, showing a change in rulers."
    ],
    architecture: "The minaret is constructed with fluted red sandstone and marble. It has a diameter of 14.32 metres (47 feet) at the base and 2.75 metres (9 feet) at the peak. Inside the tower, a circular staircase with 379 steps leads to the top. The tower contains five tapering storeys. The lowest three storeys are made of red sandstone; the fourth and fifth storeys are of marble and sandstone. The tower is decorated with obscure inscriptions and intricate carvings.",
    position: { top: '33%', left: '47%' }
  },
  {
    id: 3,
    name: "Red Fort",
    type: "forts",
    city: "Delhi",
    state: "Delhi",
    image: "/images/RedFort.jpg",
    video: "/videos/redfort_background.mp4",
    description: "The Red Fort is a historic fort in the city of Delhi (in Old Delhi) in India that served as the main residence of the Mughal Emperors. Emperor Shah Jahan commissioned construction of the Red Fort on 12 May 1638, when he decided to shift his capital from Agra to Delhi.",
    history: "Constructed in 1648 by the fifth Mughal Emperor Shah Jahan as the palace of his fortified capital Shahjahanabad, the Red Fort is named for its massive enclosing walls of red sandstone. The imperial apartments consist of a row of pavilions, connected by a water channel known as the Stream of Paradise (Nahr-i-Bhisht). The fort complex is considered to represent the zenith of Mughal creativity under Shah Jahan, and although the palace was planned according to Islamic prototypes, each pavilion contains architectural elements typical of Mughal buildings that reflect a fusion of Persian, Timurid and Hindu traditions.",
    cinematicFacts: [
      "The Red Fort was originally white! It was made of limestone, but when the stone started chipping off, the British painted it red.",
      "The Koh-i-Noor diamond was once part of the Peacock Throne housed right here in the Diwan-i-Khas before it was looted by Nadir Shah.",
      "A water channel called the 'Stream of Paradise' (Nahr-i-Bhisht) flows through the center of the pavilions, connecting them all."
    ],
    mythology: "It is believed that the Koh-i-Noor diamond was once part of the Peacock Throne, which was housed in the Diwan-i-Khas of the Red Fort. Nadir Shah, the Persian conqueror, looted the fort in 1739 and took the diamond and the throne with him. Legends also speak of secret tunnels connecting the Red Fort to other monuments in Delhi, used for royal escapes.",
    architecture: "The Red Fort's architecture represents a seamless fusion of Persian, Timurid, and Indian styles. The fort has two main gates: the Delhi Gate and the Lahore Gate. The Lahore Gate is the main entrance, leading to a long covered bazaar known as the Chatta Chowk. The fort's innovative architectural style, including its garden design, influenced later buildings and gardens in Delhi, Rajasthan, Punjab, Kashmir, Braj, Rohilkhand and elsewhere.",
    position: { top: '31%', left: '48%' }
  },
  {
    id: 4,
    name: "Gateway of India",
    type: "monuments",
    city: "Mumbai",
    state: "Maharashtra",
    image: "/images/Gateway.png",
    video: "/videos/gateway_of_india.mp4",
    description: "The Gateway of India is an arch-monument built in the early 20th century in the city of Mumbai only to commemorate the landing of King-Emperor George V and Queen-Empress Mary at Apollo Bunder on their visit to India in 1911.",
    history: "The foundation stone was laid in March 1911. The final design of George Wittet was sanctioned in 1914 and the construction of the monument was completed in 1924. The Gateway was later the ceremonial entrance to India for Viceroys and the new Governors of Bombay. It served to allow entry and access to India. The last British troops to leave India following the country's independence, the First Battalion of the Somerset Light Infantry, passed through the Gateway on their way out in a ceremony on 28 February 1948.",
    cinematicFacts: [
      "A Symbolic Exit: While built to welcome the King, it ironically became the site where the last British troops marched out of India in 1948, marking the end of colonial rule.",
      "The Taj Mahal of Mumbai: It is often the first landmark visible to visitors arriving by sea, earning it its nickname.",
      "Hidden Design: The central dome is 48 feet in diameter and 83 feet high, constructed with yellow basalt and reinforced concrete—a marvel of its time."
    ],
    architecture: "The structural design of the Gateway of India is constituted of a large arch, with a height of 26 metres (85 feet). The monument is built in yellow basalt and indissoluble concrete. The structural plan of Gateway of India is designed in the Indo-Saracenic style. One can also find traces of Muslim architectural styles incorporated in the structure of the grandiose edifice. The central dome is about 48 feet in diameter, with a total height of 83 feet.",
    position: { top: '56%', left: '33%' }
  },
  {
    id: 5,
    name: "Meenakshi Temple",
    type: "temples",
    city: "Madurai",
    state: "Tamil Nadu",
    image: "/images/Meenakshi_Temple.png",
    video: "/videos/meenakshi_temple.mp4",
    description: "Arulmigu Meenakshi Sundareshwarar Temple is a historic Hindu temple located on the southern bank of the Vaigai River in the temple city of Madurai, Tamil Nadu, India. It is dedicated to Meenakshi, a form of Parvati, and her consort, Sundareshwar, a form of Shiva.",
    history: "Though the temple has historic roots, the majority of the present campus structure was rebuilt after the 14th century, further repaired, renovated and expanded in the 17th century by Tirumala Nayaka. In the early 14th century, the armies of Delhi Sultanate led by Malik Kafur looted the temple, looted it of its valuables and destroyed the Madurai temple town along with many other temple towns of South India. The contemporary temple is the result of rebuilding efforts started by the Vijayanagara Empire rulers who rebuilt the core and reopened the temple.",
    cinematicFacts: [
      "A City Within a Temple: The complex creates a massive mandala-shaped structure when viewed from above and houses an estimated 33,000 sculptures!",
      "The Hall of 1000 Pillars: It actually contains 985 pillars, but each one is famously carved from a single block of stone and produces a different musical note when tapped.",
      "Goddess First: Unusually for major Hindu temples, the primary deity here is the Goddess Meenakshi, not her consort Shiva, reflecting the region's matrilineal heritage."
    ],
    architecture: "The temple is the geographic and ritual center of the ancient city of Madurai and one of the largest temple complexes in Tamil Nadu. The temple complex is divided into a number of concentric quadrangular enclosures contained by high masonry walls. It houses 14 gopurams (gateway towers), ranging from 45–50m in height. The southern gopura is the tallest at 51.9 metres (170 ft). The complex has numerous sculpted pillared halls such as Ayirakkal (1000 pillar hall), Kilikoondu-mandapam, Golu-mandapam and Pudu-mandapam.",
    position: { top: '82%', left: '46%' }
  },
  {
    id: 6,
    name: "Amer Fort",
    type: "forts",
    city: "Jaipur",
    state: "Rajasthan",
    image: "/images/Amer_Fort.png",
    video: "/videos/amer_fort.mp4",
    description: "Amer Fort is a fort located in Amer, Rajasthan, India. Amer is a town with an area of 4 square kilometres (1.5 sq mi) located 11 kilometres (6.8 mi) from Jaipur, the capital of Rajasthan. The town of Amer and the Amber Fort were originally built by Raja Man Singh.",
    history: "Raja Man Singh I began construction in 1592. The fort saw improvements and additions by successive rulers over the next 150 years. Jai Singh I notably expanded it. In 1727, the capital was moved from Amer to Jaipur by Sawai Jai Singh II. The fort fell into slight disrepair but has been remarkably preserved as a key example of Rajput military hill architecture.",
    cinematicFacts: [
      "The Secret Tunnel: A hidden subterranean tunnel connects Amer Fort to Jaigarh Fort over 2 km away, designed as an escape route for the royal family during times of war.",
      "The Magic Flower: Carved on a pillar in the Sheesh Mahal is a 'magic flower' fresco that reveals seven different images—fishtail, lotus, hooded cobra, elephant trunk, lion's tail, cob of corn, and scorpion—depending on how you hide parts of it with your hand.",
      "A Palace of Mirrors: The Sheesh Mahal is covered in thousands of concave mirrors. It's said that a single candle could light up the entire hall, mimicking a star-lit sky!"
    ],
    architecture: "Opulent palace laid out on four levels, each with a courtyard. It consists of the Diwan-e-Aam, or 'Hall of Public Audience', the Diwan-e-Khas, or 'Hall of Private Audience', the Sheesh Mahal (mirror palace), or Jai Mandir, and the Sukh Niwas where a cool climate is artificially created by winds that blow over a water cascade within the palace. The palace lived in by the Rajput Maharajas and their families.",
    position: { top: '37%', left: '40%' }
  },
  {
    id: 7,
    name: "Sun Temple",
    type: "temples",
    city: "Konark",
    state: "Odisha",
    image: "/images/Konark.png",
    video: "/videos/sun_temple.mp4",
    description: "Konark Sun Temple is a 13th-century CE Sun temple at Konark about 35 kilometres (22 mi) northeast from Puri on the coastline of Odisha, India. The temple is attributed to king Narasimhadeva I of the Eastern Ganga Dynasty about 1250 CE.",
    history: "Dedicated to the Hindu Sun God Surya, what remains of the temple complex has the appearance of a 100-foot (30 m) high chariot with immense wheels and horses, all carved from stone. By the late 17th century, the temple had fallen into disuse and was damaged by various causes, including invasions and natural elements. It was rediscovered in the 19th century and conservation efforts began under the British.",
    cinematicFacts: [
      "A Giant Sundial: The temple is designed as a colossal chariot with 24 wheels. These aren't just decorative—they function as accurate sundials, telling time to the exact minute by the shadow cast on the spokes!",
      "Magnetic Mystery: Legend says the main idol used to float in mid-air due to a massive magnet at the top, which was later removed by Portuguese sailors because it disrupted their compasses.",
      "Seven Horses: The seven horses pulling the chariot represent the seven days of the week, while the 12 pairs of wheels symbolize the 12 months of the year."
    ],
    mythology: "Legend has it that the temple had a massive magnet at the top and the main idol was suspended in mid-air due to the magnetic arrangement. This magnet was supposedly removed by Portuguese sailors because it disrupted their compasses. Another myth states that the temple was built by Samba, the son of Lord Krishna, to cure his leprosy by worshipping the Sun God.",
    architecture: "Designed as a massive chariot mounted on 24 wheels, each about 10 feet in diameter, and drawn by seven mighty horses. The wheels function as sundials which can be used to calculate time accurately to a minute. The temple is known for its intricate erotic sculptures (Maithuna figures) and scenes from daily life, war, and courtly activities. It is a masterpiece of Kalinga architecture.",
    position: { top: '52%', left: '58%' }
  },
  {
    id: 8,
    name: "Victoria Memorial",
    type: "monuments",
    city: "Kolkata",
    state: "West Bengal",
    image: "/images/Victoria_Memorial.png",
    video: "/videos/victoria_memorial.mp4",
    description: "The Victoria Memorial is a large marble building in Central Kolkata, which was built between 1906 and 1921. It is dedicated to the memory of Queen Victoria, then Empress of India, and is now a museum and tourist destination under the auspices of the Ministry of Culture.",
    history: "Following the death of Queen Victoria in January 1901, Lord Curzon, the Viceroy of India, suggested the creation of a fitting memorial. The Prince of Wales, later King George V, laid the foundation stone on 4 January 1906, and it was opened to the public in 1921. The construction of the Victoria Memorial was delayed by Curzon's departure from India in 1905 and subsequent loss of enthusiasm for the project.",
    cinematicFacts: [
      "The Fairy Angel: The 16-foot bronze Angel of Victory atop the dome isn't fixed—it's a weather vane that rotates with the wind! It weighs 3 tonnes.",
      "Funded by the People: It wasn't built by the British government alone; money was raised by the 'Princes and People of India' in response to Lord Curzon's appeal.",
      "Same Marble as the Taj: It was built using the same Makrana marble from Rajasthan that was used to build the Taj Mahal, intended to rival its beauty."
    ],
    mythology: "A popular urban legend in Kolkata is that the Angel of Victory atop the central dome rotates on its axis when a happy event occurs in the city, or to signal good weather. In reality, it acts as a weather vane. Another story suggests there are secret underground passages that were used by the British to transport prisoners, though no concrete evidence has been found accessible to the public.",
    architecture: "The architect was William Emerson, president of the Royal Institute of British Architects. The design is in the Indo-Saracenic revivalist style which uses a mixture of British and Mughal elements with Venetian, Egyptian, Deccani and Islamic architectural influences. The building is constructed of white Makrana marble. The gardens were designed by Lord Redesdale and David Prain.",
    position: { top: '48%', left: '62%' }
  },
  {
    id: 9,
    name: "Ellora Caves",
    type: "caves",
    city: "Aurangabad",
    state: "Maharashtra",
    image: "/images/Ellora.jpg",
    video: "/videos/ellora_caves.mp4",
    description: "Ellora is a UNESCO World Heritage Site located in the Aurangabad district of Maharashtra, India. It is one of the largest rock-cut monastery-temple cave complexes in the world, featuring Hindu, Buddhist and Jain monuments, and artwork, dating from the 600–1000 CE period.",
    history: "These caves were excavated during the Rashtrakuta and Yadava dynasties. The most famous is Cave 16, the Kailasa temple, a chariot shaped monument dedicated to Shiva. It is the largest single monolithic rock excavation in the world. The excavations are vertically excavated in the Charanandri hills. The complex shows a spirit of co-existence and religious tolerance characteristic of ancient India.",
    cinematicFacts: [
      "Carved from Top to Bottom: The Kailasa Temple (Cave 16) is a monolithic wonder. Unlike standard structures built up from the ground, this was carved out of a single rock cliff from the top down!",
      "A 200,000 Tonne Removal: An estimated 200,000 tonnes of basalt rock were scooped out over centuries to create these intricate caves.",
      "Religious Harmony: It is one of the rare sites where Hindu, Buddhist, and Jain temples were built side-by-side, showcasing the religious tolerance of ancient India."
    ],
    architecture: "The caves present a seamless integration of architecture and sculpture. Cave 16 (Kailasa) covers twice the area of the Parthenon in Athens. It features a gateway, assembly hall, multi-storey main temple, and shrines, all carved out of one single rock. The Vishvakarma Cave (Cave 10), also known as the Carpenter's Cave, features a ceiling that looks like wooden beams but is entirely stone.",
    position: { top: '53%', left: '37%' }
  },
  {
    id: 10,
    name: "Ajanta Caves",
    type: "caves",
    city: "Aurangabad",
    state: "Maharashtra",
    image: "/images/Ajanta.jpg",
    video: "/videos/ajanta_caves.mp4",
    description: "The Ajanta Caves are approximately 30 rock-cut Buddhist cave monuments which date from the 2nd century BCE to about 480 CE in the Aurangabad district of Maharashtra state of India. The caves include paintings and rock-cut sculptures described as among the finest surviving examples of ancient Indian art.",
    history: "The caves were built in two phases, the first phase starting around the 2nd century BCE and the second occurring from 400–650 CE, according to older accounts, or in a brief period of 460–480 CE according to later scholarship. The site was a protected retreat for monks during the monsoon season and a resting place for merchants and pilgrims. They fell into disuse and were covered by jungle until accidentally 'rediscovered' by a British officer on a tiger hunt in 1819.",
    cinematicFacts: [
      "Rediscovered by Accident: These caves lay hidden in the jungle for centuries until 1819, when British officer John Smith stumbled upon them while hunting a tiger.",
      "Glowing Paintings: The artists used a special technique using local organic matte, which allowed the paintings to retain a luminescent quality even in the dim cave light.",
      "Ancient Air Conditioning: The caves are positioned in a horseshoe shape along a gorge, designed to catch natural wind currents that keep the interiors cool even in summer."
    ],
    architecture: "The caves are carved into a horseshoe-shaped cliff along the Waghora River. They consist of Chaitya grihas (prayer halls) and Viharas (monasteries). The architecture mimics wooden construction of the time, with stone carved to look like timber beams and rafters. The main focus, however, is the interior mural painting, created using a tempera technique on a plaster surface.",
    position: { top: '51%', left: '38%' }
  }
];

const categories = [
  { id: "monuments", label: "Monuments", icon: "🏛️" },
  { id: "temples", label: "Temples", icon: "🛕" },
  { id: "caves", label: "Caves", icon: "🪨" },
  { id: "forts", label: "Forts", icon: "🏰" }
];

export default function Heritage() {
  const [selectedCategory, setSelectedCategory] = useState("monuments");
  const [selectedMonument, setSelectedMonument] = useState(null);
  const [activeTab, setActiveTab] = useState("history");
  const [showVideo, setShowVideo] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  // Reset fact index when video opens or monument changes
  React.useEffect(() => {
    setCurrentFactIndex(0);
  }, [showVideo, selectedMonument]);

  // Filter monuments based on category
  const filteredMonuments = monumentsData.filter(m => m.type === selectedCategory);

  // Auto-select first item when category changes
  React.useEffect(() => {
    if (filteredMonuments.length > 0) {
      setSelectedMonument(filteredMonuments[0]);
    } else {
      setSelectedMonument(null);
    }
  }, [selectedCategory]);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: '#0a1628'
    }}>
      {/* 3D Map Component */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1
      }}>
        <IndiaMap3D
          monuments={filteredMonuments}
          selectedId={selectedMonument?.id}
          onSelect={setSelectedMonument}
        />
      </div>

      {/* Left Sidebar - Categories */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '25px',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 18px',
              borderRadius: '10px',
              border: selectedCategory === cat.id ? '2px solid #ffd700' : '1px solid rgba(255,255,255,0.08)',
              background: selectedCategory === cat.id ? 'rgba(255, 215, 0, 0.12)' : 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)',
              color: selectedCategory === cat.id ? '#ffd700' : '#94a3b8',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: selectedCategory === cat.id ? '600' : '400',
              transition: 'all 0.25s',
              minWidth: '150px'
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Right Panel - AI Guide */}
      <div style={{
        position: 'absolute',
        top: '90px',
        right: '20px',
        bottom: '20px',
        width: '600px',
        background: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(16px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 215, 0, 0.15)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)'
      }}>
        {/* Monument Info */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <h2 style={{
            fontFamily: 'Playfair Display',
            fontSize: '2.4rem',
            color: '#f8fafc',
            marginBottom: '8px',
            lineHeight: 1.2
          }}>
            {selectedMonument?.name}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            📍 <span style={{ color: '#cbd5e1' }}>{selectedMonument?.city}, {selectedMonument?.state}</span>
          </p>
          <p style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '1.15rem', marginBottom: '24px', textAlign: 'justify' }}>
            {selectedMonument?.description}
          </p>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            {[
              { id: 'history', label: 'History', icon: '🏛️' },
              { id: 'mythology', label: 'Mythology', icon: '🕉️' },
              { id: 'architecture', label: 'Architecture', icon: '🏗️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '12px 8px',
                  borderRadius: '12px',
                  border: 'none',
                  background: activeTab === tab.id ? 'rgba(255, 215, 0, 0.15)' : 'rgba(30, 41, 59, 0.6)',
                  color: activeTab === tab.id ? '#ffd700' : '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: activeTab === tab.id ? '600' : '500',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.2s',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(255, 215, 0, 0.1)' : 'none'
                }}
              >
                <span style={{ fontSize: '1.4rem' }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{
            background: 'rgba(30, 41, 59, 0.4)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
            borderLeft: '4px solid #ffd700',
            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)'
          }}>
            <p style={{ color: '#e2e8f0', fontSize: '1.1rem', lineHeight: 1.8, margin: 0, textAlign: 'justify' }}>
              {selectedMonument?.[activeTab]}
            </p>
          </div>

          {/* Image Preview */}
          <div
            onClick={() => {
              if (selectedMonument?.video) {
                setShowVideo(true);
              }
            }}
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
              cursor: selectedMonument?.video ? 'pointer' : 'default'
            }}>
            <img
              src={selectedMonument?.image}
              alt={selectedMonument?.name}
              style={{ width: '100%', height: '220px', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(8px)',
              padding: '6px 14px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              {selectedMonument?.video ? '🎥 Format: Video Tour' : '📷 View Panoramic'}
            </div>
            {selectedMonument?.video && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60px',
                height: '60px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)',
                border: '2px solid rgba(255,255,255,0.8)'
              }}>
                <div style={{
                  width: 0,
                  height: 0,
                  borderTop: '12px solid transparent',
                  borderBottom: '12px solid transparent',
                  borderLeft: '20px solid white',
                  marginLeft: '4px'
                }} />
              </div>
            )}
          </div>
        </div>

        {/* Footer - Explore Button */}
        <div style={{
          padding: '20px 24px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(15, 23, 42, 0.8)'
        }}>
          <Link
            to="/explore-3d"
            state={{ monumentId: selectedMonument?.id, monumentName: selectedMonument?.name }}
            style={{ textDecoration: 'none' }}
          >
            <button style={{
              width: '100%',
              padding: '16px',
              borderRadius: '30px',
              border: 'none',
              background: 'linear-gradient(135deg, #ffd700, #bfa100)',
              color: '#0f172a',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 4px 20px rgba(255, 215, 0, 0.3)',
              transition: 'transform 0.2s',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Start 3D Tour
              <span style={{
                background: 'rgba(0,0,0,0.15)',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '0.8rem'
              }}>
                🎮
              </span>
            </button>
          </Link>
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.8rem', marginTop: '12px', marginBottom: 0 }}>
            Powered by BharatVerse GenAI Engine This content is for verification purpose
          </p>
        </div>
      </div>

      {/* Cinematic Video Modal */}
      {showVideo && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'black',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.5s ease-out'
        }}>
          {/* Close Button */}
          <button
            onClick={() => setShowVideo(false)}
            style={{
              position: 'absolute',
              top: '30px',
              right: '30px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              cursor: 'pointer',
              zIndex: 3002,
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 0, 0, 0.6)';
              e.target.style.transform = 'rotate(90deg)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'rotate(0deg)';
            }}
          >
            ✕
          </button>

          {/* Video Background */}
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 3000
          }}>
            <video
              src={selectedMonument?.video}
              autoPlay
              controls={false}
              loop
              muted={false}
              onCanPlay={(e) => { e.target.playbackRate = 0.5; }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.5) contrast(1.1)'
              }}
            />
          </div>

          {/* Text Overlay - Side by Side Content */}
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 3001,
            display: 'flex',
            alignItems: 'center',
            padding: '50px'
          }}>
            {/* Left Content */}
            <div style={{
              flex: '0 0 45%', // Takes up 45% width
              opacity: 0,
              transform: 'translateY(20px)',
              animation: 'slideUpFade 1s 0.5s forwards',
              paddingRight: '40px'
            }}>
              <h1 style={{
                fontFamily: 'Playfair Display',
                fontSize: '4rem',
                color: '#ffd700',
                marginBottom: '20px',
                textShadow: '0 4px 20px rgba(0,0,0,0.8)'
              }}>
                {selectedMonument?.name}
              </h1>
              <div style={{
                height: '4px',
                width: '100px',
                background: '#ffd700',
                marginBottom: '30px'
              }} />
              <p style={{
                fontFamily: 'Inter',
                fontSize: '1.2rem',
                lineHeight: '1.8',
                color: '#f1f5f9',
                textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                textAlign: 'justify',
                minHeight: '100px',
                transition: 'all 0.5s'
              }}>
                {Array.isArray(selectedMonument?.cinematicFacts)
                  ? selectedMonument.cinematicFacts[currentFactIndex]
                  : (selectedMonument?.cinematicFacts || selectedMonument?.history)}
              </p>

              {/* Next Fact Arrow */}
              {Array.isArray(selectedMonument?.cinematicFacts) && (
                <div
                  onClick={() => setCurrentFactIndex(prev => (prev + 1) % selectedMonument.cinematicFacts.length)}
                  style={{
                    marginTop: '20px',
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    opacity: 0.9,
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
                >
                  <span style={{
                    color: '#ffd700',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    letterSpacing: '2px',
                    textTransform: 'uppercase'
                  }}>
                    Next Fact
                  </span>
                  <div style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 215, 0, 0.4)',
                    background: 'rgba(255, 215, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffd700',
                    fontSize: '1.2rem',
                    animation: 'bounce 2s infinite'
                  }}>
                    ↓
                  </div>
                </div>
              )}

              <div style={{ marginTop: '40px', display: 'flex', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.9rem', letterSpacing: '2px' }}>LOCATION</span>
                  <span style={{ color: 'white', fontSize: '1.1rem' }}>{selectedMonument?.city}</span>
                </div>
                <div style={{ width: '1px', background: 'rgba(255,255,255,0.3)' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.9rem', letterSpacing: '2px' }}>ERA</span>
                  <span style={{ color: 'white', fontSize: '1.1rem' }}>Mughal Empire</span>
                </div>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUpFade {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
              40% {transform: translateY(10px);}
              60% {transform: translateY(5px);}
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
