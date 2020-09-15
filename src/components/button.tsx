import styled from "styled-components";
import { brandColor, brandColorText, grey } from "../colors";

export const Button = styled.button`
  margin: 0;
  border: 0;
  border-radius: 20px;
  background-color: ${grey};
  height: 40px;
  min-width: 100px;
  padding: 0 15px;
  cursor: pointer;
  :hover {
    filter: brightness(90%);
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: ${brandColor};
  color: ${brandColorText};
`;

export const RoundButton = styled.button`
  background-color: white;
  border: none;
  text-align: center;
  padding: 5px;
  text-decoration: none;
  font-size: 14px;
  display: inline-block;
  transition: background-color linear 200ms;
  border-radius: 50%;
  cursor: pointer;

  :hover {
      background-color: ${grey};
  }
`;
