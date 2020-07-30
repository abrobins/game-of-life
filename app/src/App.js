import React from "react";
import GridLayout from "./Components/GridLayout";
import styled from "styled-components";
import "./App.css";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #33caff;
  height: 150vh;
`;

function App() {
  return (
    <Layout>
      <h1>Conway's Game of Life</h1>
      <GridLayout></GridLayout>
    </Layout>
  );
}

export default App;
