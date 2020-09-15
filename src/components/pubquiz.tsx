import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Player, Quiz } from "../models";
import { RoundContext } from "../round-context";
import AddPlayerButton from "./add-player";
import { Button, PrimaryButton } from "./button";
import Greeting from "./greeting";
import PlayerDisplay from "./player";
import QuestionRenderer from "./question";
import TimerControl from "./timer-control";

const TimerContent = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  justify-self: center;
`;

const NavContent = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding-left: 10px;
`;

const PlayerContent = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  padding-left: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 60px;
`;

const MainContent = styled.div`
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
      <TimerContent>
        {countdownFrom && <TimerControl countdownFrom={countdownFrom} key={"TimerControlForRound" + round}></TimerControl>}
      </TimerContent>
      <NavContent>
        <Button onClick={previousRound} disabled={round < 0}>&lt; Zurück</Button>
        <PrimaryButton onClick={nextRound} disabled={round >= quiz.questions.length - 1}>Weiter &gt;</PrimaryButton>
      </NavContent>
      <PlayerContent>
        <div style={{overflow: "scroll", maxHeight: "calc(100vh - 430px)"}}>
          {players.map((player) => (
            <PlayerDisplay key={"Player" + player.name} player={player} incrementScore={() => modifyScore(player, 1)} decrementScore={() => modifyScore(player, -1)}></PlayerDisplay>
          ))}
        </div>
        <AddPlayerButton addPlayer={addPlayer}></AddPlayerButton>
      </PlayerContent>
      <MainContent>
        {round < 0 || round >= quiz.questions.length ? <Greeting {...quiz.greeting}></Greeting> : <QuestionRenderer question={quiz.questions[round]} startCountdown={startCountdown}></QuestionRenderer>}
      </MainContent>
    </RoundContext.Provider>
  );
};

export default PubQuiz;
