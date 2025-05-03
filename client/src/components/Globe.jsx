import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

const BubbleText = ({ label, position }) => {
  const groupRef = useRef();
  const { axis, speed } = useMemo(() => {
    const axis = [Math.random(), Math.random(), Math.random()];
    const speed = 0.01 + Math.random() * 0.02;
    return { axis, speed };
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotateOnAxis(
        new THREE.Vector3(...axis).normalize(),
        speed
      );
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshPhysicalMaterial
          transmission={1} 
          transparent
          roughness={0}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.3}
          ior={1.4}                // index of refraction
          color="#639cc6"          // base tint color (light blue)
          reflectivity={1}
          specularIntensity={1}
          envMapIntensity={1}
        />

      </mesh>

      <Text
        position={[0, 0, 0.5]}
        fontSize={0.18}
        color="#fff"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
};

const FloatingText = ({ label, position }) => {
  const textRef = useRef();

  useFrame(() => {
    if (textRef.current) {
      textRef.current.lookAt(0, 0, 5); // Always face camera
    }
  });

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={0.25}
      color="#18E4C7"
      anchorX="center"
      anchorY="middle"
    >
      {label}
    </Text>
  );
};

const RotatingGlobe = () => {
  const globeRef = useRef();

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  const techTags = [
    { label: "HTML", position: [0, 1.2, 0.5] },
    { label: "CSS", position: [-1, 0.8, -0.5] },
    { label: "JS", position: [1, -0.8, 0.4] },
    { label: "DSA", position: [-1.2, -1, 0.2] },
    { label: "MERN", position: [0.5, 1, -1] },
  ];

  const floatingWords = [
    { label: "Learn", position: [0.8, 0.5, -1] },
    { label: "Grow", position: [-1, 1.2, 0] },
    { label: "Upskill", position: [1.3, -0.3, 0.2] },
    { label: "Placement", position: [-0.5, -1.4, -0.8] },
    { label: "Assessments", position: [0.5, 0.4, 0.8] },
  ];

  return (
    <group ref={globeRef}>
      {/* Wireframe globe */}
      <mesh>
        <sphereGeometry args={[2, 8, 8]} />
        <meshBasicMaterial
          color="#00bfff"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Tech bubbles */}
      {techTags.map((tag, index) => (
        <BubbleText key={index} label={tag.label} position={tag.position} />
      ))}

      {/* Motivational words inside the globe */}
      {floatingWords.map((word, index) => (
        <FloatingText key={index} label={word.label} position={word.position} />
      ))}
    </group>
  );
};

const Globe = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <RotatingGlobe />
    </Canvas>
  );
};

export default Globe;
