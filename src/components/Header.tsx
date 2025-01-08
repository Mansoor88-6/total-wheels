import styled from "styled-components";
import { Typography } from "@mui/material";

const HeaderContainer = styled.header`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    text-align: center;
    padding: 15px 10px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoText = styled(Typography)`
  font-family: "Orbitron", sans-serif !important;
  font-weight: 800 !important;
  font-size: 2.5rem !important;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 2rem !important;
  }
`;

const Tagline = styled(Typography)`
  font-family: "Rajdhani", sans-serif !important;
  color: var(--text-secondary);
  font-size: 1.1rem !important;
  letter-spacing: 2px;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1rem !important;
    letter-spacing: 1.5px;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo>
        <LogoText variant="h1">TOP WHEELS</LogoText>
      </Logo>
      <Tagline>Experience Automotive Excellence</Tagline>
    </HeaderContainer>
  );
}

export default Header;
