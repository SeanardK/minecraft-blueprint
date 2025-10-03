"use client";

import { Button, Modal } from "antd";

type SandboxContextMenuProps = {
  isOpen: boolean;
  activeMode: "add" | "remove";
  setMode: (mode: "add" | "remove") => void;
  handleResetBlockList: () => void;
  handleClose: () => void;
};

function SandboxContextMenu({
  isOpen,
  activeMode,
  setMode,
  handleResetBlockList,
  handleClose,
}: SandboxContextMenuProps) {
  const handleChangeMode = (mode: "add" | "remove") => {
    setMode(mode);
    handleClose();
  };
  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      centered
      closable={false}
      footer={null}
      className="!w-auto !min-w-0 "
    >
      <div className="flex gap-2">
        <Button
          size="large"
          onClick={() => {
            handleChangeMode("add");
          }}
          type={activeMode === "add" ? "primary" : "default"}
        >
          ADD
        </Button>

        <Button
          size="large"
          onClick={() => {
            handleChangeMode("remove");
          }}
          type={activeMode === "remove" ? "primary" : "default"}
        >
          REMOVE
        </Button>

        <Button
          size="large"
          color="danger"
          variant="solid"
          onClick={() => {
            handleResetBlockList();
            handleClose();
          }}
        >
          RESET
        </Button>
      </div>
    </Modal>
  );
}

export default SandboxContextMenu;
