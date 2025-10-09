"use client";

import { Button, notification, Table, type TableColumnsType } from "antd";
import * as jose from "jose";
import { useAtom } from "jotai";
import { ItemList } from "../../data/ItemList";
import { blocksPlaced } from "../../store";
import type { BlockProperties } from "../Block";

function getTotalBlocksById(blocks: BlockProperties[]) {
  return blocks.reduce(
    (result, { blockId }) => {
      result[blockId] = (result[blockId] || 0) + 1;
      return result;
    },
    {} as Record<string, number>
  );
}

const columns: TableColumnsType = [
  {
    title: "Block",
    dataIndex: "sprite",
    key: "sprite",
    render: (text: string) => <div className={`items-${text} w-[32px] h-[32px]`} />,
    width: 100,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Total Block",
    dataIndex: "total",
    key: "total",
  },
  {
    title: "Total Stack",
    dataIndex: "total",
    key: "total-stack",
    render: (text: number) => {
      const stackCounter = Math.floor(text / 64);
      const remainingBlock = text % 64;

      return (
        <div>
          {stackCounter > 0 && <>{stackCounter} Stack</>}{" "}
          {remainingBlock > 0 && <>{remainingBlock} Block</>}
        </div>
      );
    },
  },
];

function SandboxTotalBlockRequired() {
  const [api, contexHolder] = notification.useNotification();

  const [blockList] = useAtom<BlockProperties[]>(blocksPlaced);

  const blockCounter = getTotalBlocksById(blockList);
  const data = Object.entries(blockCounter).map(([id, total]) => {
    const blockData = ItemList.find((item) => item.id === id);

    return {
      id,
      total,
      name: blockData?.name,
      sprite: blockData?.spritePosition,
    };
  });

  const handleCopyBlueprint = async () => {
    const token = await new jose.SignJWT({ data: blockList })
      .setProtectedHeader({ alg: "HS256" })
      .sign(new TextEncoder().encode("Seanard-MC-Blueprint"));

    const url = `${window.location.origin}/sandbox/${token}`;

    navigator.clipboard.writeText(url);

    api.info({ message: "Successfully copied the URL!", showProgress: true });
  };

  return (
    <>
      {contexHolder}

      <div className="mb-4">
        <Button className="w-full" variant="outlined" color="default" onClick={handleCopyBlueprint}>
          Share Blueprint
        </Button>
      </div>

      <Table dataSource={data} columns={columns} pagination={false} sticky />
    </>
  );
}

export default SandboxTotalBlockRequired;
