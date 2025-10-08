"use client";

import "./item-icon.css";

import { Button, Modal } from "antd";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { AiOutlineTable } from "react-icons/ai";
import { MdNumbers } from "react-icons/md";
import { ItemList, type ItemType } from "../../data/ItemList";
import { activeToolbarIndex, listToolbarItems, selectedBlock } from "../../store";
import SandboxTotalBlockRequired from "../TotalBlockRequired";

// Local Components
type ToolbarProps = {
  listToolbar: ItemType[];
  activeToolbar: number;
  setActiveToolbar: (index: number) => void;
};
const Toolbar = ({ listToolbar, activeToolbar, setActiveToolbar }: ToolbarProps) => (
  <>
    {listToolbar.map((v, index) => {
      return (
        <Button
          color={activeToolbar === index ? "cyan" : "default"}
          variant={activeToolbar === index ? "solid" : "outlined"}
          className="!w-[50px] !h-[50px] !p-0"
          key={`toolbar-${index}`}
          onClick={() => {
            setActiveToolbar(index);
          }}
        >
          <div className={`items-${v.spritePosition} w-[32px] h-[32px]`} />
        </Button>
      );
    })}
  </>
);

// Main Component
function SandboxToolbar() {
  const [showNodalItems, setShowModalItems] = useState(false);
  const [showModalTotalBlockRequired, setShowModalTotalBlockRequired] = useState(false);

  const [_, setSelectedBlock] = useAtom(selectedBlock);
  const [activeToolbar, setActiveToolbar] = useAtom(activeToolbarIndex);
  const [listToolbar, setListToolbar] = useAtom(listToolbarItems);

  useEffect(() => {
    setSelectedBlock(listToolbar[activeToolbar]);
  }, [activeToolbar, setSelectedBlock, listToolbar]);

  return (
    <>
      <div className="absolute w-screen bottom-4">
        <div className="w-full z-10 flex justify-center gap-0.5">
          <Button
            className="!w-[50px] !h-[50px] text-xl font-bold mr-4"
            onClick={() => {
              setShowModalTotalBlockRequired(true);
            }}
          >
            <MdNumbers size={32} />
          </Button>
          <Toolbar
            listToolbar={listToolbar}
            activeToolbar={activeToolbar}
            setActiveToolbar={setActiveToolbar}
          />
          <Button
            className="!w-[50px] !h-[50px] text-xl font-bold ml-4 !p-0"
            onClick={() => {
              setShowModalItems(true);
            }}
          >
            <AiOutlineTable size={32} />
          </Button>
        </div>
      </div>

      {/* Inventory Modal */}
      <Modal
        open={showNodalItems}
        onCancel={() => setShowModalItems(false)}
        centered
        closable={false}
        footer={null}
        className="!w-auto !min-w-0"
      >
        <div className="max-h-[300px] max-w-[470px] overflow-auto">
          {ItemList.map((v, index) => {
            return (
              <Button
                className="!w-[50px] !h-[50px] !p-0"
                key={`items-${v.id}-${index}`}
                onClick={() => {
                  const newList = [...listToolbar];

                  newList[activeToolbar] = v;

                  setListToolbar(newList);
                  setSelectedBlock(v);
                }}
              >
                <div className={`items-${v.spritePosition} w-[32px] h-[32px]`} />
              </Button>
            );
          })}
        </div>

        <div className="mt-4">
          <Toolbar
            listToolbar={listToolbar}
            activeToolbar={activeToolbar}
            setActiveToolbar={setActiveToolbar}
          />
        </div>
      </Modal>

      {/* Total Block Required */}
      <Modal
        open={showModalTotalBlockRequired}
        onCancel={() => setShowModalTotalBlockRequired(false)}
        centered
        closable={false}
        footer={null}
        className="!w-auto !min-w-0"
      >
        <div className="overflow-auto max-h-[80vh] max-w-[500px]">
          <SandboxTotalBlockRequired />
        </div>
      </Modal>
    </>
  );
}

export default SandboxToolbar;
