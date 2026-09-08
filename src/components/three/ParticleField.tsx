import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  spread?: number;
  speed?: number;
  color?: string;
  size?: number;
}

export function ParticleField({
  count = 800,
  spread = 12,
  speed = 0.08,
  color = '#A01441',
  size = 0.02,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions: pos, velocities: vel };
  }, [count, spread]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const half = spread / 2;
    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities[i * 3] * speed * 0.5;
      pos[i * 3 + 1] += velocities[i * 3 + 1] * speed * 0.5;
      pos[i * 3 + 2] += velocities[i * 3 + 2] * speed * 0.5;
      for (let j = 0; j < 3; j++) {
        if (pos[i * 3 + j] > half) pos[i * 3 + j] = -half;
        if (pos[i * 3 + j] < -half) pos[i * 3 + j] = half;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
}

export function DataParticles({
  from,
  to,
  count = 20,
  color = '#5DA9FF',
  active = true,
}: {
  from: [number, number, number];
  to: [number, number, number];
  count?: number;
  color?: string;
  active?: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const offsets = useMemo(() => Array.from({ length: count }, (_, i) => i / count), [count]);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    return pos;
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    if (!pointsRef.current || !active) return;
    const t = (state.clock.getElapsedTime() * 0.4) % 1;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const progress = (t + offsets[i]) % 1;
      pos[i * 3] = from[0] + (to[0] - from[0]) * progress;
      pos[i * 3 + 1] = from[1] + (to[1] - from[1]) * progress;
      pos[i * 3 + 2] = from[2] + (to[2] - from[2]) * progress;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!active) return null;

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial color={color} size={0.04} sizeAttenuation transparent opacity={0.8} depthWrite={false} />
    </points>
  );
}
