import React from "react";
import Card from "./Card";
import type { CardType } from "../App";

type Props = {
  cards: string[];
  flippedArr: CardType[];
  matchedArr: CardType[];
  disabled: boolean;
  matchCards: (card: string, index: number, pressed: boolean) => void;
  setFlippedArr: React.Dispatch<React.SetStateAction<CardType[]>>;
};

const CardGrid: React.FC<Props> = ({
  cards,
  flippedArr,
  matchedArr,
  disabled,
  matchCards,
  setFlippedArr,
}) => {
  return (
    <div className="card-grid">
      {cards.map((card, index) => {
        const isFlipped = flippedArr.some(
          (c) => c.index === index && c.pressed
        );
        const isMatched = matchedArr.some((c) => c.index === index);

        return (
          <Card
            key={index}
            card={card}
            index={index}
            isFlipped={isFlipped || isMatched}
            disabled={disabled || isMatched}
            matchCards={matchCards}
            setFlippedArr={setFlippedArr}
          />
        );
      })}
    </div>
  );
};

export default CardGrid;
