import {Html} from "@react-three/drei";
const Loader=()=>{
    return(
        <Html>
            <div className="flex justify-center items-center">
                <div className="w-20 h-20 items-center bg-blue-500 rounded-full border-opacity-20 animate-spin">

                </div>
            </div>
        </Html>
    );
}
export default Loader;