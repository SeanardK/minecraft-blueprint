import { useTexture } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { ItemList } from "../../data/ItemList";

export type BlockProperties = {
  x: number;
  y: number;
  z: number;
  facing?: [number, number, number];
  blockId: string;
};

function SandboxStair({
  block,
  handleClick,
}: {
  block: BlockProperties;
  handleClick: (
    data: ThreeEvent<MouseEvent>,
    position: { x: number; y: number; z: number }
  ) => void;
}) {
  const blockData = useMemo(
    () => ItemList.find((item) => item.id === block.blockId),
    [block.blockId]
  );

  const blockId = `block-${block.x}-${block.y}-${block.z}`;

  const defaultTexture = "/images/textures/blocks/dirt.png";
  const fallbackTexture = "/images/textures/blocks/barrier.png";

  const mainTexture = blockData?.texture ? `/images/textures/blocks/${blockData?.texture}.png` : "";
  const sideTexture = blockData?.sideTexture
    ? `/images/textures/blocks/${blockData?.sideTexture}.png`
    : "";
  const topTexture = blockData?.topTexture
    ? `/images/textures/blocks/${blockData?.topTexture}.png`
    : "";
  const bottomTexture = blockData?.bottomTexture
    ? `/images/textures/blocks/${blockData?.bottomTexture}.png`
    : "";

  const [finalMain, setFinalMain] = useState(defaultTexture);
  const [finalSide, setFinalSide] = useState(defaultTexture);
  const [finalTop, setFinalTop] = useState(defaultTexture);
  const [finalBottom, setFinalBottom] = useState(defaultTexture);

  function checkImage(url: string, fallback: string): Promise<string> {
    return new Promise((resolve) => {
      if (!url) return resolve(fallback);
      const img = new window.Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(fallback);
      img.src = url;
    });
  }

  let materials: THREE.Material[];
  if (blockData?.texture) {
    const mainTex = useTexture(finalMain);
    materials = Array(6).fill(new THREE.MeshStandardMaterial({ map: mainTex, transparent: true }));
  } else {
    const [sideTex, topTex, bottomTex] = useTexture([finalSide, finalTop, finalBottom]);
    materials = [
      new THREE.MeshStandardMaterial({ map: sideTex, transparent: true }),
      new THREE.MeshStandardMaterial({ map: sideTex, transparent: true }),
      new THREE.MeshStandardMaterial({ map: topTex, transparent: true }),
      new THREE.MeshStandardMaterial({ map: bottomTex, transparent: true }),
      new THREE.MeshStandardMaterial({ map: sideTex, transparent: true }),
      new THREE.MeshStandardMaterial({ map: sideTex, transparent: true }),
    ];
  }

  useEffect(() => {
    let mounted = true;
    async function fetchTextures() {
      if (blockData?.texture) {
        const main = await checkImage(mainTexture, fallbackTexture);
        if (mounted) setFinalMain(main);
      } else {
        const side = await checkImage(sideTexture, fallbackTexture);
        const top = await checkImage(topTexture, fallbackTexture);
        const bottom = await checkImage(bottomTexture, fallbackTexture);
        if (mounted) {
          setFinalSide(side);
          setFinalTop(top);
          setFinalBottom(bottom);
        }
      }
    }
    fetchTextures();
    return () => {
      mounted = false;
    };
  }, [blockData?.texture, blockData?.sideTexture, blockData?.topTexture, blockData?.bottomTexture]);

  const rotation = useMemo(() => {
    const angleMap: Record<string, number> = {
      "0,0,-1": 0 + 180,
      "-1,0,0": 90 + 180,
      "0,0,1": 180 + 180,
      "1,0,0": 270 + 180,
    };

    const key = block?.facing?.toString();
    return new THREE.Euler(0, THREE.MathUtils.degToRad(angleMap[key || "0,0,-1"] ?? 0), 0);
  }, [block.facing]);

  return (
    <group
      onClick={(data) => handleClick(data, { x: block.x, y: block.y, z: block.z })}
      position={[block.x, -0.25, block.z]}
      key={blockId}
      rotation={rotation}
    >
      <mesh material={materials} position={[0, 0.5, -0.25]}>
        <boxGeometry args={[1, 0.5, 0.5]} />
      </mesh>
      <mesh material={materials} position={[0, 0, 0]}>
        <boxGeometry args={[1, 0.5, 1]} />
      </mesh>

      {/* <mesh>
        <boxGeometry args={[1.01, 1.01, 1.01]} />
        <meshStandardMaterial wireframe />
      </mesh> */}
    </group>
  );
}

export default SandboxStair;
