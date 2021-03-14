import React, { useEffect, useState } from "react";
import Board from "./Board";
import styled from "styled-components";

function Puzzle() {
  const [board, setBoard] = useState([]);
  const [size, setSize] = useState(3);
  const [sprite, setSprite] = useState([]);

  useEffect(() => {
    const size = prompt("What size do you want the board in?");
    if (/^\d+$/.test(size)) {
      newGame(size);
    } else {
      alert("Please input a number");
      window.location.href = "/";
    }
  }, []);

  const ArrayNew = arr => {
    for (let i = 0; i < arr.length; i++) {
      if (arr.indexOf(arr[i]) !== i) return false;
    }
    return true;
  };

  const newGame = size => {
    let board = new Array(size * size);
    let sprite = new Array(size);
    for (let i = 0; i < size * size; ++i) board[i] = i;

    do {
      for (let x = 0; x < size; x++) {
        sprite[x] = Math.floor(Math.random() * (size * size - 1) + 1);
      }
    } while (!ArrayNew(sprite));

    const sizee = size - 1;
    let mid = Math.round(Math.abs((sizee * sizee) / 2));
    let middata = board[mid];
    let firstdata = board[0];
    board[0] = middata;
    board[mid] = firstdata;

    updateBoard(board, size);
    setSize(size);
    setSprite(sprite);
  };

  const updateBoard = board => {
    setBoard(board);
  };

  return (
    <div className="puzzle">
      {board && (
        <Board
          size={size}
          board={board}
          updateBoard={updateBoard}
          sprite={sprite}
        />
      )}
    </div>
  );
}

export default Puzzle;
