"use client";

import { Button, Checkbox, notification, Table, type TableColumnsType } from "antd";
import * as jose from "jose";
import { useAtom } from "jotai";
import { ItemList } from "../../data/ItemList";
import { blocksPlaced, hideBlockId } from "../../store";
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

function SandboxTotalBlockRequired() {
  const [api, contexHolder] = notification.useNotification();

  const [blockList] = useAtom<BlockProperties[]>(blocksPlaced);
  const [blocksHidden, setBlocksHidden] = useAtom(hideBlockId);

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

  const handleClickShow = (id: string) => {
    const index = blocksHidden.indexOf(id);

    if (index === -1) {
      setBlocksHidden((prev) => [...prev, id]);
    } else {
      setBlocksHidden((prev) => prev.filter((_, indexItem) => index !== indexItem));
    }
  };

  const columns: TableColumnsType = [
    {
      title: "Show",
      dataIndex: "id",
      key: "id",
      render: (value: string) => (
        <Checkbox checked={!blocksHidden.includes(value)} onClick={() => handleClickShow(value)} />
        // <div className={`items-${text} w-[32px] h-[32px]`} />
      ),
      width: 70,
      align: "center",
    },
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
      key: "total",
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
