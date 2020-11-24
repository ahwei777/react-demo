import { memo } from "react";
import { size } from "./setting";
import PropTypes from "prop-types";

const stoneRows = Array.from({ length: size });
const stoneColumns = Array.from({ length: size });
const squareRows = Array.from({ length: size - 1 });
const squareColumns = Array.from({ length: size - 1 });

const Stone = ({ handleClickPlacing, X, Y, stone }) => {
  let color = "";
  if (stone) {
    color =
      stone === "B"
        ? "radial-gradient(5px 5px at 5px 5px,#fff,#333)"
        : "radial-gradient(5px 5px at 5px 5px,#fff,#e2e2e2)";
  }
  return (
    <div
      className="stone"
      onClick={() => {
        handleClickPlacing(X, Y);
      }}
      style={{
        background: color,
        boxShadow: stone !== null ? "2px 2px 4px rgba(0,0,0,0.3)" : "",
      }}
    ></div>
  );
};

// 背景不需 re-render
const MemoSquaresBackgroundWrapper = memo(() => {
  return (
    <div className="squares-background-wrapper">
      {squareColumns.map((el, index_X) => (
        <div key={index_X} className="squares-columns">
          {squareRows.map((EL, index_Y) => (
            <div key={index_Y} className="square-background" />
          ))}
        </div>
      ))}
    </div>
  );
});

const Board = ({ handleClickPlacing, board }) => {
  return (
    <div className="stones-wrapper">
      {stoneColumns.map((EL, index_X) => (
        <div key={index_X} className="stone-columns">
          {stoneRows.map((el, index_Y) => {
            return (
              <Stone
                key={index_Y}
                X={index_X}
                Y={index_Y}
                handleClickPlacing={handleClickPlacing}
                stone={board[index_Y][index_X]}
              />
            );
          })}
        </div>
      ))}
      <MemoSquaresBackgroundWrapper />
    </div>
  );
};

export default Board;

Stone.propTypes = {
  handleClickPlacing: PropTypes.func,
  X: PropTypes.number,
  Y: PropTypes.number,
  stone: PropTypes.string,
};

Board.propTypes = {
  handleClickPlacing: PropTypes.func,
  board: PropTypes.array,
};
