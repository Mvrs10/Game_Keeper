import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useEffect } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const CameraController = () => {
    const controlsRef = useRef<OrbitControlsImpl>(null);
    const { camera } = useThree();

    const initPos: [number,number,number] = [0,4,0.1];
    const initTarget: [number,number,number] = [0,0,0];

    useEffect(() => {
        const handleKeyPressed = (e: KeyboardEvent) => {
            if (e.key === "ArrowUp") {
                camera.position.set(...initPos);
                if (controlsRef.current){
                    controlsRef.current.target.set(...initTarget);
                    controlsRef.current.update();
                }
            }
        }

        window.addEventListener("keydown", handleKeyPressed);
        return () => window.removeEventListener("keydown", handleKeyPressed);
    },[camera])

    return <OrbitControls ref={controlsRef} makeDefault />;
}

export default CameraController;