"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, type ThreeEvent } from "@react-three/fiber";
import { notification } from "antd";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import SandboxBlock, { type BlockProperties } from "../components/Block";
import SandboxContextMenu from "../components/ContextMenu";
import SandboxToolbar from "../components/Toolbar";
import { blocksPlaced, hideBlockId, selectedBlock } from "../store";

function SandboxIndex({ data }: { data?: BlockProperties[] }) {
  const [api, contextHolder] = notification.useNotification();

  const [mode, setMode] = useState<"add" | "remove">("add");

  const [isShowContextMenu, setIsShowContextMenu] = useState(false);

  const [selectedBlockLocale] = useAtom(selectedBlock);
  const [blocksHidden] = useAtom(hideBlockId);

  const initialBlockList: {
    x: number;
    y: number;
    z: number;
    blockId: string;
  }[] = [
    {
      x: 0,
      y: 0,
      z: 0,
      blockId: "2",
    },
  ];
  const [blockList, setBlockList] = useAtom(blocksPlaced);

  const showedBlock = useMemo(() => {
    return blockList.filter((block) => !blocksHidden.includes(block.blockId));
  }, [blockList, blocksHidden]);

  const handleClick = (
    data: ThreeEvent<MouseEvent>,
    position: { x: number; y: number; z: number }
  ) => {
    data.stopPropagation();

    const blockPosition = position;
    const selectedFace = data.normal;

    if (mode === "add") {
      let newBlockPosition = blockPosition;

      if (selectedFace) {
        if (selectedFace?.x !== 0) {
          newBlockPosition = {
            x: blockPosition.x + selectedFace?.x,
            y: blockPosition.y,
            z: blockPosition.z,
          };
        }

        if (selectedFace?.y !== 0) {
          newBlockPosition = {
            x: blockPosition.x,
            y: blockPosition.y + +selectedFace?.y,
            z: blockPosition.z,
          };
        }

        if (selectedFace?.z !== 0) {
          newBlockPosition = {
            x: blockPosition.x,
            y: blockPosition.y,
            z: blockPosition.z + +selectedFace?.z,
          };
        }
      }

      setBlockList((prev) => [...prev, { ...newBlockPosition, blockId: selectedBlockLocale.id }]);
    }

    if (mode === "remove") {
      if (blockList.length === 1)
        return api.error({
          message: "Can't Delete Last Block",
          showProgress: true,
        });

      setBlockList((prev) =>
        prev.filter(
          (block) =>
            !(
              block.x === blockPosition.x &&
              block.y === blockPosition.y &&
              block.z === blockPosition.z
            )
        )
      );
    }
  };

  useEffect(() => {
    if (data) {
      setBlockList(data);
    }
  }, [data]);

  return (
    <>
      {contextHolder}

      <main id="canvas-container" className="min-h-dvh w-dvw h-dvh min-w-dvw relative">
        <Canvas
          onContextMenu={() => {
            if (!isShowContextMenu) {
              setIsShowContextMenu((prev) => !prev);
            }
          }}
          camera={{ position: [3, 3, 3] }}
        >
          <ambientLight intensity={1} />
          {showedBlock.map((block, index) => {
            const blockId = `block-${block.x}-${block.y}-${block.z}-${index}`;

            return <SandboxBlock block={block} handleClick={handleClick} key={blockId} />;
          })}

          <OrbitControls />
        </Canvas>

        <SandboxToolbar />

        <SandboxContextMenu
          isOpen={isShowContextMenu}
          activeMode={mode}
          setMode={setMode}
          handleResetBlockList={() => setBlockList(initialBlockList)}
          handleClose={() => setIsShowContextMenu(false)}
        />
      </main>
    </>
  );
}

export default SandboxIndex;
