import React, {useState} from "react";
import styled from "styled-components";
import {Player, Quiz} from "../models";
import {RoundContext} from "../round-context";
import AddPlayerButton from "./add-player";
import {Button, PrimaryButton} from "./button";
import Greeting from "./greeting";
import PlayerDisplay from "./player";
import QuestionRenderer from "./question";
import TimerControl from "./timer-control";
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

const PubQuiz: React.FC<{ quiz: Quiz }> = ({quiz}) => {
    const [round, setRound] = useState(-1);

    const [players, setPlayers] = useState(loadPlayers());

    const [countdownFrom, setCountdownFrom] = useState<number | undefined>(undefined);

    const addPlayer = (player: Player) => {
        const sortedPlayers = [...players, player].sort((a, b) => b.score - a.score);
        setPlayers(sortedPlayers);
        window.localStorage.setItem("players", JSON.stringify(sortedPlayers));
    }

    const modifyScore = (player: Player, diff: number) => {
        if (player.scoreThisRound === undefined) {
            player.scoreThisRound = 0;
        }
        player.score += diff;
        player.scoreThisRound += diff;
        player.modifiedThisRound = true;
        const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
        setPlayers(sortedPlayers);
        window.localStorage.setItem("players", JSON.stringify(sortedPlayers));
    }

    const removePlayer = (index: number) => {
        players.splice(index, 1);
        const newPlayers : Player[] = [...players];
        setPlayers(newPlayers);
        window.localStorage.setItem("players", JSON.stringify(newPlayers));
    }

    const nextRound = () => {
        setRound(r => r + 1);
        setCountdownFrom(undefined);
        setPlayers(ps => {
            const newPlayers = [...ps];
            newPlayers.forEach(p => p.modifiedThisRound = false);
            newPlayers.forEach(p => p.scoreThisRound = 0);
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
            newPlayers.forEach(p => p.scoreThisRound = 0);
            return newPlayers;
        });
        window.localStorage.setItem("players", JSON.stringify(players));
    }

    const clearAllPlayers = () => {
        const emptyPlayers: Player[] = [];
        setPlayers(emptyPlayers);
        window.localStorage.removeItem("players");
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
                {countdownFrom &&
                <TimerControl countdownFrom={countdownFrom} key={"TimerControlForRound" + round}></TimerControl>}
            </TimerContent>
            <NavContent className={"nav"}>
                <Button onClick={previousRound} disabled={round < 0}>&lt; Zurück</Button>
                <Button onClick={clearAllPlayers}>Clear players</Button>

                <PrimaryButton onClick={nextRound}
                               disabled={round >= quiz.questions.length - 1 || players.length === 0}>Weiter &gt;</PrimaryButton>
            </NavContent>
            <PlayerContent className={"players"}>
                {players.length === 0 && <PlayersLoader loadedPlayers={setPlayers}></PlayersLoader>}
                {players.map((player, index) => (
                    <PlayerDisplay key={"Player" + player.name} player={player}
                                   incrementScore={() => modifyScore(player, 1)}
                                   decrementScore={() => modifyScore(player, -1)}
                                   deletePlayer={() => removePlayer(index)} position={index + 1} round={round}></PlayerDisplay>
                ))}

                <AddPlayerButton addPlayer={addPlayer}></AddPlayerButton>
            </PlayerContent>
            <MainContent style={{height: "100%", width: "100%"}}>
                {round < 0 || round >= quiz.questions.length ? <Greeting {...quiz.greeting}></Greeting> :
                    <QuestionRenderer question={quiz.questions[round]}
                                      startCountdown={startCountdown}></QuestionRenderer>}
            </MainContent>
        </RoundContext.Provider>
    );
};

export default PubQuiz;
