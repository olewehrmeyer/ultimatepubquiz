import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { brandColor, brandColorText } from "../colors";
import { shuffle } from "../helpers";




interface IAppHeaderProps {
  title: string;
  subtitles: string[];
}

const Header = styled.header`
  position: absolute;
  z-index: 2000;
  top: 0;
  right: 0;
  width: 550px;
  padding: 20px;
  padding-left: 50px;
  text-align: right;
    
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