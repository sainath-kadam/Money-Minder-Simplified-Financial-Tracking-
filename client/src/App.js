import React, { useState, useMemo } from 'react';
import styled from "styled-components";
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import SplitExpensess from './Components/Splite/SplitExpensess';

function App() {
  const [pin, setPin] = useState('');
  const [isPinValidated, setIsPinValidated] = useState(false);
  const correctPin = '123';
  const [active, setActive] = useState(1);
  const handlePinSubmit = () => {
    if (pin === correctPin) {
      setIsPinValidated(true);
    }
  };
  const displayData = () => {
    if (!isPinValidated) {
      return (
        <>
        <Heading>
        <h2>To access this locker, contact me – it's as simple as that!</h2>
        </Heading>
        < CenteredContainer>
        < PinForm>
        
        <div>
          <h2>Enter PIN</h2>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          <SubmitButton>
          <button onClick={handlePinSubmit}>Submit</button>
          </SubmitButton>
        </div>
        </PinForm>
        </CenteredContainer>
        <StyledQuote>
        Embracing the practice of saving signifies not only wisdom but also a forward-looking perspective,
       illustrating my commitment to crafting a prosperous future
        <br/>
        <br/>
        ~ Sainath Kadam
        </StyledQuote>
        </>
      );
    } else {
      switch (active) {
        case 1:
          return <Dashboard />;
        case 3:
          return <Income />;
        case 4:
          return <Expenses />;
          case 5:
          return <SplitExpensess />;
        default:
          return <Dashboard />;
      }
    }
  };
  return (
    <AppStyled bg={bg} className="App">
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </AppStyled>
  );
}
const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 35px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
`;
const PinForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 2px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;
const PinInput = styled.input`
  padding: 15px;
  font-size: 18px; 
  font-weight: bold;
  border: none;
  border-bottom: 2px solid #007bff;
  width: 220px;
  margin-bottom: 20px;
  outline: none;

  &::placeholder {
    color: #999;
  }
`;
const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 30px;
  font-size: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
const StyledQuote = styled.h4`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
  color: #000000;
`;
const Heading = styled.h2`
  padding: 40px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin: 10px 0;
  color: #000000;
`;

export default App;
