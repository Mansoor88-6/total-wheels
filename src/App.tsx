import { ThemeProvider, createTheme } from "@mui/material";
import styled from "styled-components";
import "./App.css";
import CarModel from "./components/CarModel";
import Dashboard from "./components/Dashboard";
import CarSelector from "./components/CarSelector";
import Header from "./components/Header";
import { useState } from "react";
// import ModelUploader from "./components/ModelUploader";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00a2ff",
    },
    background: {
      default: "#1a1a1a",
      paper: "#242424",
    },
  },
  typography: {
    fontFamily: "'Rajdhani', sans-serif",
    h1: {
      fontFamily: "'Orbitron', sans-serif",
    },
    h2: {
      fontFamily: "'Orbitron', sans-serif",
    },
    h3: {
      fontFamily: "'Orbitron', sans-serif",
    },
    h4: {
      fontFamily: "'Orbitron', sans-serif",
    },
    h5: {
      fontFamily: "'Orbitron', sans-serif",
    },
    h6: {
      fontFamily: "'Orbitron', sans-serif",
    },
  },
});

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: ${darkTheme.palette.background.default};
  color: white;
  position: relative;
  padding: 0 20px 20px calc(20% + 40px);
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 0 20px 20px;
  }
`;

const SidePanel = styled.div`
  width: 20%;
  min-width: 250px;
  position: fixed;
  top: 20px;
  left: 20px;
  bottom: 20px;
  background-color: #242424;
  border-radius: 10px;
  padding: 15px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    position: relative;
    width: 100%;
    min-width: unset;
    top: 0;
    left: 0;
    margin-bottom: 20px;
    max-height: 300px;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #00a2ff44;
    border-radius: 3px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding-bottom: 40px;
`;

const ModelSection = styled.div`
  height: 400px;
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const StatsSection = styled.div`
  width: 100%;
  > div {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100%;

    @media (max-width: 1200px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
`;

function App() {
  const [selectedModel, setSelectedModel] = useState("audi");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppContainer>
        <Header />
        <SidePanel>
          <CarSelector
            selectedModel={selectedModel}
            onSelectModel={setSelectedModel}
            isLoading={isLoading}
          />
        </SidePanel>
        <ContentContainer>
          <ModelSection>
            <CarModel
              selectedModel={selectedModel}
              onLoadingChange={setIsLoading}
            />
          </ModelSection>
          <StatsSection>
            <Dashboard selectedModel={selectedModel} />
          </StatsSection>
          {/* <ModelUploader /> */}
        </ContentContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
