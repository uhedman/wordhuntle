import { Grid } from "~/shared/types";

export const rotateRight = (matrix: Grid): Grid => {
  const newGrid: Grid = [
    [matrix[3][0], matrix[2][0], matrix[1][0], matrix[0][0]],
    [matrix[3][1], matrix[2][1], matrix[1][1], matrix[0][1]],
    [matrix[3][2], matrix[2][2], matrix[1][2], matrix[0][2]],
    [matrix[3][3], matrix[2][3], matrix[1][3], matrix[0][3]],
  ];
  return newGrid;
};

export const rotateLeft = (matrix: Grid): Grid => {
  const newGrid: Grid = [
    [matrix[0][3], matrix[1][3], matrix[2][3], matrix[3][3]],
    [matrix[0][2], matrix[1][2], matrix[2][2], matrix[3][2]],
    [matrix[0][1], matrix[1][1], matrix[2][1], matrix[3][1]],
    [matrix[0][0], matrix[1][0], matrix[2][0], matrix[3][0]],
  ];
  return newGrid;
};
