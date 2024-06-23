import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import FailedModal from "../components/Modal/FailedModal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Promotion from "../components/Promotion";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";

const Container = styled.div``;
const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const Title = styled.h1`
  color: black;
  font-weight: bold;
  margin: 20px auto;
  text-align: center;
  ${mobile({ fontSize: "24px" })}
`;
const Wrapper = styled.div`
  width: 85vw;
  max-width: 400px;
  padding: 20px;
  ${mobile({ width: "300px", flexDirection: "column" })};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Message = styled.div`
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
  color: green;
  ${mobile({ flex: "5" })}
`;
const InputField = styled.input`
  flex: 1;
  width: 85%;
  min-width: 40%;
  margin: 10px auto;
  padding: 10px;
  text-indent: 10px;
  border-radius: 30px;
  border: 1px solid lightgrey;
  ${mobile({ width: "100%" })};
`;
const Button = styled.button`
  text-align: center;
  width: 40%;
  border: none;
  padding: 10px 0;
  background-color: #110f12;
  border-radius: 30px;
  color: white;
  cursor: pointer;
  margin: 5px auto;
  transition: all 0.3s ease-out;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    background-color: #f8f8f8;
    color: black;
    cursor: not-allowed;
  }
`;
const Options = styled.a`
  margin: 8px 0px;
  font-size: 12px;
  color: grey;
  text-decoration: underline;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

const ChangePassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { isFetching, error } = useSelector((state) => state.user);
  const [send, setSend] = useState(false);
  const {t} = useTranslation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const res = await axios.post("http://localhost:5000/api/auth/forget-password", { email });
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/forget-password`, { email });
    
    if (res) {
      setSend(true);
    }
  };
  
  return (
    <Container>
      <FailedModal display={error === false ? "none" : "flex"} />
      <Promotion />
      <Navbar />
      <MainContainer>
        <Title>{t('reset_pass')}</Title>
        <Wrapper>
          <Form>
            <InputField
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              minLength={5}
            />
            <Button onClick={handleSubmit} disabled={isFetching ? true : false}>
            {t('send')}
            </Button>
          </Form>
          {send ? ( 
          <Message>{t('frt_pass')}</Message>
        ) : null}
          <Options
            onClick={() => {
              navigate("/sign-in");
            }}
          >
            {t('back')}
          </Options>
        </Wrapper>
      </MainContainer>
      <Footer />
    </Container>
  );
};

export default ChangePassword;