import React from "react";

type Props = {
  turn: number;
  playerOneScore: number;
  playerTwoScore: number;
};

const Scoreboard: React.FC<Props> = ({
  turn,
  playerOneScore,
  playerTwoScore,
}) => {
  return (
    <div className="scoreboard">
      <div className={`player-score ${turn === 1 ? "active" : ""}`}>
        Player 1: {playerOneScore}
      </div>
      <div className={`player-score ${turn === 2 ? "active" : ""}`}>
        Player 2: {playerTwoScore}
      </div>
    </div>
  );
};

export default Scoreboard;
