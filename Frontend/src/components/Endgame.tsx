import React from "react";

type Props = {
  playerOneScore: number;
  playerTwoScore: number;
  onRestart: () => void;
};

const Endgame: React.FC<Props> = ({
  playerOneScore,
  playerTwoScore,
  onRestart,
}) => {
  return (
    <div className="endgame">
      {playerOneScore > playerTwoScore ? (
        <p>Player 1 Won</p>
      ) : playerTwoScore > playerOneScore ? (
        <p>Player Two Won</p>
      ) : (
        <p>DRAW!</p>
      )}
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
};

export default Endgame;
