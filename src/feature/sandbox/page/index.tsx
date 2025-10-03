"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { notification } from "antd";
import { useState } from "react";
import SandboxContextMenu from "../components/ContextMenu";
import SandboxToolbar from "../components/Toolbar";

function SandboxIndex() {
  const [api, contextHolder] = notification.useNotification();

  const [mode, setMode] = useState<"add" | "remove">("add");

  const [isShowContextMenu, setIsShowContextMenu] = useState(false);

  const initialBlockList = [
    {
      x: 0,
      y: 0,
      z: 0,
      type: "stone",
    },
  ];

  const [blockList, setBlockList] = useState(initialBlockList);

  const handleClick = (data: any, position: { x: number; y: number; z: number }) => {
    data.stopPropagation();

    const blockPosition = position;
    const selectedFace = data.normal;

    if (mode === "add") {
      let newBlockPosition = blockPosition;

      if (selectedFace.x !== 0) {
        newBlockPosition = {
          x: blockPosition.x + +selectedFace.x,
          y: blockPosition.y,
          z: blockPosition.z,
        };
      }

      if (selectedFace.y !== 0) {
        newBlockPosition = {
          x: blockPosition.x,
          y: blockPosition.y + +selectedFace.y,
          z: blockPosition.z,
        };
      }

      if (selectedFace.z !== 0) {
        newBlockPosition = {
          x: blockPosition.x,
          y: blockPosition.y,
          z: blockPosition.z + +selectedFace.z,
        };
      }

      setBlockList((prev) => [...prev, { ...newBlockPosition, type: "stone" }]);
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

  return (
    <>
      {contextHolder}

      <main id="canvas-container" className="min-h-screen w-screen h-screen min-w-screen relative">
        <Canvas
          onContextMenu={(e) => {
            if (!isShowContextMenu) {
              setIsShowContextMenu((prev) => !prev);
            }
          }}
          camera={{ position: [3, 3, 3] }}
        >
          <ambientLight intensity={1} />
          {blockList.map((block, index) => {
            const blockId = `block-${block.x}-${block.y}-${block.z}`;

            return (
              <group
                onClick={(data) => handleClick(data, { x: block.x, y: block.y, z: block.z })}
                position={[block.x, block.y, block.z]}
                key={blockId}
              >
                <mesh>
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial color="red" />
                </mesh>

                <mesh>
                  <boxGeometry args={[1.01, 1.01, 1.01]} />
                  <meshStandardMaterial wireframe />
                </mesh>
              </group>
            );
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
