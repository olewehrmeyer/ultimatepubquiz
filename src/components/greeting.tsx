import React from "react";
import styled from "styled-components";
import { QuizGreeting } from "../models";

const Image = styled.img`
    max-height: 50vh;
    max-width: calc(100vw - 300px);
    min-width: 50vw;
`;

const Greeting: React.FC<QuizGreeting> = (greeting) => {

    return <>
        <h1>{greeting.title}</h1>
        {greeting.preImageText && <p dangerouslySetInnerHTML={{__html: greeting.preImageText}}></p>}
        {greeting.image && <Image src={greeting.image}></Image>}
        {greeting.postImageText && <p dangerouslySetInnerHTML={{__html: greeting.postImageText}}></p>}
    </>
}

export default Greeting;