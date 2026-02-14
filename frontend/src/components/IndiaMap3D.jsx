import React, { useRef, useState } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useCursor, Text } from '@react-three/drei';
import * as THREE from 'three';

// Map 2D percentages to 3D Plane coordinates (assuming Plane is 10x12)
// Width: 10, Height: 12
// Top-Left (0%, 0%) -> (-5, 6)
// Bottom-Right (100%, 100%) -> (5, -6)
const mapPos = (topPercent, leftPercent) => {
    const top = parseFloat(topPercent);
    const left = parseFloat(leftPercent);
    const x = ((left - 50) / 100) * 12; // Adjusted wider width
    const z = ((top - 50) / 100) * 14;  // Adjusted taller height
    return [x, 0.2, z];
};

function Marker({ position, label, onClick, isSelected }) {
    const [hovered, setHover] = useState(false);
    useCursor(hovered);

    return (
        <group position={position}>
            {/* Pin Head */}
            <mesh
                position={[0, 0.8, 0]}
                onClick={(e) => { e.stopPropagation(); onClick(); }}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <sphereGeometry args={[0.25, 32, 32]} />
                <meshStandardMaterial
                    color={isSelected || hovered ? "#ffd700" : "#d4af37"}
                    emissive={isSelected ? "#ffd700" : "#000"}
                    emissiveIntensity={isSelected ? 0.5 : 0}
                />
            </mesh>
            {/* Pin Stick */}
            <mesh position={[0, 0.4, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.8]} />
                <meshStandardMaterial color="#ffd700" />
            </mesh>
            {/* Ground Ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                <ringGeometry args={[0.15, 0.2, 32]} />
                <meshBasicMaterial color="#ffd700" opacity={0.5} transparent />
            </mesh>

            {/* Label (Always visible or on hover) */}
            <Html position={[0, 1.2, 0]} center style={{ pointerEvents: 'none' }}>
                <div style={{
                    background: isSelected ? 'rgba(255, 215, 0, 0.9)' : 'rgba(15, 23, 42, 0.85)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid #ffd700',
                    color: isSelected ? '#000' : '#ffd700',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    opacity: hovered || isSelected ? 1 : 0.7,
                    transition: 'all 0.2s',
                    transform: hovered || isSelected ? 'scale(1.1)' : 'scale(1)'
                }}>
                    {label}
                </div>
            </Html>
        </group>
    );
}

function MapPlane() {
    // Load the texture
    const texture = useLoader(THREE.TextureLoader, '/assets/india_map.png');

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[12, 14]} /> {/* Matches aspect ratio roughly */}
            <meshStandardMaterial
                map={texture}
                transparent
                alphaTest={0.1}
                side={THREE.DoubleSide}
                color="#aebbdb" // Tint it slightly
                emissive="#1e293b"
                emissiveIntensity={0.2}
            />
        </mesh>
    );
}

export default function IndiaMap3D({ monuments, selectedId, onSelect }) {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 8, 10], fov: 45 }}>
                <color attach="background" args={['#020617']} />

                {/* Lighting */}
                <ambientLight intensity={0.5} color="#ffffff" />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffd700" />
                <pointLight position={[-10, 5, -10]} intensity={0.5} color="#4fc3f7" />

                <group position={[0, -1, 0]}>
                    <React.Suspense fallback={null}>
                        <MapPlane />
                    </React.Suspense>

                    {monuments.map((m) => {
                        const pos = mapPos(m.position.top, m.position.left);
                        return (
                            <Marker
                                key={m.id}
                                position={pos}
                                label={m.name}
                                isSelected={selectedId === m.id}
                                onClick={() => onSelect(m)}
                            />
                        );
                    })}
                </group>

                {/* Controls */}
                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    minDistance={5}
                    maxDistance={20}
                    maxPolarAngle={Math.PI / 2.2} // Prevent going under the map
                    minPolarAngle={Math.PI / 4}
                />
            </Canvas>
        </div>
    );
}
