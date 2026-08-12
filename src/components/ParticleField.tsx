import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Field({ count = 900 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, linePositions } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 9;
      const z = (Math.random() - 0.5) * 8;
      positions.set([x, y, z], i * 3);
      pts.push(new THREE.Vector3(x, y, z));
    }

    // Connect nearby points to sketch a faint constellation network.
    const lineVerts: number[] = [];
    const maxDist = 1.6;
    const maxConnections = 2200;
    outer: for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < maxDist) {
          lineVerts.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
          if (lineVerts.length / 6 > maxConnections) break outer;
        }
      }
    }

    return {
      positions,
      linePositions: new Float32Array(lineVerts),
    };
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.018;
      pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.05;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.018;
      linesRef.current.rotation.x = Math.sin(t * 0.05) * 0.05;
    }
    // Gentle parallax toward the pointer.
    const { pointer } = state;
    const target = { x: pointer.x * 0.35, y: pointer.y * 0.2 };
    if (pointsRef.current) {
      pointsRef.current.position.x += (target.x - pointsRef.current.position.x) * 0.02;
      pointsRef.current.position.y += (target.y - pointsRef.current.position.y) * 0.02;
    }
    if (linesRef.current) {
      linesRef.current.position.x += (target.x - linesRef.current.position.x) * 0.02;
      linesRef.current.position.y += (target.y - linesRef.current.position.y) * 0.02;
    }
  });

  return (
    <group>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#2dd4bf" transparent opacity={0.12} />
      </lineSegments>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#7fe9db" size={0.045} sizeAttenuation transparent opacity={0.85} />
      </points>
    </group>
  );
}

/**
 * WebGL constellation background for the hero — a lightweight point field
 * with connecting lines and gentle cursor parallax. Callers are expected to
 * only mount this on viewports/devices that can afford it.
 */
export function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Field />
    </Canvas>
  );
}
