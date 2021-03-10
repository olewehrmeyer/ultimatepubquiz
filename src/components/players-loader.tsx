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
  border: 1px dashed ${brandColor};
  border-radius: 10px;
  height: 100px;
  opacity: ${({dragging}) => dragging ? "0.7" : "0.2"};
  cursor: pointer;
  background-color: ${({dragging}) => dragging ? "#eff7ff" : "white"};
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

  const [message, setMessage] = useState("Lade dein Quiz, um zu beginnen!");
  return <LoaderContainer>
      <StatusMessage>{message}</StatusMessage>
    <LoaderBox {...getRootProps()} dragging={isDragActive}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Ab jetzt gerne loslassen ;) ...</p> :
          <p>Ziehe dein Playerliste hier hin oder klicke, um sie auszuwählen</p>
      }
    </LoaderBox>

  </LoaderContainer>;
};

export default PlayersLoader;
