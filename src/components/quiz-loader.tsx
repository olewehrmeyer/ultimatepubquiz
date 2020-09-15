import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { brandColor } from "../colors";
import { Quiz } from "../models";

interface IQuizLoaderProps {
  loadedQuiz: (quiz: Quiz) => void;
}

const LoaderContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 5;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px 1fr;
`;

const LoaderBox = styled.div<{dragging: boolean}>`
  flex: 1;
  border: 5px dashed ${brandColor};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${({dragging}) => dragging ? "#eff7ff" : "white"};
  transition: background-color 200ms linear;
`;

const StatusMessage = styled.div`
font-size: 18pt;
text-align: center;
`
;
const QuizLoader: React.FC<IQuizLoaderProps> = ({ loadedQuiz }) => {
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
            const quiz = JSON.parse(jsonString as any); // fuck it, we catch all
            loadedQuiz(quiz);
        } catch (e) {
            console.log(e);
            setMessage("Datei ist fehlerhaft!");
        }
    }
    reader.readAsText(file);
  }, [loadedQuiz]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [message, setMessage] = useState("Lade dein Quiz, um zu beginnen!");
  return <LoaderContainer>
      <StatusMessage>{message}</StatusMessage>
    <LoaderBox {...getRootProps()} dragging={isDragActive}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Ab jetzt gerne loslassen ;) ...</p> :
          <p>Ziehe dein Quiz hier hin oder klicke, um es auszuwählen</p>
      }
    </LoaderBox>

  </LoaderContainer>;
};

export default QuizLoader;
