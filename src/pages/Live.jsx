import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Promotion from "../components/Promotion";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useTranslation } from "react-i18next";
import WebcamApp from "../components/Webcam/WebcamApp";

const Container = styled.div``;
const Wrapper = styled.div`
  margin: auto;
  max-width: 1295px;
  width: 90vw;
  padding: 55px 0;
  ${mobile({ padding: "10px 0" })}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 10px 0;
  min-width: 240px;
`;

const Title = styled.h1`
  font-weight: 300;
  ${mobile({ fontSize: "24px" })}
`;
const TextContainer = styled.div`
  justify-content: center;
  margin: auto;
  align-items: center;
  display: flex;
  padding-top: 20px;
  ${mobile({ padding: "10px 0" })}
`;
const Text = styled.span`
  margin-left: 5px;
  text-align: center;
  ${mobile({ fontSize: "0.8rem" })};
  font-weight: 500;
`;

const Action = styled.div`
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  align-items: center;
  color: grey;
  font-size: 0.9rem;
  &:hover {
    color: black;
  }
  font-weight: bold;
`;
const IndividualContainer = styled.div`
  margin: auto;
  max-width: 1290px;
  width: 90vw;
`;
const IndividualWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  ${mobile({ padding: "0 10px" })}
  font-size: 1.2rem;
  color: #333;
`;

const BottomButton = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 15px 30px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 30px;
  &:hover {
    background-color: #333;
  }
`;

const Live = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigate = () => {
    navigate("/hand");
  };

  return (
    <Container>
      <Promotion />
      <Navbar />
      <Wrapper>
        <Title>{t("live")}</Title>
        <TextContainer>
          <Left>
            <Action
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowRightAltIcon style={{ transform: "rotate(180deg)" }} />
              <Text>{t("back")}</Text>
            </Action>
          </Left>
        </TextContainer>
        <IndividualContainer>
          <IndividualWrapper>
            Try on virtual masks in real-time using your webcam! Select a mask
            from the options below and see it appear on your face.
          </IndividualWrapper>
        </IndividualContainer>
      </Wrapper>
      <WebcamApp />
      <Wrapper>
        <TextContainer>
          <Title>Hand Control</Title>
        </TextContainer>
        <BottomButton onClick={handleNavigate}>Hand Control</BottomButton>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Live;
