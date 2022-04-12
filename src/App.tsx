import React from "react";
import styled from "styled-components";
import Editor from "./components/Editor";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const Contents = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: 40px;
  font-size: 40px;
`;

const Components = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

function App() {
  return (
    <Container>
      <Title>PrograMEME Maker</Title>
      <Contents>
        <Components>
          <Editor />
        </Components>
      </Contents>
    </Container>
  );
}

export default App;
