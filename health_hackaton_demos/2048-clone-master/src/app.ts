import { GameBoard } from "./game-board";

// const initialBoard = [
//     [2, 8, 2, 4],
//     [4, 2, 8, 16],
//     [2, 8, 16, 128],
//     [4, 2, 32, 64],
// ];

// const initialBoard = [
//     [128, 128, 128, 256],
//     [512, 1024, 2048, 2],
//     [4, 8, 16, 32],
//     [0, 2, 4, 8],
// ];

window.addEventListener("load", () => {
  console.log("Load event");
  const body = document.querySelector("body") as HTMLBodyElement;
  const canvas = document.createElement("canvas");

  const para = document.createElement("p");
  para.innerHTML = `2048 clone by <a href="https://github.com/cyberpirate92/2048-clone">cyberpirate92</a>. Original by Gabriele Cirulli (based on 1024 by Veewo Studio).`;

  body.appendChild(para);
  body.appendChild(canvas);

  let gameBoard = new GameBoard(canvas, 4);
  gameBoard.debugDump();
});
