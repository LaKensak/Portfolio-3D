import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

const SkillsHuman = ({ animationName = 'idle', ...props }) => {
    const group = useRef();
    const { nodes, materials } = useGLTF('/models/python_programming_language.glb');

    const { animations: idleAnimation } = useFBX('/models/animations/idle.fbx');
    const { animations: saluteAnimation } = useFBX('/models/animations/salute.fbx');
    const { animations: clappingAnimation } = useFBX('/models/animations/clapping.fbx');
    const { animations: victoryAnimation } = useFBX('/models/animations/victory.fbx');

    idleAnimation[0].name = 'idle';
    saluteAnimation[0].name = 'salute';
    clappingAnimation[0].name = 'clapping';
    victoryAnimation[0].name = 'victory';

    const { actions } = useAnimations(
        [idleAnimation[0], saluteAnimation[0], clappingAnimation[0], victoryAnimation[0]],
        group,
    );

    useEffect(() => {
        actions[animationName].reset().fadeIn(0.5).play();
        return () => actions[animationName].fadeOut(0.5);
    }, [animationName]);

    // État pour la rotation
    const [rotationSpeed] = useState(0.01); // Vitesse de rotation

    // Met à jour la rotation à chaque frame
    useFrame(() => {
        if (group.current) {
            group.current.rotation.y += rotationSpeed; // Rotation autour de l'axe Y
        }
    });

    return (
        <group {...props} dispose={null} ref={group}>
            <mesh
                geometry={nodes.Object_4.geometry}
                material={materials.material}
                position={[-0.002, 0, 0]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={2.501}
            />
            <mesh
                geometry={nodes.Object_6.geometry}
                material={materials['.001']}
                position={[-0.002, 0, 0]}
                rotation={[-Math.PI / 2, 0, -Math.PI]}
                scale={2.501}
            />
        </group>
    );
}

useGLTF.preload('/models/python_programming_language.glb');

export default SkillsHuman;
