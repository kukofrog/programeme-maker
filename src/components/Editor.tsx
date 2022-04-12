import html2canvas from "html2canvas";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import Compiling from "./Compiling";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

export interface ImageFile {
  file: File;
  previewURL: string;
  width: number;
  height: number;
}

function Editor() {
  const parentRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const [image, setImage] = useState<ImageFile>();

  const handleDownloadImage = async () => {
    const element = printRef.current;
    if (element) {
      const canvas = await html2canvas(element);

      const data = canvas.toDataURL("image/jpg");
      const link = document.createElement("a");

      if (typeof link.download === "string") {
        link.href = data;
        link.download = "image.jpg";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.open(data);
      }
    }
  };

  const UploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        let img = new Image();
        img.onload = () => {
          setImage({
            file: file,
            previewURL: (reader.result ?? "") as string,
            width: img.width,
            height: img.height,
          });
          console.log(img.width, img.height);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container ref={parentRef}>
      <Compiling printRef={printRef} image={image} />

      <button type="button" onClick={handleDownloadImage}>
        Download as Image
      </button>
      <input type="file" accept="image/*" onChange={UploadImage} />
    </Container>
  );
}

export default Editor;
