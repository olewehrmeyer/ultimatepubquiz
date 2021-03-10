import styled from "styled-components";
import { brandColor, brandColorText, grey } from "../colors";

export const Button = styled.button`
  margin: 0;
  border: 0;
  border-radius: 10px;
  background-color: ${grey};
  min-width: 100px;
  padding: 10px 15px;
  margin: 0px 10px;
  font-size: 16pt;
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
  margin: 2px 2px;

  :hover {
      background-color: ${brandColor};
      color: #fff;
  }
`;

export const AddPlayerPrimaryButton = styled(RoundButton)`
  border-radius: 50%;
  position:absolute;
  right: 10px;
  bottom: 10px;
  background-color: ${brandColor};
  color: ${brandColorText};
  font-size:50px;
  margin: -25px;
    padding: 0px 14px;
   
    :hover {
      background-color: ${brandColorText};
      color: ${brandColor};
  }
`;
