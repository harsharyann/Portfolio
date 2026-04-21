import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useConfig } from '../context/ConfigContext';

/* ─── theme → color palette ─── */
const THEME_COLORS = {
  ghost:   { primary: '#FFB300', secondary: '#00E5FF', bg: '#050a14' },
  nebula:  { primary: '#ff2d55', secondary: '#bf5af2', bg: '#0f0514' },
  emerald: { primary: '#00ff88', secondary: '#00f2ff', bg: '#05140f' },
  solar:   { primary: '#ff6a00', secondary: '#ffcc00', bg: '#120800' },
  ice:     { primary: '#00d4ff', secondary: '#ffffff', bg: '#020d14' },
};

/* ─── Small tumbling asteroid ─── */
const Asteroid = ({ position, size, speed, color }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.x += 0.004;
    ref.current.rotation.y += 0.006;
    ref.current.position.y = position[1] + Math.sin(t * speed + position[0]) * 1.2;
    ref.current.position.x = position[0] + Math.cos(t * speed * 0.4 + position[2]) * 0.6;
  });
  return (
    <mesh ref={ref} position={position}>
      <dodecahedronGeometry args={[size, 0]} />
      <meshStandardMaterial color={color} roughness={0.9} metalness={0.1}
        emissive={color} emissiveIntensity={0.08} />
    </mesh>
  );
};

/* ─── Rocket ─── */
const Rocket = ({ colors }) => {
  const groupRef = useRef();
  const dataRef  = useRef({
    active: false,
    pos: new THREE.Vector3(),
    dir: new THREE.Vector3(),
    speed: 0,
  });

  const launchNew = () => {
    const d = dataRef.current;
    // start off-screen left/top
    d.pos.set(
      -60 + Math.random() * 30,          // left side
       30 - Math.random() * 60,          // random height
      -20 - Math.random() * 15           // behind scene
    );
    const angle = Math.random() * 0.4 - 0.1; // mostly rightward
    d.dir.set(Math.cos(angle), Math.sin(angle) * 0.1, 0.05).normalize();
    d.speed = 0.6 + Math.random() * 1.2;
    d.active = true;
  };

  useFrame(() => {
    const d = dataRef.current;
    if (!d.active) {
      if (Math.random() > 0.994) launchNew();
      return;
    }
    d.pos.addScaledVector(d.dir, d.speed);
    groupRef.current.position.copy(d.pos);
    groupRef.current.visible = true;
    // look in direction of travel
    groupRef.current.rotation.z = Math.atan2(d.dir.y, d.dir.x) - Math.PI / 2;

    if (d.pos.x > 80 || d.pos.y < -55) {
      d.active = false;
      groupRef.current.visible = false;
    }
  });

  return (
    <group ref={groupRef} visible={false} scale={0.15}>
      {/* Body */}
      <mesh>
        <cylinderGeometry args={[0.4, 0.4, 3, 8]} />
        <meshStandardMaterial color={colors.primary} metalness={0.6} roughness={0.3}
          emissive={colors.primary} emissiveIntensity={0.4} />
      </mesh>
      {/* Nose cone */}
      <mesh position={[0, 2, 0]}>
        <coneGeometry args={[0.4, 1.5, 8]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Left fin */}
      <mesh position={[-0.5, -1.2, 0]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.8, 1.2, 0.1]} />
        <meshStandardMaterial color={colors.secondary} metalness={0.5} roughness={0.4}
          emissive={colors.secondary} emissiveIntensity={0.2} />
      </mesh>
      {/* Right fin */}
      <mesh position={[0.5, -1.2, 0]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.8, 1.2, 0.1]} />
        <meshStandardMaterial color={colors.secondary} metalness={0.5} roughness={0.4}
          emissive={colors.secondary} emissiveIntensity={0.2} />
      </mesh>
      {/* Thruster glow */}
      <mesh position={[0, -2, 0]}>
        <coneGeometry args={[0.25, 1.2, 8]} />
        <meshBasicMaterial color={colors.primary} transparent opacity={0.7} />
      </mesh>
      <pointLight position={[0, -2, 0]} intensity={1.5} color={colors.primary} distance={8} />
    </group>
  );
};

/* ─── Satellite ─── */
const Satellite = ({ colors }) => {
  const ref  = useRef();
  const time = useRef(Math.random() * 100);
  const r    = 18 + Math.random() * 10;
  const tilt = Math.random() * Math.PI;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.12 + time.current;
    ref.current.position.set(
      Math.cos(t) * r,
      Math.sin(t * 0.6) * r * Math.sin(tilt),
      Math.sin(t) * r * 0.4 - 15
    );
    ref.current.rotation.y += 0.01;
  });

  return (
    <group ref={ref}>
      {/* Main body */}
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.8]} />
        <meshStandardMaterial color="#aaaaaa" metalness={0.9} roughness={0.1}
          emissive={colors.secondary} emissiveIntensity={0.1} />
      </mesh>
      {/* Solar panel L */}
      <mesh position={[-1.2, 0, 0]}>
        <boxGeometry args={[1.8, 0.04, 0.7]} />
        <meshStandardMaterial color={colors.secondary} metalness={0.4} roughness={0.6}
          emissive={colors.secondary} emissiveIntensity={0.3} />
      </mesh>
      {/* Solar panel R */}
      <mesh position={[1.2, 0, 0]}>
        <boxGeometry args={[1.8, 0.04, 0.7]} />
        <meshStandardMaterial color={colors.secondary} metalness={0.4} roughness={0.6}
          emissive={colors.secondary} emissiveIntensity={0.3} />
      </mesh>
      {/* Antenna */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 6]} />
        <meshBasicMaterial color={colors.primary} />
      </mesh>
      <mesh position={[0, 0.95, 0]}>
        <sphereGeometry args={[0.07, 6, 6]} />
        <meshBasicMaterial color={colors.primary} />
      </mesh>
      <pointLight intensity={0.4} color={colors.primary} distance={5} />
    </group>
  );
};


/* ─── Scene ─── */
const Scene = () => {
  const { theme } = useConfig();
  const colors = THEME_COLORS[theme] || THEME_COLORS.ghost;

  const asteroids = useMemo(() =>
    Array.from({ length: 20 }, () => ({
      position: [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 28,
        -5 - Math.random() * 30
      ],
      size: 0.08 + Math.random() * 0.28,
      speed: 0.15 + Math.random() * 0.4,
      color: Math.random() > 0.6 ? colors.primary : '#3a3a4a',
    })), [colors.primary]
  );

  return (
    <>
      <color attach="background" args={[colors.bg]} />
      <ambientLight intensity={0.15} />
      <pointLight position={[20, 10, 5]}  intensity={1.2} color={colors.primary} />
      <pointLight position={[-20,-10, 5]} intensity={0.5} color={colors.secondary} />

      <Stars radius={120} depth={60} count={6000} factor={4} saturation={0} fade speed={0.5} />

      {asteroids.map((a, i) => <Asteroid key={i} {...a} />)}

      {/* 3 rockets flying through */}
      <Rocket colors={colors} />
      <Rocket colors={colors} />
      <Rocket colors={colors} />

      <Satellite colors={colors} />
      <Satellite colors={colors} />
    </>
  );
};

/* ─── Export ─── */
const SpaceEngine = () => (
  <div style={{
    position: 'fixed', inset: 0,
    zIndex: -1,
    pointerEvents: 'none',
  }}>
    <Canvas camera={{ position: [0, 0, 8], fov: 70 }} gl={{ antialias: true }}>
      <React.Suspense fallback={null}>
        <Scene />
      </React.Suspense>
    </Canvas>
  </div>
);

export default SpaceEngine;
