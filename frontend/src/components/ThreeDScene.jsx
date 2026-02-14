import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';

// Materials
const MARBLE_WHITE = "#f2f2f2";
const GOLD_FINIAL = "#ffd700";
const WATER_BLUE = "#4fc3f7";
const RED_SANDSTONE = "#b95c50";
const STONE_GRAY = "#808080";
const YELLOW_BASALT = "#d4af37";

// --- TAJ MAHAL COMPONENTS ---
function TajMahal({ onObjectClick }) {
  const Minaret = ({ position, onClick }) => {
    const [hovered, setHover] = useState(false);
    return (
      <group position={position}>
        <mesh
          position={[0, 2.5, 0]}
          onClick={(e) => { e.stopPropagation(); onClick("taj_minaret"); }}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
        >
          <cylinderGeometry args={[0.15, 0.25, 5, 16]} />
          <meshStandardMaterial color={hovered ? "#e0e0e0" : MARBLE_WHITE} />
        </mesh>
        <mesh position={[0, 5.1, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color={MARBLE_WHITE} />
        </mesh>
      </group>
    );
  };

  const MainMausoleum = ({ onClick }) => {
    const [hovered, setHover] = useState(false);
    return (
      <group onClick={(e) => { e.stopPropagation(); onClick("taj_main_dome"); }}>
        <mesh
          position={[0, 1.5, 0]}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
        >
          <boxGeometry args={[3, 3, 3]} />
          <meshStandardMaterial color={hovered ? "#fff" : MARBLE_WHITE} />
        </mesh>
        <mesh position={[0, 3, 0]} scale={[1, 1.2, 1]}>
          <sphereGeometry args={[1.6, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.8]} />
          <meshStandardMaterial color={hovered ? "#fff" : MARBLE_WHITE} />
        </mesh>
        <mesh position={[0, 5, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
          <meshStandardMaterial color={GOLD_FINIAL} />
        </mesh>
      </group>
    );
  };

  return (
    <group position={[0, -1, 0]}>
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[10, 0.5, 10]} />
        <meshStandardMaterial color={MARBLE_WHITE} />
      </mesh>
      <MainMausoleum onClick={onObjectClick} />
      <Minaret position={[-4.5, 0, -4.5]} onClick={onObjectClick} />
      <Minaret position={[4.5, 0, -4.5]} onClick={onObjectClick} />
      <Minaret position={[-4.5, 0, 4.5]} onClick={onObjectClick} />
      <Minaret position={[4.5, 0, 4.5]} onClick={onObjectClick} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 8]} onClick={(e) => { e.stopPropagation(); onClick("taj_pool"); }}>
        <planeGeometry args={[2, 10]} />
        <meshStandardMaterial color={WATER_BLUE} roughness={0.1} metalness={0.8} />
      </mesh>
    </group>
  );
}

// --- QUTUB MINAR ---
function QutubMinar({ onObjectClick }) {
  return (
    <group position={[0, -2, 0]}>
      {/* Base */}
      <mesh position={[0, 0, 0]} onClick={() => onObjectClick("qutub_base")}>
        <cylinderGeometry args={[2, 2.5, 1, 32]} />
        <meshStandardMaterial color={RED_SANDSTONE} />
      </mesh>
      {/* Tower segments */}
      <mesh position={[0, 3, 0]} onClick={() => onObjectClick("qutub_tower")}>
        <cylinderGeometry args={[1.5, 2, 5, 32]} />
        <meshStandardMaterial color={RED_SANDSTONE} />
      </mesh>
      <mesh position={[0, 6, 0]}>
        <cylinderGeometry args={[1.2, 1.5, 4, 32]} />
        <meshStandardMaterial color={RED_SANDSTONE} />
      </mesh>
      <mesh position={[0, 8.5, 0]}>
        <cylinderGeometry args={[0.9, 1.2, 3, 32]} />
        <meshStandardMaterial color="#f0f0f0" /> {/* Marble Top */}
      </mesh>
      {/* Balconies */}
      {[5.5, 8.0, 10.0].map((y, i) => (
        <mesh key={i} position={[0, y - 2.5, 0]}>
          <torusGeometry args={[1.6 - (i * 0.3), 0.1, 16, 32]} />
          <meshStandardMaterial color={RED_SANDSTONE} />
        </mesh>
      ))}
    </group>
  );
}

// --- RED FORT ---
function RedFort({ onObjectClick }) {
  return (
    <group position={[0, -2, 0]}>
      {/* Main Wall */}
      <mesh position={[0, 2, 0]} onClick={() => onObjectClick("red_fort_wall")}>
        <boxGeometry args={[12, 4, 0.5]} />
        <meshStandardMaterial color={RED_SANDSTONE} />
      </mesh>
      {/* Gate Towers */}
      <mesh position={[-2, 3, 0.5]}>
        <cylinderGeometry args={[0.8, 0.8, 5, 8]} />
        <meshStandardMaterial color={RED_SANDSTONE} />
      </mesh>
      <mesh position={[-2, 6, 0.5]}>
        <sphereGeometry args={[0.8]} />
        <meshStandardMaterial color={MARBLE_WHITE} />
      </mesh>
      <mesh position={[2, 3, 0.5]}>
        <cylinderGeometry args={[0.8, 0.8, 5, 8]} />
        <meshStandardMaterial color={RED_SANDSTONE} />
      </mesh>
      <mesh position={[2, 6, 0.5]}>
        <sphereGeometry args={[0.8]} />
        <meshStandardMaterial color={MARBLE_WHITE} />
      </mesh>
      {/* Entrance Arch */}
      <mesh position={[0, 1.5, 0.6]}>
        <boxGeometry args={[2, 3, 0.5]} />
        <meshStandardMaterial color="#3e2723" />
      </mesh>
    </group>
  );
}

// --- GATEWAY OF INDIA ---
function GatewayOfIndia({ onObjectClick }) {
  return (
    <group position={[0, -1, 0]} onClick={() => onObjectClick("gateway_structure")}>
      <mesh position={[-3, 4, 0]}>
        <boxGeometry args={[2, 8, 2]} />
        <meshStandardMaterial color={YELLOW_BASALT} />
      </mesh>
      <mesh position={[3, 4, 0]}>
        <boxGeometry args={[2, 8, 2]} />
        <meshStandardMaterial color={YELLOW_BASALT} />
      </mesh>
      {/* Arch Top */}
      <mesh position={[0, 7, 0]}>
        <boxGeometry args={[8, 2, 2]} />
        <meshStandardMaterial color={YELLOW_BASALT} />
      </mesh>
      {/* Dome */}
      <mesh position={[0, 8.5, 0]}>
        <sphereGeometry args={[1.5, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={YELLOW_BASALT} />
      </mesh>
    </group>
  );
}

// --- GENERIC TEMPLE (Meenakshi / Sun / Amer) ---
function GenericTemple({ color = "#d4af37", onObjectClick }) {
  return (
    <group position={[0, -2, 0]} onClick={() => onObjectClick("temple_main")}>
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[4, 3, 4]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Gopuram / Shikhara */}
      <mesh position={[0, 5, 0]}>
        <coneGeometry args={[2.5, 6, 4]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 8, 0]}>
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial color={GOLD_FINIAL} />
      </mesh>
    </group>
  );
}

// --- VICTORIA MEMORIAL ---
function VictoriaMemorial({ onObjectClick }) {
  return (
    <group position={[0, -1, 0]} onClick={() => onObjectClick("victoria_main")}>
      {/* Main Base */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[8, 3, 6]} />
        <meshStandardMaterial color={MARBLE_WHITE} />
      </mesh>
      {/* Central Dome */}
      <mesh position={[0, 4.5, 0]}>
        <sphereGeometry args={[2.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={MARBLE_WHITE} />
      </mesh>
      {/* Angel */}
      <mesh position={[0, 7.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
}

// --- CAVES ---
function CaveModel({ onObjectClick }) {
  return (
    <group position={[0, 0, 0]} onClick={() => onObjectClick("cave_entrance")}>
      {/* Mountain Face */}
      <mesh position={[0, 2, -2]}>
        <boxGeometry args={[12, 6, 4]} />
        <meshStandardMaterial color={STONE_GRAY} />
      </mesh>
      {/* Entrance Cuts */}
      {[-3, 0, 3].map((x, i) => (
        <mesh key={i} position={[x, 1, 0.1]}>
          <boxGeometry args={[1.5, 2.5, 0.5]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}
    </group>
  );
}


export default function ThreeDScene({ onObjectClick, monumentId }) {
  // Select which model to render
  const renderModel = () => {
    switch (parseInt(monumentId)) {
      case 1: return <TajMahal onObjectClick={onObjectClick} />; // Taj Mahal
      case 2: return <QutubMinar onObjectClick={onObjectClick} />; // Qutub Minar
      case 3: return <RedFort onObjectClick={onObjectClick} />; // Red Fort
      case 4: return <GatewayOfIndia onObjectClick={onObjectClick} />; // Gateway
      case 5: return <GenericTemple color="#e6be8a" onObjectClick={onObjectClick} />; // Amer Fort
      case 6: return <GenericTemple color="#ff69b4" onObjectClick={onObjectClick} />; // Meenakshi (Colorful)
      case 7: return <GenericTemple color="#8b4513" onObjectClick={onObjectClick} />; // Sun Temple (Dark Stone)
      case 8: return <VictoriaMemorial onObjectClick={onObjectClick} />; // Victoria Memorial
      case 9: return <CaveModel onObjectClick={onObjectClick} />; // Ellora
      case 10: return <CaveModel onObjectClick={onObjectClick} />; // Ajanta
      default: return <TajMahal onObjectClick={onObjectClick} />;
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 5, 15], fov: 50 }}>
        <color attach="background" args={['#0a192f']} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <ambientLight intensity={0.5} color="#b0c4de" />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#fff5e6" castShadow />
        <pointLight position={[-10, 5, -10]} intensity={0.5} color="#b0e0e6" />

        <group position={[0, -1, -5]}>
          {renderModel()}

          {/* Ground */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, 0]}>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial color="#2d3436" />
          </mesh>
        </group>

        <OrbitControls
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={8}
          maxDistance={30}
        />
      </Canvas>
    </div>
  );
}
