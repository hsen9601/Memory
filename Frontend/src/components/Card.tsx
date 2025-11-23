import React from "react";
import type { CardType } from "../App";

import { track } from "@plausible-analytics/tracker";

type Props = CardType & {
  isFlipped: boolean;
  disabled: boolean;
  matchCards: (card: string, index: number, pressed: boolean) => void;
  setFlippedArr: React.Dispatch<React.SetStateAction<CardType[]>>;
};

const Card: React.FC<Props> = ({
  card,
  index,
  isFlipped,
  disabled,
  matchCards,
  setFlippedArr,
}) => {
  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""}`}
      onClick={() => {
        if (!disabled && !isFlipped) {
          matchCards(card, index, true);
          setFlippedArr((prev) => [...prev, { card, index, pressed: true }]);

          track("Card Clicked", {
            props: { card, index: String(index) },
            interactive: true,
          });
        }
      }}
    >
      <div className="card-inner">
        <div className="card-front"></div>
        <div className="card-back">{card}</div>
      </div>
    </div>
  );
};

export default Card;
