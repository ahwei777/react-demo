function countTotal(currentX, currentY, directionX, directionY, board) {
  // 起點的棋子顏色 = 檢查的顏色
  const now = board[currentY][currentX];
  let tempX = currentX;
  let tempY = currentY;
  let total = 0;
  do {
    // 依照方向檢查下個棋子
    tempX += directionX;
    tempY += directionY;
    // 如果下個棋子等於檢查的顏色
    if (board[tempY][tempX] === now) {
      // 連續的棋子數 + 1
      total++;
    } else {
      break;
    }
  } while (total < 5); // 至少找到四顆為止，加上起點本身就達成五顆連線
  return total;
}

export function calculateWinner(lastStone, board) {
  const { X, Y } = lastStone;
  const now = board[Y][X];
  if (
    countTotal(X, Y, 1, 0, board) + countTotal(X, Y, -1, 0, board) >= 4 ||
    countTotal(X, Y, 0, 1, board) + countTotal(X, Y, 0, -1, board) >= 4 ||
    countTotal(X, Y, 1, 1, board) + countTotal(X, Y, -1, -1, board) >= 4 ||
    countTotal(X, Y, 1, -1, board) + countTotal(X, Y, -1, 1, board) >= 4
  ) {
    return now;
  }
  // 都沒找到就回傳 null
  return null;
}
