import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import styled from "styled-components";

const OutsideContainer = styled.div`
  background-color: #d2d9d5;
  border-radius: 3px;
`;

const ButtonContainer = styled.div`
  // border: 2px solid red;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 5px;
`;

const Button = styled.button`
  color: black;
  margin-top: 10px;
  width: 8vw;
  height: 40px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bolder;
  background-color: #add8e6;
`;

const Counter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const neighbor_operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

function GridLayout() {
  const [running, setrunning] = useState(false);
  const runningRef = useRef(running);
  const [generation, setGeneration] = useState(0);
  const timeRef = useRef(200);
  const [sum, setSum] = useState(0);
  const numRows = 35;
  const numCols = 80;

  runningRef.current = running;

  //creating grid and setting to all zeros
  function initialState() {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    console.log(rows);
    return rows;
  }

  const [grid, setGrid] = useState(initialState);

  const runSimGrid = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      let validGrid = false;
      validGrid = false;
      // creat copy of grid
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            neighbor_operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              //checking to see if out of bounds.
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });
            //counting number of neighbors
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              validGrid = true;
              gridCopy[i][k] = 1;
            }
          }
        }
        // counting generation
        if (validGrid) {
          setGeneration((num) => num + 1);
        }
        //counting number of alive cells
        setSum(
          gridCopy.flat().reduce((acc, cv) => {
            return acc + cv;
          })
        );
      });
    });
    setTimeout(runSimGrid, timeRef.current);
  }, []);
  console.log(timeRef.current);
  return (
    <OutsideContainer>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols},15px)`,
        }}
      >
        {/* drawing grid */}
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                //using immer to make a copy and utilize double buffer
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 14,
                height: 15,
                //changing background depending on amount of cells
                backgroundColor:
                  grid[i][k] && sum > 200
                    ? // ? _.sample(colors)
                      "#7044FF"
                    : grid[i][k] && sum > 100
                    ? "#4666FF"
                    : grid[i][k] && sum >= 0
                    ? "#FE000D"
                    : undefined,
                border: "1px solid black",
              }}
            />
          ))
        )}
      </div>
      <ButtonContainer>
        <Button
          onClick={() => {
            setrunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimGrid();
            }
          }}
        >
          {!runningRef.current ? "Start" : "Stop"}
        </Button>
      </ButtonContainer>
      <Counter>
        <h2> Generation: {generation}</h2>
        <h2> Number of Active Cells: {sum}</h2>
      </Counter>
    </OutsideContainer>
  );
}
export default GridLayout;
