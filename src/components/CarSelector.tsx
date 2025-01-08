import styled from "styled-components";
import { Paper, Typography, CircularProgress } from "@mui/material";
import RequestModelModal from "./RequestModelModal";
import { useState } from "react";

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 100%;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #00a2ff44;
    border-radius: 3px;
  }
`;

const SelectorTitle = styled(Typography)`
  text-align: center;
  margin-bottom: 15px !important;
  font-family: "Orbitron", sans-serif !important;
  letter-spacing: 1px;
`;

const CarOption = styled(Paper)<{ selected?: boolean }>`
  padding: 15px;
  cursor: pointer;
  border: 2px solid ${(props) => (props.selected ? "#00a2ff" : "transparent")};
  background-color: #242424 !important;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border-color: #00a2ff88;
    transform: translateX(4px);
  }
`;

const ModelName = styled(Typography)`
  flex-grow: 1;
  font-size: 1.1rem !important;
  font-family: "Rajdhani", sans-serif !important;
  font-weight: 500 !important;
`;

const RequestOption = styled(CarOption)`
  border: 1px dashed rgba(255, 255, 255, 0.2);
  background: transparent !important;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--primary-color);
    background: rgba(0, 162, 255, 0.1) !important;
  }

  .request-text {
    color: var(--text-secondary);
    font-family: "Rajdhani", sans-serif;
    font-size: 1rem;
  }
`;

const carModels = [
  { id: "audi", name: "Audi RS7 Sportback", file: "/Audi.fbx" },
  { id: "challenger", name: "Dodge Challenger SRT", file: "/Challenger.fbx" },
  { id: "truck", name: "Ford F-150 Raptor", file: "/Truck.fbx" },
  { id: "range", name: "Range Rover Sport SVR", file: "/Range.fbx" },
  { id: "supra", name: "Toyota GR Supra", file: "/Supra.fbx" },
  { id: "gtr", name: "Nissan GT-R Nismo", file: "/GTR.fbx" },
];

interface CarSelectorProps {
  selectedModel: string;
  onSelectModel: (model: string) => void;
  isLoading: boolean;
}

function CarSelector({
  selectedModel,
  onSelectModel,
  isLoading,
}: CarSelectorProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <SelectorContainer>
      <SelectorTitle variant="h6" color="primary">
        SELECT MODEL
      </SelectorTitle>
      {carModels.map((car) => (
        <CarOption
          key={car.id}
          selected={selectedModel === car.id}
          onClick={() => onSelectModel(car.id)}
        >
          <ModelName variant="subtitle1">{car.name}</ModelName>
          {isLoading && selectedModel === car.id && (
            <CircularProgress size={16} style={{ color: "#00a2ff" }} />
          )}
        </CarOption>
      ))}
      <RequestOption onClick={() => setModalOpen(true)}>
        <ModelName className="request-text">+ Request New Model</ModelName>
      </RequestOption>
      <RequestModelModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </SelectorContainer>
  );
}

export default CarSelector;
