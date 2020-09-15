import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { brandColor, brandColorText } from "../colors";
import { shuffle } from "../helpers";




interface IAppHeaderProps {
  title: string;
  subtitles: string[];
}

const Header = styled.header`
  grid-column-start: 1;
  grid-column-end: 4;
  background-color: ${brandColor};
  color: ${brandColorText};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
margin: 0;
`

export const AppHeader: React.FC<IAppHeaderProps> = ({ title, subtitles }) => {

  const [subtitle, setSubtitle] = useState(subtitles[0]);

  useEffect(() => {
    const timeout = setTimeout(() => {
        const otherSubtitles = subtitles.filter(st => st !== subtitle);
        setSubtitle(shuffle(otherSubtitles)[0]);
    }, 60_000 + Math.random() * 300_000);
    return () => clearTimeout(timeout);
  })

  return (
    <Header>
      <Title>{title}</Title>
      <span>{subtitle}</span>
    </Header>
  );
};