import { useState, useLayoutEffect, useRef } from "react";
// 引入相關函式及參數
import { calculateWinner } from "./utils";
import { initialBoard } from "./setting";

export default function useGobang() {
  const [board, setBoard] = useState(initialBoard);
  const [history, setHistory] = useState([initialBoard]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [blackIsNext, setBlackIsNext] = useState(true);

  // 與畫面無關的狀態
  const nowStep = useRef(0);
  const lastStone = useRef(null);

  // paint 前進行下棋順序判斷
  useLayoutEffect(() => {
    // 依據現在步數是否為偶數決定
    setBlackIsNext(nowStep.current % 2 === 0 ? true : false);
  }, [board]);

  // paint 前找出是否已有勝利者
  useLayoutEffect(() => {
    // 第 9 次下棋後再進行判斷
    if (nowStep.current >= 9 && nowStep.current === history.length - 1) {
      let result = calculateWinner(lastStone.current, board);
      if (result !== null) {
        setIsGameOver(result === "B" ? "黑色" : "白色");
      } else {
        setIsGameOver(false);
      }
    } else {
      setIsGameOver(false);
    }
  }, [lastStone, board, history.length]);

  // restart 時重置相關 state
  useLayoutEffect(() => {
    if (history.length === 1) {
      setBoard(initialBoard);
      setIsGameOver(null);
      nowStep.current = 0;
    }
  }, [history]);

  const handleClickPlacing = (X, Y) => {
    // 該格沒東西 且 遊戲未結束 才可放棋子
    if (!board[Y][X] && !isGameOver) {
      nowStep.current++;
      const newBoard = JSON.parse(JSON.stringify(board));
      newBoard[Y][X] = blackIsNext ? "B" : "W";
      setBoard(newBoard);

      // 更新棋譜紀錄
      const newHistory = history.slice(0, nowStep.current);
      newHistory.push(newBoard);
      setHistory(newHistory);

      // 更新最後一子的位置
      lastStone.current = { X, Y };
    } else {
      return;
    }
  };

  return {
    nowStep,
    isGameOver,
    blackIsNext,
    setBlackIsNext,
    board,
    setBoard,
    history,
    setHistory,
    handleClickPlacing,
  };
}
