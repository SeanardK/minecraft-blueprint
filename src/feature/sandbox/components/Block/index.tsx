import { useTexture } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { listBlockIdWithHeight90Percent } from "../../data/blockNotFull";
import type { ItemType } from "../../data/ItemList";

function SandboxBlock({
  block,
  handleClick,
}: {
  block: { x: number; y: number; z: number; block: ItemType };
  handleClick: (
    data: ThreeEvent<MouseEvent>,
    position: { x: number; y: number; z: number }
  ) => void;
}) {
  const blockId = `block-${block.x}-${block.y}-${block.z}`;

  const defaultTexture = "/images/textures/blocks/dirt.png";
  const fallbackTexture = "/images/textures/blocks/barrier.png";

  const isBlockHeight90Percent = listBlockIdWithHeight90Percent.find(
    (id: string) => id === block.block.id
  );

  const mainTexture = block.block.texture
    ? `/images/textures/blocks/${block.block.texture}.png`
    : "";
  const sideTexture = block.block.sideTexture
    ? `/images/textures/blocks/${block.block.sideTexture}.png`
    : "";
  const topTexture = block.block.topTexture
    ? `/images/textures/blocks/${block.block.topTexture}.png`
    : "";
  const bottomTexture = block.block.bottomTexture
    ? `/images/textures/blocks/${block.block.bottomTexture}.png`
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
  if (block.block.texture) {
    const mainTex = useTexture(
      finalMain
      // { fallback: fallbackTexture }
    );
    materials = Array(6).fill(new THREE.MeshStandardMaterial({ map: mainTex, transparent: true }));
  } else {
    const [sideTex, topTex, bottomTex] = useTexture([
      finalSide,
      finalTop,
      finalBottom,
      // { fallback: fallbackTexture },
    ]);
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
      if (block.block.texture) {
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
  }, [
    block.block.texture,
    block.block.sideTexture,
    block.block.topTexture,
    block.block.bottomTexture,
  ]);

  return (
    <group
      onClick={(data) => handleClick(data, { x: block.x, y: block.y, z: block.z })}
      position={[block.x, isBlockHeight90Percent ? block.y : block.y, block.z]}
      key={blockId}
    >
      <mesh
        material={materials}
        position={[
          0,
          isBlockHeight90Percent ? (block.block.id === "120" ? -0.09375 : -0.035) : 0,
          0,
        ]}
      >
        <boxGeometry
          args={[1, isBlockHeight90Percent ? (block.block.id === "120" ? 0.8125 : 0.93) : 1, 1]}
        />
      </mesh>

      {/* <mesh>
        <boxGeometry args={[1.01, 1.01, 1.01]} />
        <meshStandardMaterial wireframe />
      </mesh> */}
    </group>
  );
}

export default SandboxBlock;
