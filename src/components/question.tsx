import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {shuffle} from "../helpers";
import {Question} from "../models";
import {Button} from "./button";

const Image = styled.div`

  
`;

interface IQuestionRendererProps {
    question: Question;
    startCountdown: () => void;
    remainingTime?: number;
}

const QuestionRenderer: React.FC<IQuestionRendererProps> = ({
                                                                question,
                                                                startCountdown,
                                                                remainingTime,
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
                        if (!isPlayingFirstTime && question.audio?.autoPlay) {
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
                {question.image && <Image className={"pubimg"} style={{backgroundImage: "url(" + question.image + ")"}}>
                    <div className={"imgoverlay"}></div>
                </Image>}
                <div className={"question"}>
                    <div className={"question_content"}>
                        <h2>{question.questionHeader}</h2>
                        <p dangerouslySetInnerHTML={{__html: question.questionText}}></p>
                        {question.optionsValues && (
                            <ul>
                                {shuffle([...question.optionsValues]).map((val) => (
                                    <li key={val}>{val}</li>
                                ))}
                            </ul>
                        )}

                        {question.questionEndText && (
                            <p dangerouslySetInnerHTML={{__html: question.questionEndText}}></p>
                        )}
                        {question.audio && (
                            <>
                                <audio ref={audioRef}
                                       onCanPlayThrough={() => setPlaying(question.audio !== undefined && question.audio.autoPlay)}
                                       key={'Audio' + question.audio.src}>
                                    <source
                                        src={question.audio.src}
                                        type={"audio/" + question.audio.type}
                                    ></source>
                                </audio>
                                <div style={{marginTop: "20px"}}>
                                    <Button onClick={() => startCountdown()}>
                                        Timer starten
                                    </Button>
                                    <Button onClick={() => setPlaying(true)} disabled={isPlaying}>
                                    {/*{question.audio.autoPlay && <span>Ja okay, dann halt nochmal...</span>}*/}
                                    {/*{!question.audio.autoPlay && remainingTime === 0 && <span>Lösung</span>}*/}
                                    Lösung
                                </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </>
        );
    }
;

export default QuestionRenderer;
