"use client";

import "./item-icon.css";

import { Button, Modal } from "antd";
import { useState } from "react";
import { AiOutlineTable } from "react-icons/ai";
import { ItemList, type ItemType } from "../../data/ItemList";

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
          key={index}
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
  const [activeToolbar, setActiveToolbar] = useState(0);

  const [listToolbar, setListToolbar] = useState(ItemList.slice(1, 10));

  return (
    <>
      <div className="absolute w-screen bottom-4">
        <div className="w-full z-10 flex justify-center gap-0.5">
          <Button
            className="!w-[50px] !h-[50px] text-xl font-bold mr-4 invisible"
            onClick={() => {
              setShowModalItems(true);
            }}
          >
            +
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

      <Modal
        open={showNodalItems}
        onCancel={() => setShowModalItems(false)}
        centered
        closable={false}
        footer={null}
        className="!w-auto !min-w-0"
      >
        <div className="max-h-[300px] max-w-[470px] overflow-auto">
          {ItemList.map((v) => {
            return (
              <Button
                className="!w-[50px] !h-[50px] !p-0"
                key={`items-${v.id}`}
                onClick={() => {
                  const newList = [...listToolbar];

                  newList[activeToolbar] = v;

                  setListToolbar(newList);
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
    </>
  );
}

export default SandboxToolbar;
