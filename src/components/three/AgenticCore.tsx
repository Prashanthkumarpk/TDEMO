import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function AgenticCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const halo1Ref = useRef<THREE.Mesh>(null);
  const halo2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.18;
      coreRef.current.rotation.z = t * 0.07;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.25;
      const pulse = 1 + Math.sin(t * 1.8) * 0.06;
      innerRef.current.scale.setScalar(pulse);
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.22;
      ring1Ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.18;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.16;
      ring2Ref.current.rotation.y = Math.PI / 4 + Math.cos(t * 0.35) * 0.12;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = t * 0.1;
      ring3Ref.current.rotation.z = Math.PI / 3 + Math.sin(t * 0.28) * 0.2;
    }
    if (halo1Ref.current) {
      const glow = 1 + Math.sin(t * 1.2) * 0.08;
      halo1Ref.current.scale.setScalar(glow);
    }
    if (halo2Ref.current) {
      const glow = 1 + Math.cos(t * 0.9) * 0.06;
      halo2Ref.current.scale.setScalar(glow);
    }
  });

  const coreGeo = useMemo(() => new THREE.IcosahedronGeometry(0.75, 2), []);
  const innerGeo = useMemo(() => new THREE.SphereGeometry(0.52, 48, 48), []);

  return (
    <group>
      {/* Deep outer glow halos — atmosphere effect */}
      <mesh ref={halo2Ref} scale={2.8}>
        <sphereGeometry args={[0.75, 16, 16]} />
        <meshPhongMaterial color="#6D0D2E" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
      <mesh ref={halo1Ref} scale={2.0}>
        <sphereGeometry args={[0.75, 16, 16]} />
        <meshPhongMaterial color="#A01441" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
      <mesh scale={1.5}>
        <sphereGeometry args={[0.75, 16, 16]} />
        <meshPhongMaterial color="#C52A5C" transparent opacity={0.12} side={THREE.BackSide} />
      </mesh>
      <mesh scale={1.2}>
        <sphereGeometry args={[0.75, 16, 16]} />
        <meshPhongMaterial color="#D44070" transparent opacity={0.18} side={THREE.BackSide} />
      </mesh>

      {/* Outer wireframe icosahedron */}
      <mesh ref={coreRef} geometry={coreGeo}>
        <meshPhongMaterial
          color="#C52A5C"
          emissive="#A01441"
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Inner pulsing sphere — the intelligence core */}
      <mesh ref={innerRef} geometry={innerGeo}>
        <meshPhongMaterial
          color="#D44070"
          emissive="#A01441"
          emissiveIntensity={1.8}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Bright center spark */}
      <mesh scale={0.28}>
        <sphereGeometry args={[0.52, 16, 16]} />
        <meshPhongMaterial
          color="#FFAACC"
          emissive="#FF88BB"
          emissiveIntensity={3}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Orbital rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.018, 8, 140]} />
        <meshPhongMaterial color="#C52A5C" emissive="#A01441" emissiveIntensity={1.2} transparent opacity={0.85} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.7, 0.012, 8, 140]} />
        <meshPhongMaterial color="#5DA9FF" emissive="#2255AA" emissiveIntensity={0.9} transparent opacity={0.65} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[2.1, 0.008, 6, 160]} />
        <meshPhongMaterial color="#A01441" emissive="#6D0D2E" emissiveIntensity={0.7} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

export function SystemNode({
  position,
  color,
  size = 0.07,
  pulse = false,
  index = 0,
}: {
  position: [number, number, number];
  label?: string;
  color: string;
  size?: number;
  pulse?: boolean;
  index?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const s = pulse
      ? 1 + Math.sin(t * 2.5 + index) * 0.2
      : 1 + Math.sin(t * 1.5 + index * 0.7) * 0.08;
    meshRef.current.scale.setScalar(s);
    if (glowRef.current) {
      glowRef.current.scale.setScalar(s * 2.5);
      (glowRef.current.material as THREE.MeshPhongMaterial).opacity = 0.08 + Math.sin(t + index) * 0.04;
    }
  });

  return (
    <group position={position}>
      {/* Glow halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[size, 8, 8]} />
        <meshPhongMaterial color={color} transparent opacity={0.1} side={THREE.BackSide} />
      </mesh>
      {/* Core dot */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 12, 12]} />
        <meshPhongMaterial color={color} emissive={color} emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

export function ConnectionLine({
  start,
  end,
  color = '#A01441',
  opacity = 0.25,
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
  const lineGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  const lineMesh = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
    return new THREE.Line(lineGeometry, mat);
  }, [lineGeometry, color, opacity]);

  return <primitive object={lineMesh} />;
}
