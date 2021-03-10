import React from "react";
import styled from "styled-components";
import { Player } from "../models";
import { RoundButton } from "./button";

const PlayerControls = styled.div`
  display: grid;
  grid-template-rows: 50% 50%;
  grid-template-columns: 100%;
  visibility: hidden;
`;

const PlayerContainer = styled.div<{ marked: boolean }>`
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  display: grid;
  grid-template-rows: 60px;
  grid-template-columns: 60px 1fr 30px;
  column-gap: 10px;

  background-color: ${({ marked }) => (marked ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.3)")};

  :hover ${PlayerControls} {
    visibility: visible;
  }
`;

const RoundImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const PlayerStats = styled.div`
  display: grid;
  grid-template-rows: 60% 40%;
  grid-template-columns: 100%;
`;

const PlayerName = styled.span`
  font-size: 18pt;
  font-weight: 900;
  place-self: start start;
`;

const PlayerScore = styled.span`
  font-size: 16pt;
  place-self: end start;
`;

interface IPlayerDisplayProps {
  player: Player;
  incrementScore: () => void;
  decrementScore: () => void;
}

const PlayerDisplay: React.FC<IPlayerDisplayProps> = ({
  player,
  incrementScore,
  decrementScore,
}) => {

  const increment = () => {
    incrementScore();

  };

  const decrement = () => {
    decrementScore();

  };

  return (
    <PlayerContainer marked={!!player.modifiedThisRound}>
        {player.imageUrl && <RoundImage src={player.imageUrl}></RoundImage>}
        {!player.imageUrl && <RoundImage src={"http://localhost:3000/ultimatepubquiz/assets/images/user.png"}></RoundImage>}
      <PlayerStats>
        <PlayerName>
          {player.name}
        </PlayerName>
        <PlayerScore>{player.score} Punkte</PlayerScore>
      </PlayerStats>
      <PlayerControls>
        <RoundButton onClick={increment}>+</RoundButton>
        <RoundButton onClick={decrement}>&minus;</RoundButton>
      </PlayerControls>
    </PlayerContainer>
  );
};

export default PlayerDisplay;
