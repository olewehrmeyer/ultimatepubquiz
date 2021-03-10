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
  "Pro-Tipp: Drücke Alt+F4, um den Text der aktuellen Frage bei Google zu suchen",
  "90/10 Regel im PM: 90% der Arbeit mit 10% des Budgets",
  "Ist nicht schlimm, dass wir keinen Plan haben, wir sind ja agil!",
  "Unabhängig von dem, was der Punktestand sagt, glauben wir, dass jeder sein oder ihr Bestes gegeben hat, unter Berücksichtigung des Timings, seiner oder ihrer Fähigkeiten und Kompetenzen, der zur Verfügung stehenden Mittel und der Situation",
  "Das dauert schon viel zu lange und du brauchst dringend einen Drink? Willkommen im 'Programmierer im Meeting'-Simulator 2020!",
  "Agile Coaches dürfen bei Schätzfragen nur mit Zahlen der Fibonacci-Reihe antworten",
  "Klassische Projektmanager sollten bei Schätzfragen ihren Wert vor dem Absenden verdoppelt, um die Trefferwahrscheinlichkeit zu erhöhen",
  "Testabdeckung ist wie Alkohol: Je mehr, desto besser, aber irgendwann ist es einfach zum Kotzen"
];

const MainGrid = styled.div`
  width: 100%;
  height: 100%;
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
