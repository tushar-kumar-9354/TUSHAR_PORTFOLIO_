import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import fox from "../assets/3d/fox.glb";

const AssistantFox = ({ isListening, isSpeaking, scale = [0.35, 0.35, 0.35], position = [0, -0.5, 0], ...props }) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(fox);
  const { actions } = useAnimations(animations, group);

  // Animation states based on assistant activity
  useEffect(() => {
    // Stop all animations first
    Object.values(actions).forEach(action => {
      action.stop();
    });

    // Play appropriate animation
    if (isSpeaking && actions['Survey']) {
      actions['Survey'].play();
    } else if (isListening && actions['Walk']) {
      actions['Walk'].play();
    } else if (actions['Idle']) {
      actions['Idle'].play();
    }
  }, [actions, isListening, isSpeaking]);

  // Floating animation for the assistant
  useFrame((state) => {
    if (group.current) {
      group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      
      // Subtle rotation when listening
      if (isListening) {
        group.current.rotation.y = Math.sin(state.clock.elapsedTime * 3) * 0.1;
      } else {
        group.current.rotation.y = 0;
      }
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene" scale={scale} position={position}>
        <primitive object={nodes.GLTF_created_0_rootJoint} />
        <skinnedMesh
          name="Object_7"
          geometry={nodes.Object_7.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_7.skeleton}
        />
        <skinnedMesh
          name="Object_8"
          geometry={nodes.Object_8.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_8.skeleton}
        />
        <skinnedMesh
          name="Object_9"
          geometry={nodes.Object_9.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_9.skeleton}
        />
        <skinnedMesh
          name="Object_10"
          geometry={nodes.Object_10.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_10.skeleton}
        />
        <skinnedMesh
          name="Object_11"
          geometry={nodes.Object_11.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_11.skeleton}
        />
      </group>
    </group>
  );
};

useGLTF.preload(fox);

export default AssistantFox;