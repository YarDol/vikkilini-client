import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import {
  useCursor,
  MeshPortalMaterial,
  CameraControls,
  Gltf,
  Text,
} from "@react-three/drei";
import { useRoute, useLocation } from "wouter";
import { easing, geometry } from "maath";
import { useSelector } from "react-redux";

extend(geometry);

export const SceneApp = () => {
  const { zoom, horizontalRotation, verticalRotation, number } = useSelector(
    (state) => state.global
  );

  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      camera={{ fov: 75, position: [0, 0, 20] }}
      eventSource={document.getElementById("root")}
      eventPrefix="client"
    >
      <color attach="background" args={["#f0f0f0"]} />
      <Frame
        id="01"
        name={`pick\nles`}
        bg="#e4cdac"
        position={[-1.15, 0, 0]}
        rotation={[0, 0.5, 0]}
      >
        <Gltf
          src="pickles_3d_version_of_hyuna_lees_illustration-transformed.glb"
          scale={8}
          position={[0, -0.7, -2]}
        />
      </Frame>
      <Frame id="02" name="tea">
        <Gltf src="fiesta_tea-transformed.glb" position={[0, -2, -3]} />
      </Frame>
      <Frame
        id="03"
        name="still"
        bg="#d1d1ca"
        position={[1.15, 0, 0]}
        rotation={[0, -0.5, 0]}
      >
        <Gltf
          src="still_life_based_on_heathers_artwork-transformed.glb"
          scale={2}
          position={[0, -0.8, -4]}
        />
      </Frame>
      <Rig
        zoom={zoom}
        horizontalRotation={horizontalRotation}
        verticalRotation={verticalRotation}
        number={number}
      />
    </Canvas>
  );
};

function Frame({
  id,
  name,
  author,
  bg,
  width = 1,
  height = 1.61803398875,
  children,
  ...props
}) {
  const portal = useRef();
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/hand/item/:id");
  const [hovered, hover] = useState(false);
  useCursor(hovered);

  useFrame((state, dt) =>
    easing.damp(portal.current, "blend", params?.id === id ? 1 : 0, 0.2, dt)
  );

  return (
    <group {...props}>
      <Text
        fontSize={0.3}
        anchorY="top"
        anchorX="left"
        lineHeight={0.8}
        position={[-0.375, 0.715, 0.01]}
        material-toneMapped={false}
      >
        {name}
      </Text>
      <Text
        fontSize={0.1}
        anchorX="right"
        position={[0.4, -0.659, 0.01]}
        material-toneMapped={false}
      >
        /{id}
      </Text>
      <mesh
        name={id}
        onDoubleClick={(e) => (
          e.stopPropagation(), setLocation("/hand/item/" + e.object.name)
        )}
        onPointerOver={(e) => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <roundedPlaneGeometry args={[width, height, 0.1]} />
        <MeshPortalMaterial
          ref={portal}
          events={params?.id === id}
          side={THREE.DoubleSide}
        >
          <color attach="background" args={[bg]} />
          {children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  );
}

function Rig({
  position = new THREE.Vector3(0, 0, 2),
  focus = new THREE.Vector3(0, 0, 0),
  zoom,
  horizontalRotation,
  verticalRotation,
  number,
}) {
  const [, setLocation] = useLocation();
  const { controls, scene } = useThree();
  const [, params] = useRoute("/hand/item/:id");

  // apply current screen
  useEffect(() => {
    if (number === 0) {
      setLocation("/hand");
    } else {
      setLocation("/hand/item/0" + number);
    }
  }, [number, setLocation]);

  // apply zoom in and zoom out
  useEffect(() => {
    position.set(0, 0, zoom / 10);
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
  }, [zoom, controls, position, focus]);

  // apply rotation
  useEffect(() => {
    scene.rotation.y += horizontalRotation * 3;
    scene.rotation.x += verticalRotation * -1;
  }, [horizontalRotation, verticalRotation, scene]);

  useEffect(() => {
    const active = scene.getObjectByName(params?.id);
    if (active) {
      active.parent.localToWorld(position.set(0, 0.5, 0.25));
      active.parent.localToWorld(focus.set(0, 0, -2));
    }

    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
  });

  return (
    <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
  );
}

export default SceneApp;
