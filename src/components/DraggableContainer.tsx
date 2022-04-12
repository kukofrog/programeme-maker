import React, { useRef } from "react";
import styled from "styled-components";
import useDraggable from "../hooks/useDraggable";

const Container = styled.div.attrs<{ x: number; y: number }>((props) => ({
  style: {
    transform: `translate(${props.x}px, ${props.y}px)`,
  },
}))<{ x: number; y: number; zIndex: number; image: string; width: number; height: number }>`
  position: absolute;
  z-index: ${(props) => props.zIndex};
  background-image: ${(props) => `url(${props.image})`};
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

function DraggableContainer({
  parentRef,
  image,
  zIndex,
  width,
  height,
}: {
  parentRef: React.RefObject<HTMLDivElement>;
  image: string;
  zIndex: number;
  width: number;
  height: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { x, y, onDragStart } = useDraggable(parentRef, containerRef, 100, 200);

  return (
    <Container
      x={x}
      y={y}
      ref={containerRef}
      image={image}
      zIndex={zIndex}
      width={width}
      height={height}
      onMouseDown={(e) => {
        onDragStart(e);
      }}
    />
  );
}

export default DraggableContainer;
