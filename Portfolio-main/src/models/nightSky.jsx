import { useGLTF } from "@react-three/drei";

import nightSkyScene from "../assets/3d/nightSky.glb";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const NightSky=({isRotating})=>{
    const nightSky=useGLTF(nightSkyScene);
    const nightSkyRef=useRef();
    useFrame((_,delta)=>{
        if(isRotating){
            nightSkyRef.current.rotation.y+=0.25*delta;
        } else {
            nightSkyRef.current.rotation.y+=0.05*delta;
        }
    })
    return(
        
        <mesh ref={nightSkyRef} scale={[50, 50, 50]}>
            <primitive object={nightSky.scene}/>
        </mesh>
    );
}
export default NightSky;