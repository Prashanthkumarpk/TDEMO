import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { SystemNode, ConnectionLine } from './AgenticCore';
import { ParticleField } from './ParticleField';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Three glowing torus rings — purely atmospheric, no central sphere clutter
function NeonRings() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);
  const outer = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outer.current) outer.current.rotation.y = t * 0.06;
    if (r1.current)    r1.current.rotation.z   = t * 0.045;
    if (r2.current)    r2.current.rotation.x   = t * 0.07;
    if (r3.current) {
      r3.current.rotation.z = -t * 0.038;
      r3.current.rotation.y =  t * 0.05;
    }
  });

  return (
    <group ref={outer} position={[2.4, 0.1, -0.8]}>
      {/* Outer crimson ring */}
      <mesh ref={r1} rotation={[0.28, 0, 0]}>
        <torusGeometry args={[2.9, 0.008, 8, 128]} />
        <meshBasicMaterial color="#A01441" transparent opacity={0.55} />
      </mesh>
      {/* Blue accent ring */}
      <mesh ref={r2} rotation={[0.52, 0.28, 0]}>
        <torusGeometry args={[2.2, 0.005, 8, 100]} />
        <meshBasicMaterial color="#5DA9FF" transparent opacity={0.28} />
      </mesh>
      {/* Inner bright ring */}
      <mesh ref={r3} rotation={[-0.42, 0.18, 0.12]}>
        <torusGeometry args={[1.55, 0.011, 8, 80]} />
        <meshBasicMaterial color="#C52A5C" transparent opacity={0.62} />
      </mesh>
      {/* Tiny core spark */}
      <mesh>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#FFAACC" emissive="#C52A5C" emissiveIntensity={3} transparent opacity={0.85} />
      </mesh>
      {/* Atmospheric halo */}
      <mesh>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color="#A01441" emissive="#A01441" emissiveIntensity={0.6} transparent opacity={0.07} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

// Orbital indicator nodes — all shifted right so they don't overlap headline
const ORBITAL_NODES = [
  { pos: [4.8,  0.7,  0.2] as [number,number,number], color: '#F15B64', pulse: true  },
  { pos: [1.0,  2.7, -0.3] as [number,number,number], color: '#5DA9FF', pulse: false },
  { pos: [4.2, -1.4, -0.4] as [number,number,number], color: '#39C985', pulse: true  },
  { pos: [1.5, -2.3,  0.5] as [number,number,number], color: '#F5B942', pulse: false },
  { pos: [5.3,  1.6, -0.6] as [number,number,number], color: '#8B5CF6', pulse: false },
  { pos: [3.6,  2.4,  0.3] as [number,number,number], color: '#5DA9FF', pulse: false },
];

function OrbitingNodes() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (groupRef.current) groupRef.current.rotation.y = s.clock.elapsedTime * 0.025;
  });

  return (
    <group ref={groupRef}>
      {ORBITAL_NODES.map((n, i) => (
        <group key={i}>
          <SystemNode position={n.pos} color={n.color} size={0.055} pulse={n.pulse} index={i} />
          <ConnectionLine start={[2.4, 0.1, -0.8]} end={n.pos} color={n.color} opacity={0.1} />
        </group>
      ))}
    </group>
  );
}

// Camera rigs to look at the right-side cluster, not the center
function CameraRig() {
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.x += (1.6 + mouse.x * 0.3 - camera.position.x) * 0.015;
    camera.position.y += (mouse.y * 0.2 - camera.position.y) * 0.015;
    (camera as THREE.PerspectiveCamera).lookAt(1.8, 0, 0);
  });
  return null;
}

function SceneContent({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[1.6, 0, 7.2]} fov={46} />
      {!reducedMotion && <CameraRig />}

      <ambientLight intensity={0.08} />
      <pointLight position={[2.4, 0, 3]}  intensity={3.5}  color="#A01441" />
      <pointLight position={[5.5, 3, 2]}  intensity={1.6}  color="#C52A5C" />
      <pointLight position={[-0.5, -2, 2]} intensity={0.7} color="#5DA9FF" />
      <pointLight position={[2, -4, 1]}   intensity={0.4}  color="#6D0D2E" />

      <NeonRings />
      <OrbitingNodes />

      {!reducedMotion && (
        <>
          <ParticleField count={420} spread={10} color="#C52A5C" size={0.013} speed={0.05}  />
          <ParticleField count={260} spread={18} color="#6D0D2E" size={0.020} speed={0.032} />
          <ParticleField count={130} spread={13} color="#5DA9FF" size={0.011} speed={0.043} />
        </>
      )}
    </>
  );
}

export function HeroScene() {
  const reducedMotion = useReducedMotion();
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <SceneContent reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}
