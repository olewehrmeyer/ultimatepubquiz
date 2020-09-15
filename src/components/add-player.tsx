import React, { useState } from "react";
import styled from "styled-components";
import { Player } from "../models";
import { PrimaryButton } from "./button";

interface IAddPlayerButtonProps {
  addPlayer: (player: Player) => void;
}

const AddPopupContainer = styled.div`
  width: 420px;
  height: 190px;
  background-color: white;
  border-radius: 10px;
  left: 50%;
  top: 50%;
  margin-left: -210px;
  margin-top: -85px;
  position: absolute;
  box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.25);
`;

const AddPopupContent = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: 80px 300px;
  grid-template-rows: 50px 50px 50px;
  row-gap: 10px;
  column-gap: 20px;
  grid-template-areas:
    "name-label name-input"
    "image-label image-input"
    "add-button add-button";
`;

const NameLabel = styled.span`
  grid-area: name-label;
  place-self: center end;
`;

const ImageLabel = styled.span`
  grid-area: image-label;
  place-self: center end;
`;

const Input = styled.input`
  height: 30px;
  border-radius: 25px;
  border: 1px solid lightgrey;
  padding: 10px;
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
      <PrimaryButton onClick={() => setPopupOpen(!isPopupOpen)}>
        {isPopupOpen ? "Abbrechen" : "Neuer Spieler"}
      </PrimaryButton>
      {isPopupOpen && (
        <AddPopupContainer>
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
