import React, { useState } from "react";
import styled from "styled-components";
import { Player } from "../models";
import { PrimaryButton } from "./button";
import { AddPlayerPrimaryButton } from "./button";

interface IAddPlayerButtonProps {
  addPlayer: (player: Player) => void;
}

const AddPopupContainer = styled.div`
    background: rgba(0,0,0,0.4);
    border-radius: 20px;
    left: 250%;
    top: 40%;
    position: absolute;
    box-shadow: 10px 10px 30px 0px rgb(0 0 0 / 25%);
    padding: 20px;
`;

const AddPopupContent = styled.div`
font-size: 16pt;
  padding: 10px;
  display: grid;
  grid-template-columns: 120px 300px;
  grid-template-rows: 50px 50px 50px;
  row-gap: 12px;
  column-gap: 20px;
  grid-template-areas:
    "name-label name-input"
    "image-label image-input"
    "add-button add-button";
`;

const NameLabel = styled.span`
  grid-area: name-label;
  place-self: center start;
`;

const ImageLabel = styled.span`
  grid-area: image-label;
  place-self: center start;
`;

const Input = styled.input`
  height: 30px;
  border-radius: 20px;
  border: 1px solid lightgrey;
  padding: 10px;
  font-size: 16pt;
`;

const NameInput = styled(Input)`
  grid-area: name-input;
  
`;

const ImageInput = styled(Input)`
  grid-area: image-input;
`;

const AddButton = styled(PrimaryButton)`
  grid-area: add-button;
`;

const AddPlayerButton: React.FC<IAddPlayerButtonProps> = ({addPlayer}) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const add = () => {
    addPlayer({
      name,
      imageUrl: url,
      score: 0
    });
    setName("");
    setUrl("");
    setPopupOpen(false);
  }

  return (
    <>
      <AddPlayerPrimaryButton onClick={() => setPopupOpen(!isPopupOpen)}>
        {isPopupOpen ? "+" : "+"}
      </AddPlayerPrimaryButton>
      {isPopupOpen && (
        <AddPopupContainer>
          <p>Neuer Spieler</p>
          <AddPopupContent>
            <NameLabel>Name:</NameLabel>
            <ImageLabel>Bild-URL:</ImageLabel>
            <NameInput value={name} onChange={(e) => setName(e.target.value)}></NameInput>
            <ImageInput value={url} onChange={(e) => setUrl(e.target.value)}></ImageInput>
            <AddButton onClick={add}>Hinzufügen</AddButton>
          </AddPopupContent>
        </AddPopupContainer>
      )}
    </>
  );
};

export default AddPlayerButton;
