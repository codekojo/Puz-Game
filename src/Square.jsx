import React from "react";

function Square({ value, clickHandler }) {
  const clear = value === 0 ? "square zero" : "square";
  return value === 0 ? (
    <div className={clear} onClick={() => clickHandler()} style={{ width: 60 }}>
      Player One
    </div>
  ) : (
    <div
      className={clear}
      onClick={() => clickHandler()}
      style={{ width: 60 }}
    ></div>
  );
}

export default Square;
