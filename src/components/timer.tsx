import React from "react";
import styled, { keyframes } from "styled-components";
import { brandColor, brandColorText, grey } from "../colors";

interface ITimerProps {
  remaining: number;
  total: number;
}

interface IClockProps {
  circumference: number;
  offset: number;
}

const Svg = styled.svg`
  width: 150px;
  height: 150px;
  background: rgba(0,0,0,0.4);
  border-radius: 50%;
`;

const Circle = styled.circle<IClockProps>`
  stroke: #fff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: ${({ circumference }) =>
    `${circumference} ${circumference}`};
  stroke-dashoffset: ${({ offset }) => offset};
  transition: stroke-dashoffset 0.2s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  fill: transparent;
`;

const blink = keyframes`
from {
    opacity: 1;
}

50% {
    opacity: 0;
}

to {
    opacity: 1;
}
`;

const DoneCircle = styled.circle`
  stroke: ${brandColor};
  stroke-width: 4;
  animation: ${blink} 1s linear infinite;
  fill: transparent;
`;

const Text = styled.text`
  text-anchor: middle;
  font-weight: 300;
  font-size: 2em;
  fill: ${brandColorText};
  
`;

const Timer: React.FC<ITimerProps> = ({ remaining, total }) => {
  const circumference = 46 * 2 * Math.PI;

  const circle =
    remaining > 0 ? (
      <Circle
        r={46}
        cx={50}
        cy={50}
        circumference={circumference}
        offset={circumference - (remaining / total) * circumference}
      ></Circle>
    ) : (
      <DoneCircle r={46} cx={50} cy={50}></DoneCircle>
    );

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      {}
      {circle}
      <Text x={50} y={50} alignmentBaseline={"middle"} dominantBaseline={"middle"}>
        {remaining}
      </Text>
    </Svg>
  );
};

export default Timer;
