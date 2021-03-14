import React, { useState, useEffect } from "react";
import sprites from "./images/x.png";
import Square from "./Square";

export default function Board({ board, size, sprite, updateBoard }) {
  const [count, setCount] = useState(1);
  const [zero, setZero] = useState("");
  const [move, setMove] = useState({ Up: "", Bottom: "", Right: "", Left: "" });

  useEffect(() => {
    getNextCell(board, size);
  }, [board, size]);

  const getNextCell = (board, size) => {
    const zeroIndex = board.indexOf(0);
    const Cords = getIndexXY(zeroIndex, size);
    const Up =
      Cords.row > 0 ? getIndexCordXY(Cords.row - 1, Cords.column, size) : null;
    const Right =
      Cords.column < size
        ? getIndexCordXY(Cords.row, Cords.column + 1, size)
        : null;
    const Bottom =
      Cords.row < size
        ? getIndexCordXY(Cords.row + 1, Cords.column, size)
        : null;
    const Left =
      Cords.column > 0
        ? getIndexCordXY(Cords.row, Cords.column - 1, size)
        : null;

    setZero(zeroIndex);
    setMove({
      Up,
      Bottom,
      Left,
      Right,
    });
  };

  const getIndexXY = (idx, size) => {
    return {
      row: Math.floor(idx / size) + 1,
      column: (idx % size) + 1,
    };
  };
  const getIndexCordXY = (row, col, size) => {
    return size * (row - 1) + col - 1;
  };

  const HandleCellClick = index => {
    if (
      index === move.Up ||
      index === move.Right ||
      index === move.Bottom ||
      index === move.Left
    )
      nextBoard(index);
  };

  const nextBoard = index => {
    setCount(prevCount => {
      return prevCount + 1;
    });

    const indexx = sprite.indexOf(index);
    if (indexx > -1) {
      sprite.splice(indexx, 1);
    }
    if (sprite.length === 0) {
      alert(`Total moves ${count}`);
      window.location.href = "/";
    }

    const boards = board.slice();
    const temp = boards[index];
    boards[index] = boards[zero];
    boards[zero] = temp;
    updateBoard(boards);
  };

  function Sqx() {
    const squares = board.map((val, index) => {
      if ((index + 1) % size === 0) {
        if (sprite.includes(val)) {
          return (
            <span key={"i" + index}>
              <img
                key={index}
                alt="sprite"
                style={{ width: 60, height: 60 }}
                src={sprite}
                onClick={() => HandleCellClick(index)}
              />
              <br />
            </span>
          );
        } else {
          return (
            <span key={"i" + index}>
              {
                <Square
                  key={index}
                  value={val}
                  sprite={sprite}
                  clickHandler={() => HandleCellClick(index)}
                />
              }
              <br />
            </span>
          );
        }
      }
      if (sprite.includes(val)) {
        return (
          <img
            key={index}
            alt="sprite"
            style={{ width: 60, height: 60 }}
            src={sprites}
            onClick={() => HandleCellClick(index)}
          />
        );
      } else {
        return (
          <Square
            key={index}
            value={val}
            clickHandler={() => HandleCellClick(index)}
          />
        );
      }
    });

    return squares;
  } //end of it

  return <div className="board">{Sqx()}</div>;
}
