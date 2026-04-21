import React, { useEffect, useRef } from 'react';
import { useConfig } from '../context/ConfigContext';
import * as THREE from 'three';

/* ── 3D Background Renderer ── */
const ThreeDBottomLayer = ({ bgMode, themeMode }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;
    
    currentMount.innerHTML = ''; // Clean up

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Dynamic color parsing (very basic hex mapping)
    const getThemeColor = () => {
      switch(themeMode) {
        case 'AGENT_CRIMSON': return 0xff003c;
        case 'AGENT_COBALT': return 0x00f0ff;
        case 'AGENT_VIRIDIAN': return 0x00ff41;
        case 'SUPERNOVA': return 0xff5e00;
        case 'LUNAR_ECLIPSE': return 0x00e1ff;
        case 'NEBULA_CRIMSON': return 0xff0040;
        case 'AURORA_PROTOCOL': return 0x00ffa6;
        default: return 0xfacc15; // AGENT_YELLOW & DEEP_SPACE
      }
    };

    let animationFrameId;
    let customUpdate = () => {};

    if (bgMode === 'CONSTELLATION_MAP' || bgMode === 'VOID_PARTICLES') {
      // Starry particles logic
      const particlesGeometry = new THREE.BufferGeometry();
      const count = 300;
      const positions = new Float32Array(count * 3);
      for(let i=0; i < count*3; i++) {
        // Spread particles out wide but deep
        positions[i] = (Math.random() - 0.5) * 20;
      }
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: getThemeColor(),
        transparent: true,
        opacity: 0.6,
      });

      const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particleMesh);

      // Lines for constellation
      if (bgMode === 'CONSTELLATION_MAP') {
         const lineMat = new THREE.LineBasicMaterial({ color: getThemeColor(), transparent: true, opacity: 0.1 });
         const lineGeo = new THREE.BufferGeometry();
         // simple random lines
         const linePos = new Float32Array(count * 3);
         for(let i=0; i<count*3; i++) linePos[i] = positions[i];
         lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
         const lines = new THREE.LineSegments(lineGeo, lineMat);
         scene.add(lines);
         
         customUpdate = () => {
           particleMesh.rotation.y += 0.0005;
           particleMesh.rotation.x += 0.0002;
           lines.rotation.y += 0.0005;
           lines.rotation.x += 0.0002;
         };
      } else {
         customUpdate = () => {
           particleMesh.rotation.y += 0.001;
         };
      }
      camera.position.z = 5;

    } else if (bgMode === 'THE_ORBITAL_RING' || bgMode === 'HOLOGRAPHIC_GLOBE') {
      // Globe or Ring logic
      const geo = bgMode === 'THE_ORBITAL_RING' ? new THREE.TorusGeometry(3, 0.02, 16, 100) : new THREE.SphereGeometry(2.5, 32, 32);
      const mat = new THREE.MeshBasicMaterial({ 
        color: getThemeColor(), 
        wireframe: true, 
        transparent: true, 
        opacity: 0.15 
      });
      const object = new THREE.Mesh(geo, mat);
      
      if(bgMode === 'THE_ORBITAL_RING') {
        object.rotation.x = Math.PI / 3;
        object.position.y = -1;
      } else {
        object.position.x = 2; // Bottom right globe
        object.position.y = -1;
      }
      
      scene.add(object);
      camera.position.z = 5;

      customUpdate = () => {
        object.rotation.z += 0.001;
        if(bgMode === 'HOLOGRAPHIC_GLOBE') object.rotation.y += 0.002;
      };
    } else {
      // THE_CORE / EVENT_HORIZON
      const geo = new THREE.IcosahedronGeometry(2, 0);
      const mat = new THREE.MeshBasicMaterial({ color: getThemeColor(), wireframe: true, transparent: true, opacity: 0.1 });
      const object = new THREE.Mesh(geo, mat);
      scene.add(object);
      camera.position.z = 5;
      
      customUpdate = () => {
        object.rotation.x += 0.005;
        object.rotation.y += 0.005;
      };
    }

    const animate = () => {
      customUpdate();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount) currentMount.removeChild(renderer.domElement);
    };
  }, [bgMode, themeMode]);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none blur-[2px] opacity-60 mix-blend-screen" />;
};

/* ── 2D VFX Post Processing ── */
const VFXOverlay = ({ vfxMode }) => {
  if (vfxMode === 'COSMIC_STATIC' || vfxMode === 'CRT_SCANNER') {
    return <div className="fixed inset-0 z-50 pointer-events-none mix-blend-overlay opacity-20 crt-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />;
  }
  
  if (vfxMode === 'DATA_RAIN' || vfxMode === 'WARP_STREAKS') {
    return (
      <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden opacity-30">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="absolute w-[1px] h-32 bg-gradient-to-b from-transparent via-[var(--cmd-yellow)] to-transparent" 
               style={{ 
                 left: `${Math.random() * 100}%`, 
                 top: `-20%`,
                 animation: `sweep ${Math.random() * 3 + 1}s linear infinite`,
                 animationDelay: `${Math.random() * 5}s`
               }} 
          />
        ))}
      </div>
    );
  }

  if (vfxMode === 'RADAR_SWEEP' || vfxMode === 'SOLAR_LENS_FLARE') {
    return <div className="fixed top-0 bottom-0 left-[-50%] w-[200%] md:w-[100%] z-40 bg-gradient-to-r from-transparent via-[var(--cmd-yellow)]/5 to-transparent pointer-events-none animate-[sweep_10s_ease-in-out_infinite] mix-blend-screen" />;
  }

  // DEFAULT
  return null;
};

/* ── Main Global Controller ── */
export default function GlobalFX() {
  const { config } = useConfig();
  const vs = config.visualSettings || { themeMode: 'DEEP_SPACE', vfxMode: 'COSMIC_STATIC', bgMode: 'CONSTELLATION_MAP' };

  // Sync Theme CSS Variables
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', vs.themeMode);
  }, [vs.themeMode]);

  return (
    <>
      <ThreeDBottomLayer bgMode={vs.bgMode} themeMode={vs.themeMode} />
      <VFXOverlay vfxMode={vs.vfxMode} />
    </>
  );
}
