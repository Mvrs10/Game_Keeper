import { Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import GlowingGem from "../shaders/GlowingGem";
import LoginForm from "./LoginForm";
import RedAlert from "../shaders/RedAlert";

const BookModel = () => {
    const { scene } = useGLTF('/models/BookMain.glb');
    const gem = scene.getObjectByName("Gem") as THREE.Mesh;
    const bookmark1 = scene.getObjectByName("Bookmark1");
    const bookmark2 = scene.getObjectByName("Bookmark2");

    const initGemMaterial = useRef<THREE.Material | THREE.Material[] | null>(null);
    const [glowGem, setGlowGem] = useState<boolean>(false);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [isFailed, setIsFailed] = useState<boolean>(false);

    const navigate = useNavigate();
    const [isExiting, setIsExiting] = useState<boolean>(false);
    const [zOffset, setZOffset] = useState<number>(0);

    // 1. Capture original material IMMEDIATELY when gem loads
    useEffect(() => {
        if (gem && !initGemMaterial.current) {
            initGemMaterial.current = gem.material;
        }
    }, [gem]);

    // 2. Priority Logic: Red > Purple > Default
    useEffect(() => {
        if (!gem) return;

        if (isFailed) {
            gem.material = RedAlert;
        } else if (glowGem) {
            gem.material = GlowingGem;
        } else if (initGemMaterial.current) {
            gem.material = initGemMaterial.current;
        }
    }, [gem, glowGem, isFailed]);

    // 3. Animation Loop
    useFrame((_, delta) => {
        if (isExiting) setZOffset((prev) => prev - delta * 10);
        
        if (gem?.material === GlowingGem) {
            GlowingGem.uniforms.uTime.value += delta;
        } else if (gem?.material === RedAlert) {
            RedAlert.uniforms.uTime.value += delta * 2;
        }
    });

    useEffect(() => {
        if (zOffset < -5) navigate("/game-keeper");
    }, [zOffset, navigate]);

    const handleLogin = () => {
        if (isFormOpen) return;
        setGlowGem(true);
        setIsFormOpen(true);
    };

    const handleGuest = () => {
        setGlowGem(false);
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
            {isFormOpen && <LoginForm setIsFormOpen={setIsFormOpen} setGlowGem={setGlowGem} setIsFailed={setIsFailed} />}
            {bookmark2 && (
                <Html parent={bookmark2} transform position={[-0.18, 0.03, 1.78]} center distanceFactor={3} rotation-x={-Math.PI / 2}>
                    <button className="btn-guest" onClick={handleGuest}>Guest</button>
                </Html>
            )}
        </group>
    );
};

export default BookModel;