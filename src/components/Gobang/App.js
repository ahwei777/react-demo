import "./App.css";
// Components
import Board from "./Board";
import HistoryBar from "./HistoryBar";
// hooks & func
import useGobang from "./useGobang";

function GobangApp() {
  const {
    nowStep,
    isGameOver,
    blackIsNext,
    board,
    setBoard,
    history,
    setHistory,
    handleClickPlacing,
  } = useGobang();

  return (
    <div className="game">
      {/* 下棋順序及勝利提示 */}
      <div className="game-status" style={{ color: isGameOver ? "red" : "" }}>
        {!isGameOver && (blackIsNext ? "下一步輪到：黑色" : "下一步輪到：白色")}
        {isGameOver && isGameOver + "贏了，遊戲結束!"}
      </div>

      {/* 棋盤（含棋子本體及棋盤背景） */}
      <div className="game-board">
        <Board handleClickPlacing={handleClickPlacing} board={board} />
      </div>

      {/* 歷史步驟 bar */}
      {history.length >= 1 && (
        <HistoryBar
          history={history}
          setHistory={setHistory}
          setBoard={setBoard}
          blackIsNext={blackIsNext}
          nowStep={nowStep}
        />
      )}
    </div>
  );
}

export default GobangApp;
