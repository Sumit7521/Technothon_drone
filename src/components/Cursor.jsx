// Cursor.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei';
import BackgroundMusic from './BackgroundMusic'; // ✅ Import the new component
import * as THREE from 'three';

function AnimatedCursorModel(props) {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/animedrone1.glb'); // Make sure this path is correct
  const { actions, names } = useAnimations(animations, group);

  const [targetPos, setTargetPos] = useState(new THREE.Vector3());
  const { camera, size } = useThree();

  // 🧠 Mouse movement → 3D position
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / size.width) * 2 - 1;
      const y = -(e.clientY / size.height) * 2 + 1;

      const vector = new THREE.Vector3(x, y, 0.5);
      vector.unproject(camera);

      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      setTargetPos(pos);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [camera, size.width, size.height]);

  // 🎞️ Play ALL animations
  useEffect(() => {
    console.log('🧩 Available animations:', names);

    Object.entries(actions).forEach(([name, action], index) => {
      console.log(`🎬 Playing animation ${index}: ${name}`);
      action.reset().fadeIn(0.5).play();
    });
  }, [actions, names]);

  // 🌀 Animate model position and rotation
  useFrame((_, delta) => {
    if (group.current) {
      group.current.position.lerp(targetPos, 0.03);
      group.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={0.5}
      {...props}
    />
  );
}

// ✅ Preload model
useGLTF.preload('/models/animedrone1.glb');

export default function Cursor() {
  return (
    <div className="h-screen w-screen bg-gray-600">
      <Canvas gl={{ alpha: true }} camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} />
        <AnimatedCursorModel />
        <OrbitControls enableZoom={false} />
      </Canvas>
      <BackgroundMusic />
    </div>
  );
}
