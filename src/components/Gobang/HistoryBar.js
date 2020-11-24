import { Pagination } from "react-bootstrap";
import { initialBoard } from "./setting";
import PropTypes from "prop-types";

// 合併包成完整的 component，設定參數傳入位置
const HistoryBar = ({ history, setHistory, setBoard, nowStep }) => {
  const handleRestartClick = () => {
    setHistory([initialBoard]);
  };

  const handleClickPrev = () => {
    nowStep.current--;
    const prevBoard = history[nowStep.current];
    setBoard(prevBoard);
  };
  const handleClickStep = (step) => {
    nowStep.current = step;
    const prevBoard = history[step];
    setBoard(prevBoard);
  };
  const PaginationCounters = Array.from({ length: history.length - 1 });
  return (
    <Pagination>
      <Pagination.Item
        onClick={() => {
          handleRestartClick();
        }}
      >
        Restart
      </Pagination.Item>

      {nowStep.current > 0 && (
        <Pagination.Prev
          onClick={() => {
            handleClickPrev();
          }}
        />
      )}

      {nowStep.current > 0 &&
        PaginationCounters.map((item, index) => (
          <Pagination.Item
            key={index}
            onClick={() => {
              handleClickStep(index + 1);
            }}
            active={index + 1 === nowStep.current ? "true" : null}
          >
            {index + 1}
          </Pagination.Item>
        ))}
    </Pagination>
  );
};

export default HistoryBar;
HistoryBar.propTypes = {
  history: PropTypes.array,
  setHistory: PropTypes.func,
  setBoard: PropTypes.func,
  nowStep: PropTypes.object,
};