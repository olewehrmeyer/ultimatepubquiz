import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { shuffle } from "../helpers";
import { Question } from "../models";
import { Button } from "./button";

const Image = styled.img`

  
`;

interface IQuestionRendererProps {
  question: Question;
  startCountdown: () => void;
}

const QuestionRenderer: React.FC<IQuestionRendererProps> = ({
  question,
  startCountdown,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setPlaying] = useState(false);
  const [isPlayingFirstTime, setPlayingFirstTime] = useState(true);

  useEffect(() => {
    if (!question.audio) {
      startCountdown();
    }
  });

  useEffect(() => {
    if (isPlaying) {
      if (!audioRef?.current) {
        return;
      }
      audioRef.current.currentTime = question.audio?.startTime || 0;
      audioRef.current.play();
      setPlayingFirstTime(false);
      if (question.audio?.playTime) {
        const timeout = setTimeout(() => {
          audioRef.current?.pause();
          setPlaying(false);
          if (!isPlayingFirstTime) {
            startCountdown();
          }
        }, question.audio?.playTime * 1000);
        return () => clearTimeout(timeout);
      } else {
        startCountdown();
      }
    }
  }, [isPlaying, question.audio, startCountdown, isPlayingFirstTime]);

  return (
    <>
      {question.image && <Image className={"pubimg"} src={question.image}></Image>}
      <div className={"question"}>
      <h2>{question.questionHeader}</h2>
      <p dangerouslySetInnerHTML={{ __html: question.questionText }}></p>
      {question.optionsValues && (
        <ul>
          {shuffle([...question.optionsValues]).map((val) => (
            <li key={val}>{val}</li>
          ))}
        </ul>
      )}

      {question.questionEndText && (
        <p dangerouslySetInnerHTML={{ __html: question.questionEndText }}></p>
      )}
      {question.audio && (
        <>
          <audio ref={audioRef} onCanPlayThrough={() => setPlaying(true)} key={'Audio' + question.audio.src}>
            <source
              src={question.audio.src}
              type={"audio/" + question.audio.type}
            ></source>
          </audio>
          <Button onClick={() => setPlaying(true)} disabled={isPlaying}>
            Ja okay, dann halt nochmal...
          </Button>
        </>
      )}
      </div>
    </>
  );
};

export default QuestionRenderer;
