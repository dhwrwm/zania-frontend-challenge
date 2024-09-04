import { DragEvent, useCallback, useEffect, useState } from "react";
import { DragItem } from "../types/drag-and-drop";
import { Nullable } from "../types/common";
import { getBlocks, updateBlocks } from "../services/blocks";

const useDragAndDropItems = () => {
  const [dragItem, setDragItem] = useState<Nullable<string>>(null);
  const [dragOverItem, setDragOverItem] = useState<Nullable<string>>(null);
  const [list, setList] = useState<DragItem[]>([]);

  const dragStart = useCallback(
    (e: DragEvent<HTMLDivElement>, position: any) => {
      setDragItem(e.currentTarget.id);
    },
    []
  );

  const dragEnter = useCallback(
    (e: DragEvent<HTMLDivElement>, position: any) => {
      if (e.currentTarget.id !== dragItem) {
        setDragOverItem(e.currentTarget.id);
      }
    },
    [dragItem]
  );

  const onDragEnd = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      const dragObject = list[Number(dragItem)];
      const dragOverObject = list[Number(dragOverItem)];
      if (dragObject && dragOverObject) {
        let list2 = list.slice();
        const item1 = list[Number(dragItem)];
        list2[Number(dragItem)] = list2[Number(dragOverItem)];
        list2[Number(dragOverItem)] = item1;

        setList(list2);
        updateBlocks(list2)
          .then((data) => console.log("data is", data))
          .catch((err) => console.log("error is", err));
      }
      setDragItem(null);
      setDragOverItem(null);
    },
    [dragItem, dragOverItem, list]
  );

  useEffect(() => {
    getBlocks<DragItem[]>()
      .then((data) => {
        setList(data);
      })
      .catch((err) => console.log("error is", err));
  }, []);

  return {
    dragItem,
    dragOverItem,
    list,
    dragStart,
    dragEnter,
    onDragEnd,
    setList,
  };
};

export default useDragAndDropItems;
