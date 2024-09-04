import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  lazy,
  Suspense,
} from "react";
import data from "./data.json";
import { Nullable } from "./types/common";
import classNames from "classnames";
import LazyImage from "./components/lazy-image";
import useDragAndDropItems from "./hooks/useDragAndDropItems";

const Modal = lazy(() => import("./components/modal"));

function App() {
  const [clickedId, setClickedId] = useState<Nullable<string>>(null);
  const { list, dragItem, dragOverItem, onDragEnd, dragEnter, dragStart } =
    useDragAndDropItems();

  const selectedImage = useMemo(() => {
    const selected = data.find((_d) => _d.type === clickedId);
    if (selected) {
      return list[selected.position].image;
    }
  }, [clickedId, list]);

  const onClickedImage = useCallback((id: string) => {
    setClickedId(id);
  }, []);

  const onCloseModal = useCallback(() => {
    setClickedId(null);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        setClickedId(null);
      }
    });

    return () => {
      window.removeEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          setClickedId(null);
        }
      });
    };
  }, []);

  return (
    <>
      <div className="container m-auto pt-4 md:pt-10 p-2 md:p-4 max-w-[600px]">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {list.map((_data, index) => (
            <div
              className={classNames("transition-all", {
                "opacity-40":
                  dragItem === index.toString() ||
                  dragOverItem === index.toString(),
              })}
              id={index.toString()}
              key={index}
              draggable
              onDragStart={(e) => dragStart(e, index)}
              onDragEnter={(e) => dragEnter(e, index)}
              onDragEnd={onDragEnd}
            >
              <p>{_data.title}</p>
              <LazyImage
                draggable={false}
                alt="Cat placeholder"
                src={_data.image}
                className="w-full h-auto aspect-square border rounded-md"
                onClick={() => onClickedImage(_data.type)}
              />
            </div>
          ))}
        </div>
      </div>
      {clickedId && (
        <Suspense fallback={"loading..."}>
          <Modal onClose={onCloseModal}>
            <img
              alt="Placeholder alt"
              className="w-[80%] h-auto m-auto"
              src={selectedImage}
            />
          </Modal>
        </Suspense>
      )}
    </>
  );
}

export default App;
