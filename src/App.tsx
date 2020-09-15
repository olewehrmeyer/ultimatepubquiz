import React, { useState } from "react";
import styled from "styled-components";
import { AppHeader } from "./components/header";
import PubQuiz from "./components/pubquiz";
import QuizLoader from "./components/quiz-loader";
import { Quiz } from "./models";

const subtitles = [
  "Der ultimative Spaß für jedes Team",
  "Sogar von Agile Coaches bedienbar! :-P",
  "Für jede falsche Antwort trinkt Wiebke einen Kurzen!",
  "Findet ihr Timeboxes immer noch super, wenn ihr die Fragen beantworten müsst?",
  "Pro-Tipp: Drücke Alt+F4, um den Text der aktuellen Frage bei Google zu suchen"
];

const MainGrid = styled.div`
  display: grid;
  grid-template-rows: 80px 200px 60px 1fr;
  grid-template-columns: 300px 1fr;
  gap: 10px;
  width: 100vw;
  height: 100vh;
`;


const App: React.FC<{}> = () => {

  const [quiz, setQuiz] = useState<Quiz | undefined>(undefined);

  return (
    <MainGrid>
      <AppHeader title="Ultimate Pub Quiz" subtitles={subtitles}></AppHeader>
      {quiz && <PubQuiz quiz={quiz}></PubQuiz>}
      {!quiz && <QuizLoader loadedQuiz={setQuiz}></QuizLoader>}
    </MainGrid>
  );
};

export default App;
