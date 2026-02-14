import { Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import GlowingGold from "../shaders/GlowingGold";
import LoginForm from "./LoginForm";
import RedAlert from "../shaders/RedAlert";
import HealthyGreen from "../shaders/HealthyGreen";

import { AuthorizationContext, type AuthorizationContextType } from "../context/AuthorizationContext";

const BookModel = () => {
    const { scene } = useGLTF('/models/BookMain.glb');
    const gem = scene.getObjectByName("Gem") as THREE.Mesh;
    const bookmark1 = scene.getObjectByName("Bookmark1");
    const bookmark2 = scene.getObjectByName("Bookmark2");

    const initGemMaterial = useRef<THREE.Material | THREE.Material[] | null>(null);
    const [glowGem, setGlowGem] = useState<string>("");
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [isFailed, setIsFailed] = useState<boolean>(false);

    const navigate = useNavigate();
    const [isEntering, setIsEntering] = useState<boolean>(true);
    const angle = useRef(0);
    const [isExiting, setIsExiting] = useState<boolean>(false);
    const [zOffset, setZOffset] = useState<number>(0);

    const { isAuthorized }: AuthorizationContextType = useContext(AuthorizationContext)

    useEffect(() => {
        if (gem && !initGemMaterial.current) {
            initGemMaterial.current = gem.material;
        }
    }, [gem]);

    useEffect(() => {
        if (!gem) return;

        if (isFailed) {
            gem.material = RedAlert;
        } else if (glowGem === "GlowingGold") {
            gem.material = GlowingGold;
        }
        else if (glowGem === "HealthyGreen") {
            gem.material = HealthyGreen
        }
        else if (initGemMaterial.current) {
            gem.material = initGemMaterial.current;
        }
    }, [gem, glowGem, isFailed]);

    useFrame((_, delta) => {
        if (isEntering) {
            const speed = 0.5;
            angle.current += delta * speed;

            if (angle.current >= 1) {
                angle.current = 1;
                setIsEntering(false);
            }
            scene.rotation.x = angle.current * Math.PI * 2
            scene.rotation.y = -angle.current * Math.PI * 2;
            scene.rotation.z = -angle.current * Math.PI * 2;
        }
        if (isExiting) setZOffset((prev) => prev - delta * 10);
        
        if (gem?.material === GlowingGold) {
            GlowingGold.uniforms.uTime.value += delta;
        } else if (gem?.material === RedAlert) {
            RedAlert.uniforms.uTime.value += delta * 2;
        } else if (gem?.material === HealthyGreen) {
            HealthyGreen.uniforms.uTime.value += delta * 1.5;
        }
    });

    useEffect(() => {
        if (zOffset < -5) {
            if (!isAuthorized) {
                navigate("/game-keeper-guest");
            }
            else {
                navigate("/game-keeper");
            }
        }
    }, [zOffset, navigate]);

    const handleLogin = () => {
        if (isFormOpen) return;
        setGlowGem("GlowingGold");
        setIsFormOpen(true);
    };

    const handleGuest = () => {
        setGlowGem("");
        setIsExiting(true);
    };

    return (
        <group position={[0, 0, zOffset]}>
            <primitive object={scene} />
            {bookmark1 && (
                <Html parent={bookmark1} transform position={[-0.81, 0.02, 1.78]} center distanceFactor={3} rotation-x={-Math.PI / 2}>
                    <button className="btn-login" onClick={handleLogin}>Login</button>
                </Html>
            )}
            {isFormOpen && <LoginForm setIsFormOpen={setIsFormOpen} setGlowGem={setGlowGem} setIsFailed={setIsFailed} setIsExiting={setIsExiting}/>}
            {bookmark2 && (
                <Html parent={bookmark2} transform position={[-0.18, 0.03, 1.78]} center distanceFactor={3} rotation-x={-Math.PI / 2}>
                    <button className="btn-guest" onClick={handleGuest}>Guest</button>
                </Html>
            )}
        </group>
    );
};

export default BookModel;