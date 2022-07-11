import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { brandColor } from "../colors";
import { Player } from "../models";

interface IPlayerLoaderProps {
  loadedPlayers: (players: Player[]) => void;
}

const LoaderContainer = styled.div`
  
`;

const LoaderBox = styled.div<{dragging: boolean}>`
  border-radius: 10px;
  width: 300px;
  background: ${({dragging}) => dragging ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.6)"};
  cursor: pointer;
  font-size:16pt;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  display: grid;
  place-self: end start;
`;

const StatusMessage = styled.div`
font-size: 12pt;
text-align: center;
`
;
const PlayersLoader: React.FC<IPlayerLoaderProps> = ({ loadedPlayers }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length !== 1) {
        setMessage("Bitte wähle genau eine Datei aus!");
        return;
    }
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onabort = (e) => {
        console.log(e);
        setMessage("Datei konnte nicht gelesen werden!");
    }
    reader.onerror = (e) => {
        console.log(e);
        setMessage("Datei konnte nicht gelesen werden!");
    }
    reader.onload = () => {
        const jsonString = reader.result;
        try {
            const players = JSON.parse(jsonString as any); // fuck it, we catch all
            window.localStorage.setItem("players", JSON.stringify(players));
            loadedPlayers(players);
        } catch (e) {
            console.log(e);
            setMessage("Datei ist fehlerhaft!");
        }
    }
    reader.readAsText(file);
  }, [loadedPlayers]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [message, setMessage] = useState("");
  return <LoaderContainer>
      <StatusMessage>{message}</StatusMessage>
    <LoaderBox {...getRootProps()} dragging={isDragActive}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <span>...und loslassen!</span> :
          <span>Ziehe dein Spielerliste hier hin oder klicke, um sie auszuwählen. Klicke auf '+' um Spieler manuell hinzuzufügen.</span>
      }
    </LoaderBox>

  </LoaderContainer>;
};

export default PlayersLoader;
