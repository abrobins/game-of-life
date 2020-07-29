import React from "react";
import GridLayout from "./Components/GridLayout";
import styled from "styled-components";
import "./App.css";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #33caff;
  height: 100vh;
`;

function App() {
  return (
    <Layout>
      <GridLayout></GridLayout>
    </Layout>
  );
}

export default App;
