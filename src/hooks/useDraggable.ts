import { useCallback, useEffect, useRef, useState } from "react";

function useDraggable(
  parentRef: React.RefObject<HTMLDivElement>,
  windowRef: React.RefObject<HTMLDivElement>,
  initX: number,
  initY: number
) {
  const isDragging = useRef(false);
  const xDiff = useRef(0);
  const yDiff = useRef(0);
  const [x, setX] = useState(initX);
  const [y, setY] = useState(initY);

  function onDragStart(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    isDragging.current = true;
    xDiff.current = e.pageX - parentRef.current!.offsetLeft - x;
    yDiff.current = e.pageY - parentRef.current!.offsetTop - y;
  }

  function onDragStop() {
    isDragging.current = false;
  }

  const clampX = useCallback(
    (n: number) => {
      return Math.min(
        Math.max(n, 0),
        // container width - window width
        parentRef.current!.offsetWidth - windowRef.current!.offsetWidth
      );
    },
    [parentRef, windowRef]
  );

  const clampY = useCallback(
    (n: number) => {
      return Math.min(
        Math.max(n, 0),
        // container width - window width
        parentRef.current!.offsetHeight - windowRef.current!.offsetHeight
      );
    },
    [parentRef, windowRef]
  );

  const onDrag = useCallback(
    (e: MouseEvent) => {
      if (isDragging.current) {
        if (parentRef.current) {
          console.log(
            e.pageX - parentRef.current.offsetLeft - xDiff.current,
            e.pageY - parentRef.current.offsetTop - yDiff.current
          );
          setX(clampX(e.pageX - parentRef.current.offsetLeft - xDiff.current));
          setY(clampY(e.pageY - parentRef.current.offsetTop - yDiff.current));
        }
      }
    },
    [clampX, clampY, parentRef]
  );

  useEffect(() => {
    document.addEventListener("pointermove", onDrag);
    document.addEventListener("pointerup", onDragStop);
    return () => {
      document.removeEventListener("pointermove", onDrag);
      document.removeEventListener("pointerup", onDragStop);
    };
  }, [onDrag]);

  return { onDragStart, onDragStop, onDrag, x, y };
}

export default useDraggable;
