import { useGLTF } from "@react-three/drei";

import skyScene from "../assets/3d/sky.glb";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Sky=({isRotating})=>{
    const sky=useGLTF(skyScene);
    const skyref=useRef();
    useFrame((_,delta)=>{
        if(isRotating){
            skyref.current.rotation.y+=0.25*delta;
        } else {
            skyref.current.rotation.y+=0.05*delta;
        }
    })
    return(
        
        <mesh ref={skyref}>
            <primitive object={sky.scene}/>
        </mesh>
    );
}
export default Sky;