import {Canvas} from "@react-three/fiber"
import { Suspense, useState } from "react";
import Loader from "../Loader";
import Island  from "../../models/Island";
import Sky from "../../models/Sky";
import NightSky from "../../models/nightSky";
import Bird from "../../models/Bird";
import Plane from "../../models/Plane";
import HomeInfo from "../HomeInfo";
import { useTheme } from "../../contexts/ThemeContext";
const Home =()=>{
    const { isDarkMode } = useTheme();
    const adjustIslandForScreenSize = () => {
        let screenScale, screenPosition;
    
        if (window.innerWidth < 768) {
          screenScale = [0.9, 0.9, 0.9];
          screenPosition = [0, -6.5, -43.4];
        } else {
          screenScale = [1, 1, 1];
          screenPosition = [0, -6.5, -43.4];
        }
    
        return [screenScale, screenPosition];
    };
    const adjustPlaneForScreenSize = () => {
        let screenScale, screenPosition;
    
        if (window.innerWidth < 768) {
          screenScale = [2.5, 2.5, 2.5];
          screenPosition = [0, -1.5, 0];
        } else {
          screenScale = [3, 3, 3];
          screenPosition = [0, -4, -4];
        }
    
        return [screenScale, screenPosition];
    };
    const [currentStage, setCurrentStage] = useState(1);
    const [islandScale, islandPosition] = adjustIslandForScreenSize();
    const [PlaneScale,PlanePosition]=adjustPlaneForScreenSize();
    const [isRotating,setIsRotating]=useState(false);
    return(
        <section className="w-full h-screen relative overflow-hidden">
            <div className="absolute flex justify-center items-center top-20 sm:top-28 left-0 right-0 z-10 text-blue-500 px-2">
                {currentStage && <HomeInfo currentStage={currentStage}/>}
            </div>
            <Canvas
                className={`w-full h-screen bg-transparent ${isRotating?'cursor-grabbing':'cursor-grab'}`}
                camera={{near:0.1,far:1000}}
            >
                <Suspense fallback={<Loader/>}/>
                <directionalLight position={[1,1,1]} intensity={3}></directionalLight>
                <ambientLight intensity={.5}></ambientLight>
                <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1}></hemisphereLight>
                {isDarkMode ? <NightSky isRotating={isRotating} /> : <Sky isRotating={isRotating} />}
                <Bird></Bird>
                <Island
                    position={islandPosition}
                    rotation={[0.1, 4.7077, 0]}
                    scale={islandScale}
                    setCurrentStage={setCurrentStage}
                    isRotating={isRotating}
                    setIsRotating={setIsRotating}
                ></Island>
                <Plane
                    PlaneScale={PlaneScale}
                    PlanePosition={PlanePosition}
                    isRotating={isRotating}
                    rotation={[0,20,0.4]}
                    position={[0, -1.5 ,1.4]}
                ></Plane>
            </Canvas>
        </section>
    );
}
export default Home;