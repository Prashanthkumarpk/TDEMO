import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';
import { SAP_SYSTEMS, SYSTEM_STATUS_COLORS } from '@/data/systems';
import type { SapSystem } from '@/types';
import { SystemEnvBadge, SystemStatusBadge } from '@/components/common/Badge';

const SYSTEM_POSITIONS: [number, number, number][] = [
  [0, 0, 0],
  [3, 0.8, -0.5],
  [-2.8, 0.4, 0.2],
  [1.2, -2.5, -0.3],
  [-1.4, 2.2, 0.5],
  [2.6, -2.0, 0.4],
  [-2.5, -1.8, -0.2],
  [0.5, 3, 0.3],
];

function SystemNodeMesh({
  system,
  position,
  isSelected,
  onSelect,
}: {
  system: SapSystem;
  position: [number, number, number];
  isSelected: boolean;
  onSelect: (s: SapSystem) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = SYSTEM_STATUS_COLORS[system.status];

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const pulse = isSelected ? 1 + Math.sin(t * 3) * 0.12 : 1 + Math.sin(t * 1.5 + position[0]) * 0.05;
    meshRef.current.scale.setScalar(pulse);
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={() => onSelect(system)}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        <octahedronGeometry args={[0.22]} />
        <meshPhongMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isSelected ? 1.0 : 0.4}
        />
      </mesh>

      {isSelected && (
        <mesh scale={[1.8, 1.8, 1.8]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshPhongMaterial color={color} transparent opacity={0.08} side={THREE.BackSide} />
        </mesh>
      )}

      <Html
        position={[0, 0.38, 0]}
        center
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        <div className="text-xs font-mono font-bold text-white bg-black/60 px-1.5 py-0.5 rounded whitespace-nowrap">
          {system.name}
        </div>
      </Html>
    </group>
  );
}

function ConnectionLines({ systems }: { systems: SapSystem[] }) {
  const pairs = [
    [0, 1], [0, 2], [0, 3], [1, 4], [2, 5], [3, 6], [4, 7], [1, 3], [2, 4],
  ];

  return (
    <>
      {pairs.map(([a, b], i) => {
        if (!SYSTEM_POSITIONS[a] || !SYSTEM_POSITIONS[b] || !systems[a] || !systems[b]) return null;
        const points = [
          new THREE.Vector3(...SYSTEM_POSITIONS[a]),
          new THREE.Vector3(...SYSTEM_POSITIONS[b]),
        ];
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const mat = new THREE.LineBasicMaterial({ color: '#A7ABB7', transparent: true, opacity: 0.1 });
        const lineMesh = new THREE.Line(geo, mat);
        return <primitive key={i} object={lineMesh} />;
      })}
    </>
  );
}

function LandscapeScene({
  selectedSystem,
  onSelect,
}: {
  selectedSystem: SapSystem | null;
  onSelect: (s: SapSystem) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#A01441" />
      <pointLight position={[-5, -3, 3]} intensity={0.5} color="#5DA9FF" />

      <group ref={groupRef}>
        <ConnectionLines systems={SAP_SYSTEMS} />
        {SAP_SYSTEMS.map((system, i) => (
          <SystemNodeMesh
            key={system.id}
            system={system}
            position={SYSTEM_POSITIONS[i] ?? [0, 0, 0]}
            isSelected={selectedSystem?.id === system.id}
            onSelect={onSelect}
          />
        ))}
      </group>
    </>
  );
}

function SystemInfoPanel({ system, onClose }: { system: SapSystem; onClose: () => void }) {
  return (
    <div className="glass rounded-xl p-4 min-w-[220px] animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <SystemEnvBadge env={system.env} />
          <span className="font-heading font-semibold text-sm">{system.name}</span>
        </div>
        <button onClick={onClose} className="text-text-secondary hover:text-text-primary text-lg leading-none" aria-label="Close">×</button>
      </div>
      <p className="text-xs text-text-secondary mb-3">{system.description}</p>
      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-text-secondary">Status</span>
          <SystemStatusBadge status={system.status} />
        </div>
        {system.version && (
          <div className="flex justify-between">
            <span className="text-text-secondary">Version</span>
            <span className="font-mono">{system.version}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-text-secondary">Active Jobs</span>
          <span className="text-success font-mono">{system.activeJobs ?? 0}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Failed Jobs</span>
          <span className={`font-mono ${(system.failedJobs ?? 0) > 0 ? 'text-danger' : 'text-success'}`}>{system.failedJobs ?? 0}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Open Incidents</span>
          <span className={`font-mono ${(system.openIncidents ?? 0) > 0 ? 'text-warning' : 'text-success'}`}>{system.openIncidents ?? 0}</span>
        </div>
      </div>
    </div>
  );
}

export function SystemLandscape() {
  const [selectedSystem, setSelectedSystem] = useState<SapSystem | null>(null);

  return (
    <div className="relative w-full h-full">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        aria-label="SAP System Landscape - 3D visualization"
      >
        <Suspense fallback={null}>
          <LandscapeScene selectedSystem={selectedSystem} onSelect={setSelectedSystem} />
        </Suspense>
      </Canvas>

      {selectedSystem && (
        <div className="absolute bottom-4 left-4">
          <SystemInfoPanel system={selectedSystem} onClose={() => setSelectedSystem(null)} />
        </div>
      )}

      <div className="absolute top-4 right-4 flex flex-col gap-1">
        {[
          { color: 'bg-success', label: 'Healthy' },
          { color: 'bg-warning', label: 'Warning' },
          { color: 'bg-danger', label: 'Critical' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2 text-xs text-text-secondary">
            <div className={`w-2 h-2 rounded-full ${item.color}`} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
