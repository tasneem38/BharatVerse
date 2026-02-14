import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Stars, Float, MeshDistortMaterial, MeshWobbleMaterial, Sparkles } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

// A soft glow texture component (using a simple mesh with radial gradient simulated by opacity)
function Glow({ color = "white", scale = 1.5 }) {
    return (
        <mesh position={[0, 0, -1]}>
            <planeGeometry args={[scale * 2, scale * 2]} />
            <meshBasicMaterial
                color={color}
                transparent
                opacity={0.4}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
                depthWrite={false}
            >
                {/* Creating a circular glow using a simple distance alpha map is tricky in raw JSX without texture loading. 
                 Using a specialized ring/circle geometry instead for "halo" effect. */}
            </meshBasicMaterial>
            <ringGeometry args={[scale * 0.8, scale * 1.5, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0.2} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
        </mesh>
    );
}

function Planet({ position, color, label, path, size = 1, textureType = "standard" }) {
    const meshRef = useRef();
    const navigate = useNavigate();
    const [hovered, setHover] = useState(false);

    // Slight floating animation even if static orbit
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
            // Gentle bobbing
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
        }
    });

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh
                    ref={meshRef}
                    onClick={() => navigate(path)}
                    onPointerOver={() => { document.body.style.cursor = 'pointer'; setHover(true); }}
                    onPointerOut={() => { document.body.style.cursor = 'auto'; setHover(false); }}
                >
                    <sphereGeometry args={[size, 64, 64]} />

                    {/* Varied Materials for "Wow" factor */}
                    {textureType === "distort" && (
                        <MeshDistortMaterial
                            color={color}
                            speed={2}
                            distort={0.4}
                            radius={1}
                            metalness={0.8}
                            roughness={0.2}
                        />
                    )}
                    {textureType === "wobble" && (
                        <MeshWobbleMaterial
                            color={color}
                            factor={1}
                            speed={1}
                            metalness={0.9}
                            roughness={0.1}
                        />
                    )}
                    {textureType === "standard" && (
                        <meshPhysicalMaterial
                            color={color}
                            metalness={0.6}
                            roughness={0.2}
                            clearcoat={1}
                            clearcoatRoughness={0.1}
                        />
                    )}

                    {/* Hover Glow Behind */}
                    {hovered && (
                        <group rotation={[0, 0, 0]}>
                            {/* Halo */}
                            <mesh position={[0, 0, -0.5]}>
                                <ringGeometry args={[size * 1.1, size * 1.6, 64]} />
                                <meshBasicMaterial color="white" transparent opacity={0.6} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
                            </mesh>
                            <pointLight distance={5} intensity={5} color="white" />
                        </group>
                    )}
                </mesh>
            </Float>

            {/* Connection Line to Center (Optional, faint) */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[-position[0] / 2, 0, -position[2] / 2]}>
                {/* Can add lines if needed, but clean look is better */}
            </mesh>

            <Html position={[0, size + 0.8, 0]} center distanceFactor={12}>
                <div style={{
                    color: hovered ? '#ffffff' : 'rgba(255,255,255,0.7)',
                    textShadow: hovered ? '0 0 10px #ffffff' : 'none',
                    fontFamily: 'Playfair Display',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    textAlign: 'center',
                    pointerEvents: 'none',
                    transition: 'all 0.3s'
                }}>
                    {label}
                </div>
            </Html>
        </group>
    );
}

function Sun() {
    const sunRef = useRef();

    return (
        <group ref={sunRef}>
            {/* Fluid Gold Core */}
            <mesh>
                <sphereGeometry args={[3, 64, 64]} />
                <MeshDistortMaterial
                    color="#ffd700"
                    emissive="#b8860b"
                    emissiveIntensity={0.5}
                    speed={1.5}
                    distort={0.3}
                    radius={1}
                />
            </mesh>

            {/* Sparkles around Sun */}
            <Sparkles count={50} scale={8} size={4} speed={0.4} opacity={0.5} color="#ffd700" />

            <Html center position={[0, 0, 0]} pointerEvents="none">
                <div style={{
                    color: '#0f172a',
                    fontFamily: 'Playfair Display',
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    fontWeight: 'bold',
                    textShadow: '0 0 20px white',
                    textAlign: 'center',
                    background: 'rgba(255, 215, 0, 0.85)',
                    padding: '10px 30px',
                    borderRadius: '50px',
                    boxShadow: '0 0 40px #ffd700',
                    backdropFilter: 'blur(5px)'
                }}>
                    BHARATVERSE
                </div>
            </Html>
        </group>
    );
}

export default function HomeScene() {
    return (
        <>
            <ambientLight intensity={0.4} />
            <pointLight position={[0, 0, 0]} intensity={2.5} color="#ffd700" distance={30} />
            <spotLight position={[10, 20, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />

            <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={0.5} />

            <group position={[0, -2, 0]}>
                <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
                    <Sun />
                </Float>
            </group>

            {/* Static Planet Positions (Semi-circle layout) */}
            <Planet
                label="HERITAGE"
                path="/heritage"
                color="#cbd5e1" /* Marble/Stone */
                position={[-10, 0, 2]}
                size={1.5}
                textureType="standard"
            />
            <Planet
                label="AI GUIDE"
                path="/chat"
                color="#3b82f6" /* Tech Blue */
                position={[-4, 2, 8]}
                size={1.2}
                textureType="distort" /* Energy Field */
            />
            <Planet
                label="ART GALLERY"
                path="/art"
                color="#f43f5e" /* Red/Pink */
                position={[4, 2, 8]}
                size={1.3}
                textureType="wobble" /* Artistic Fluid */
            />
            <Planet
                label="3D EXPLORE"
                path="/explore-3d"
                color="#10b981" /* Nature Green */
                position={[10, 0, 2]}
                size={1.4}
                textureType="standard"
            />
        </>
    );
}
