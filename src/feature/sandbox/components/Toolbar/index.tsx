"use client";

import "./item-icon.css";

import { Button, Card, Input, Modal } from "antd";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { AiOutlineTable } from "react-icons/ai";
import { MdNumbers } from "react-icons/md";
import { ItemList, type ItemType } from "../../data/ItemList";
import {
  activeToolbarIndex,
  layerShowed as layering,
  listToolbarItems,
  selectedBlock,
} from "../../store";
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

  const [layerShowed, setLayerShowed] = useAtom(layering);

  useEffect(() => {
    setSelectedBlock(listToolbar[activeToolbar]);
  }, [activeToolbar, setSelectedBlock, listToolbar]);

  return (
    <>
      <div className="absolute w-screen bottom-4">
        <div className="w-full z-10 flex justify-center gap-0.5 px-2">
          <div className="lg:block hidden">
            <Button
              className="!w-[50px] !h-[50px] text-xl font-bold mr-4"
              onClick={() => {
                setShowModalTotalBlockRequired(true);
              }}
            >
              <MdNumbers size={32} />
            </Button>
          </div>

          <div className="absolute -top-15 max-w-[600px] w-full px-2 lg:px-0">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Card className="[&_.ant-card-body]:!p-2">
                <div className="flex flex-1 items-center justify-center gap-2">
                  <Input
                    value={layerShowed.x.min}
                    onChange={(value) =>
                      setLayerShowed((prev) => {
                        return {
                          ...prev,
                          x: {
                            ...prev.x,
                            min:
                              value.target.value === "" ? -Infinity : parseInt(value.target.value),
                          },
                        };
                      })
                    }
                    type="number"
                    placeholder="X Start"
                  />
                  <Input
                    value={layerShowed.x.max}
                    onChange={(value) =>
                      setLayerShowed((prev) => ({
                        ...prev,
                        x: {
                          ...prev.x,
                          max: value.target.value === "" ? Infinity : parseInt(value.target.value),
                        },
                      }))
                    }
                    type="number"
                    placeholder="X End"
                  />
                </div>
              </Card>

              <Card className="[&_.ant-card-body]:!p-2">
                <div className="flex flex-1 items-center justify-center gap-2">
                  <Input
                    value={layerShowed.y.min}
                    onChange={(value) =>
                      setLayerShowed((prev) => ({
                        ...prev,
                        y: {
                          ...prev.y,
                          min: value.target.value === "" ? -Infinity : parseInt(value.target.value),
                        },
                      }))
                    }
                    type="number"
                    placeholder="Y Start"
                  />
                  <Input
                    value={layerShowed.y.max}
                    onChange={(value) =>
                      setLayerShowed((prev) => ({
                        ...prev,
                        y: {
                          ...prev.y,
                          max: value.target.value === "" ? Infinity : parseInt(value.target.value),
                        },
                      }))
                    }
                    type="number"
                    placeholder="Y End"
                  />
                </div>
              </Card>

              <Card className="[&_.ant-card-body]:!p-2">
                <div className="flex flex-1 items-center justify-center gap-2">
                  <Input
                    value={layerShowed.z.min}
                    onChange={(value) =>
                      setLayerShowed((prev) => ({
                        ...prev,
                        z: {
                          ...prev.z,
                          min: value.target.value === "" ? -Infinity : parseInt(value.target.value),
                        },
                      }))
                    }
                    type="number"
                    placeholder="Z Start"
                  />
                  <Input
                    value={layerShowed.z.max}
                    onChange={(value) =>
                      setLayerShowed((prev) => ({
                        ...prev,
                        z: {
                          ...prev.z,
                          max: value.target.value === "" ? Infinity : parseInt(value.target.value),
                        },
                      }))
                    }
                    type="number"
                    placeholder="Z End"
                  />
                </div>
              </Card>
            </div>
          </div>

          <Toolbar
            listToolbar={listToolbar}
            activeToolbar={activeToolbar}
            setActiveToolbar={setActiveToolbar}
          />

          <div className="lg:block hidden">
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

        <div className="flex justify-center mt-3 lg:hidden gap-2">
          <Button
            className="!w-[50px] !h-[50px] text-xl font-bold"
            onClick={() => {
              setShowModalTotalBlockRequired(true);
            }}
          >
            <MdNumbers size={32} />
          </Button>

          <Button
            className="!w-[50px] !h-[50px] text-xl font-bold !p-0"
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
        <div className="overflow-auto max-h-[80vh] max-w-[600px]">
          <SandboxTotalBlockRequired />
        </div>
      </Modal>
    </>
  );
}

export default SandboxToolbar;
