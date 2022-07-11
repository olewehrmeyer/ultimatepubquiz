import React from "react";
import styled from "styled-components";
import {Player} from "../models";
import {RoundButton} from "./button";
import {brandColor, brandColorText, grey} from "../colors";
import Icon from "@material-ui/core/Icon";

const PlayerControls = styled.div`
  display: grid;
  grid-template-rows: 50% 50%;
  grid-template-columns: 100%;
  // visibility: hidden;
`;

const PlayerScoreBubble = styled.div`
border-radius: 50%;
color: ${brandColorText};
background: ${grey};
font-weight: 900;
    min-height: 1em;
    min-width: 1em;
    position: absolute;
    top: -0.3em;
    right: -.3em;
    padding: .3em;
    text-align: center;
    line-height: 1em;
    font-size: 1.5em;

    `;

const PlayerScoreLeaderBubble = styled(PlayerScoreBubble)`
background: ${brandColor};
`;

const PlayerContainer = styled.div<{ marked: boolean }>`
position:relative;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  display: grid;
  grid-template-rows: 60px;
  grid-template-columns: 60px 30px 1fr 30px;
  column-gap: 15px;

  background-color: ${({marked}) => (marked ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.3)")};
  border-left: ${({marked}) => (marked ? "4px solid #a21892" : "4px solid transparent")};

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
const Position = styled.span`
font-size: 3em;
  font-weight: 300;
`;

const PlayerScore = styled.span`
  font-size: 16pt;
  place-self: end start;
`;

interface IPlayerDisplayProps {
    player: Player;
    incrementScore: () => void;
    decrementScore: () => void;
    deletePlayer: () => void;
    position: number;
    round: number;
}

const PlayerDisplay: React.FC<IPlayerDisplayProps> = ({
                                                          player,
                                                          incrementScore,
                                                          decrementScore,
                                                          deletePlayer,
                                                          position,
                                                          round
                                                      }) => {

    const increment = () => {
        incrementScore();

    };

    const decrement = () => {
        decrementScore();

    };

    const remove = () => {
        deletePlayer();
    }

    return (
        <PlayerContainer marked={!!player.modifiedThisRound}>
            {player.imageUrl && <RoundImage src={player.imageUrl}></RoundImage>}
            {!player.imageUrl &&
            <RoundImage src={"http://localhost:3000/ultimatepubquiz/assets/images/user.png"}></RoundImage>}
            <Position>{position}</Position>
            <PlayerStats>
                <PlayerName>
                    {player.name}
                </PlayerName>
                <PlayerScore>{player.score} Punkte ({player.scoreThisRound})</PlayerScore>
                {/*{position !== 1 && <PlayerScoreBubble>{player.score}</PlayerScoreBubble>}*/}
                {/*{position === 1 && <PlayerScoreLeaderBubble>{player.score}</PlayerScoreLeaderBubble>}*/}
            </PlayerStats>
            {round < 0 ? <PlayerControls>
                <RoundButton onClick={remove}><Icon>delete-outline</Icon></RoundButton>
            </PlayerControls> : <PlayerControls>
                <RoundButton onClick={increment}><Icon>add-circle-outline</Icon></RoundButton>
                <RoundButton onClick={decrement}><Icon>remove-circle-outline</Icon></RoundButton>
            </PlayerControls>}
        </PlayerContainer>
    );
};

export default PlayerDisplay;
