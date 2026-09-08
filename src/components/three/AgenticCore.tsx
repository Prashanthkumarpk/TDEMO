import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function AgenticCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.15;
      coreRef.current.rotation.z = t * 0.05;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.3;
      innerRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.05);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.2;
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.4) * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.15;
      ring2Ref.current.rotation.y = Math.PI / 4 + Math.cos(t * 0.3) * 0.1;
    }
  });

  const coreGeometry = useMemo(() => new THREE.IcosahedronGeometry(0.8, 2), []);
  const innerGeometry = useMemo(() => new THREE.SphereGeometry(0.55, 32, 32), []);
  const ringGeometry = useMemo(() => new THREE.TorusGeometry(1.4, 0.02, 8, 120), []);
  const ring2Geometry = useMemo(() => new THREE.TorusGeometry(1.8, 0.015, 8, 120), []);

  return (
    <group>
      {/* Outer wireframe icosahedron */}
      <mesh ref={coreRef} geometry={coreGeometry}>
        <meshPhongMaterial
          color="#A01441"
          emissive="#6D0D2E"
          emissiveIntensity={0.5}
          wireframe={true}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Inner glowing sphere */}
      <mesh ref={innerRef} geometry={innerGeometry}>
        <meshPhongMaterial
          color="#C52A5C"
          emissive="#A01441"
          emissiveIntensity={1.2}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Glow halo */}
      <mesh scale={[1.1, 1.1, 1.1]}>
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshPhongMaterial
          color="#A01441"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Orbiting ring 1 */}
      <mesh ref={ringRef} geometry={ringGeometry} rotation={[Math.PI / 2, 0, 0]}>
        <meshPhongMaterial color="#C52A5C" emissive="#6D0D2E" emissiveIntensity={0.8} />
      </mesh>

      {/* Orbiting ring 2 */}
      <mesh ref={ring2Ref} geometry={ring2Geometry} rotation={[Math.PI / 4, 0, 0]}>
        <meshPhongMaterial color="#5DA9FF" emissive="#1A4A8A" emissiveIntensity={0.5} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

export function SystemNode({
  position,
  label,
  color,
  size = 0.18,
  pulse = false,
}: {
  position: [number, number, number];
  label: string;
  color: string;
  size?: number;
  pulse?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    if (pulse) {
      meshRef.current.scale.setScalar(1 + Math.sin(t * 2 + position[0]) * 0.1);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[size]} />
      <meshPhongMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
      />
    </mesh>
  );
}

export function ConnectionLine({
  start,
  end,
  color = '#A01441',
  opacity = 0.4,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  opacity?: number;
}) {
  const points = useMemo(
    () => [new THREE.Vector3(...start), new THREE.Vector3(...end)],
    [start, end]
  );

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  const lineMesh = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
    return new THREE.Line(lineGeometry, mat);
  }, [lineGeometry, color, opacity]);

  return <primitive object={lineMesh} />;
}
