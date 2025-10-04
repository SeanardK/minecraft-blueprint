import { useTexture } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import { useEffect, useState } from "react";
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

  const croppedTextId = block.block.textId.split(":")[1].replace(")", "");

  const mainTexture = `/images/textures/blocks/${croppedTextId}.png`;
  const defaultTexture = "/images/textures/blocks/dirt.png";
  const fallbackTexture = "/images/textures/blocks/barrier.png";

  const [finalTexturePath, setFinalTexturePath] = useState(defaultTexture);

  useEffect(() => {
    const img = new window.Image();
    img.src = mainTexture;
    img.onload = () => setFinalTexturePath(mainTexture);
    img.onerror = () => setFinalTexturePath(fallbackTexture);
  }, [mainTexture]);

  const texture = useTexture(finalTexturePath);

  return (
    <group
      onClick={(data) => handleClick(data, { x: block.x, y: block.y, z: block.z })}
      position={[block.x, block.y, block.z]}
      key={blockId}
    >
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* <mesh>
        <boxGeometry args={[1.01, 1.01, 1.01]} />
        <meshStandardMaterial wireframe />
      </mesh> */}
    </group>
  );
}

export default SandboxBlock;
