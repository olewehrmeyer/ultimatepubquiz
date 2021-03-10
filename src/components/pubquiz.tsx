import React, { useState } from "react";
import styled from "styled-components";
import { Player, Quiz } from "../models";
import { RoundContext } from "../round-context";
import AddPlayerButton from "./add-player";
import { Button, PrimaryButton } from "./button";
import Greeting from "./greeting";
import PlayerDisplay from "./player";
import QuestionRenderer from "./question";
import TimerControl from "./timer-control";
import QuizLoader from "./quiz-loader";
import PlayersLoader from "./players-loader";

const TimerContent = styled.div`
  
`;

const NavContent = styled.div`

`;

const PlayerContent = styled.div`

`;

const MainContent = styled.div`
  
`;

function loadPlayers(): Player[] {
  const playersStringFromLocalStorage = window.localStorage.getItem("players");
  if (!playersStringFromLocalStorage) {
    return [];
  }
  try {
    return JSON.parse(playersStringFromLocalStorage);
  } catch (e) {
    console.error(e);
    return [];
  }
}

const PubQuiz: React.FC<{quiz: Quiz}> = ({quiz}) => {
  const [round, setRound] = useState(-1);

  const [players, setPlayers] = useState(loadPlayers());

  const [countdownFrom, setCountdownFrom] = useState<number | undefined>(undefined);

  const addPlayer = (player: Player) => {
    const sortedPlayers = [...players, player].sort((a, b) => b.score - a.score);
    setPlayers(sortedPlayers);
    window.localStorage.setItem("players", JSON.stringify(sortedPlayers));
  }

  const modifyScore = (player: Player, diff: number) => {
    player.score += diff;
    player.modifiedThisRound = true;
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    setPlayers(sortedPlayers);
    window.localStorage.setItem("players", JSON.stringify(sortedPlayers));
  }

  const nextRound = () => {
    setRound(r => r + 1);
    setCountdownFrom(undefined);
    setPlayers(ps => {
      const newPlayers = [...ps];
      newPlayers.forEach(p => p.modifiedThisRound = false);
      return newPlayers;
    });
    window.localStorage.setItem("players", JSON.stringify(players));
  }

  const previousRound = () => {
    setRound(r => r - 1);
    setCountdownFrom(undefined);
    setPlayers(ps => {
      const newPlayers = [...ps];
      newPlayers.forEach(p => p.modifiedThisRound = false);
      return newPlayers;
    });
    window.localStorage.setItem("players", JSON.stringify(players));
  }

  const startCountdown = () => {
    if (round >= 0 && round < quiz.questions.length) {
      setCountdownFrom(quiz.questions[round].timerCountdown)
    } else {
      setCountdownFrom(undefined);
    }
  }

  return (
    <RoundContext.Provider value={round}>
      <TimerContent className={"timer"}>
        {countdownFrom && <TimerControl countdownFrom={countdownFrom} key={"TimerControlForRound" + round}></TimerControl>}
      </TimerContent>
      <NavContent className={"nav"}>
        <Button onClick={previousRound} disabled={round < 0}>&lt; Zurück</Button>
        <PrimaryButton onClick={nextRound} disabled={round >= quiz.questions.length - 1}>Weiter &gt;</PrimaryButton>
      </NavContent>
      <PlayerContent className={"players"}>
        {players.length == 0 && <PlayersLoader loadedPlayers={setPlayers}></PlayersLoader>}
          {players.map((player) => (
            <PlayerDisplay key={"Player" + player.name} player={player} incrementScore={() => modifyScore(player, 1)} decrementScore={() => modifyScore(player, -1)}></PlayerDisplay>
          ))}

        <AddPlayerButton addPlayer={addPlayer}></AddPlayerButton>
      </PlayerContent>
      <MainContent style={{height: "100%",  width: "100%"}}>
        {round < 0 || round >= quiz.questions.length ? <Greeting {...quiz.greeting}></Greeting> : <QuestionRenderer question={quiz.questions[round]} startCountdown={startCountdown}></QuestionRenderer>}
      </MainContent>
    </RoundContext.Provider>
  );
};

export default PubQuiz;
