import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { AgenticCore, SystemNode, ConnectionLine } from './AgenticCore';
import { ParticleField } from './ParticleField';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const SYSTEM_NODES = [
  { pos: [2.8, 0.4, 0.5] as [number, number, number], label: 'PRD', color: '#F15B64', pulse: true },
  { pos: [-2.6, 0.6, 0.3] as [number, number, number], label: 'QAS', color: '#F5B942', pulse: false },
  { pos: [1.5, 2.2, -0.5] as [number, number, number], label: 'DEV', color: '#5DA9FF', pulse: false },
  { pos: [-1.8, -2.0, 0.2] as [number, number, number], label: 'BW', color: '#39C985', pulse: false },
  { pos: [2.2, -1.6, -0.4] as [number, number, number], label: 'BTP', color: '#8B5CF6', pulse: false },
  { pos: [-0.8, 2.5, 0.8] as [number, number, number], label: 'Teams', color: '#5DA9FF', pulse: true },
];

function OrbitingNodes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {SYSTEM_NODES.map((node, i) => (
        <group key={i}>
          <SystemNode position={node.pos} label={node.label} color={node.color} pulse={node.pulse} />
          <ConnectionLine
            start={[0, 0, 0]}
            end={node.pos}
            color={node.color}
            opacity={0.2}
          />
        </group>
      ))}
    </group>
  );
}

function CameraRig() {
  const { camera, mouse } = useThree();

  useFrame(() => {
    const x = mouse.x * 0.3;
    const y = mouse.y * 0.2;
    camera.position.x += (x - camera.position.x) * 0.02;
    camera.position.y += (y - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function SceneContent({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
      {!reducedMotion && <CameraRig />}

      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={1} color="#A01441" />
      <pointLight position={[-3, -2, 2]} intensity={0.6} color="#5DA9FF" />
      <pointLight position={[0, 0, 5]} intensity={0.4} color="#ffffff" />

      <AgenticCore />
      <OrbitingNodes />
      {!reducedMotion && (
        <ParticleField count={600} spread={14} color="#A01441" size={0.018} />
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
