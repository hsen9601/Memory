import { useEffect, useState } from "react";
import "./App.css";
import Scoreboard from "./components/ScoreBoard";
import CardGrid from "./components/CardGrid";
import Endgame from "./components/Endgame";

export type CardType = { card: string; index: number; pressed?: boolean };

function App() {
  const [cards, setCards] = useState<string[]>([]);
  const [firstCard, setFirstCard] = useState<CardType>();
  const [secondCard, setSecondCard] = useState<CardType>();
  const [flippedArr, setFlippedArr] = useState<CardType[]>([]);
  const [matchedArr, setMatchedArr] = useState<CardType[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [turn, setTurn] = useState(1);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [fruits, setFruits] = useState<string[]>([
    "🍌",
    "🍎",
    "🥝",
    "🍉",
    "🥭",
    "🍓",
    "🍑",
    "🍆",
  ]);

  const DrawCard = (num: number) => {
    const nameArr: string[] = [];
    for (let i = 0; i < num; i++) {
      nameArr.push(fruits[i], fruits[i]);
    }
    for (let i = nameArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nameArr[i], nameArr[j]] = [nameArr[j], nameArr[i]];
    }
    setCards(nameArr);
  };

  const matchCards = (card: string, index: number, pressed: boolean) => {
    if (!firstCard) setFirstCard({ card, index, pressed });
    else if (!secondCard) setSecondCard({ card, index, pressed });
  };

  const clearCards = () => {
    setFirstCard(undefined);
    setSecondCard(undefined);
  };

  const markAsMatched = (cardOne: CardType, cardTwo: CardType) => {
    setMatchedArr((prev) => [...prev, cardOne, cardTwo]);

    setFlippedArr([]);
    clearCards();
  };

  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabled(true);
      const timer = setTimeout(() => {
        if (
          firstCard.card === secondCard.card &&
          firstCard.index !== secondCard.index
        ) {
          if (turn === 1) {
            setPlayerOneScore((prev) => prev + 1);
            markAsMatched(firstCard, secondCard);
          } else {
            setPlayerTwoScore((prev) => prev + 1);
            markAsMatched(firstCard, secondCard);
          }
        } else {
          setFlippedArr([]);
          setTurn((prev) => (prev === 1 ? 2 : 1));
        }
        clearCards();
        setDisabled(false);
      }, 750);

      return () => clearTimeout(timer);
    }
  }, [firstCard, secondCard, turn]);

  useEffect(() => {
    if (fruits.length) DrawCard(fruits.length);
  }, [fruits]);

  const handleRestart = () => {
    setFruits(["🍌", "🍎", "🥝", "🍉", "🥭", "🍓", "🍑", "🍆"]);
    setCards([]);
    setFlippedArr([]);
    clearCards();
    setMatchedArr([]);
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    setDisabled(false);
    setTurn(1);
  };

  return (
    <>
      {matchedArr.length < 16 ? (
        <>
          <Scoreboard
            turn={turn}
            playerOneScore={playerOneScore}
            playerTwoScore={playerTwoScore}
          />
          <CardGrid
            cards={cards}
            flippedArr={flippedArr}
            matchedArr={matchedArr}
            disabled={disabled}
            matchCards={matchCards}
            setFlippedArr={setFlippedArr}
          />
        </>
      ) : (
        <Endgame
          playerOneScore={playerOneScore}
          playerTwoScore={playerTwoScore}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}

export default App;
