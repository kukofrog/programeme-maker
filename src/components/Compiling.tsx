import React, { useRef } from "react";
import styled from "styled-components";
import DraggableContainer from "./DraggableContainer";
import { ImageFile } from "./Editor";

const Container = styled.div<{ height: number }>`
  position: relative;
  width: 411px;
  height: ${(props) => props.height}px;
  display: flex;
  flex-direction: column;
  color: white;
  background-color: white;
`;

const Title = styled.div`
  position: absolute;
  z-index: 100;
  background-image: url(title.png);
  width: 411px;
  height: 142px;
`;

const Background = styled.div<{ image: string; height: number }>`
  position: absolute;
  transform: translate(0px, 135px);
  z-index: 1;
  width: 411px;
  height: ${(props) => props.height}px;

  background-image: ${(props) => `url(${props.image})`};
  background-repeat: no-repeat;
  background-size: contain;
`;

function Compiling({ printRef, image }: { printRef: React.RefObject<HTMLDivElement>; image: ImageFile | undefined }) {
  return (
    <Container ref={printRef} height={image === undefined ? 332 : (411 * image?.height) / image?.width + 135}>
      <Title />
      {image && <Background image={image.previewURL} height={(411 * image?.height) / image?.width} />}
      <DraggableContainer parentRef={printRef} zIndex={101} image="compiling.png" width={117} height={54} />
      <DraggableContainer parentRef={printRef} zIndex={102} image="carry_on.png" width={162} height={59} />
      <DraggableContainer parentRef={printRef} zIndex={103} image="back_to_work.png" width={163} height={75} />
    </Container>
  );
}

export default Compiling;
