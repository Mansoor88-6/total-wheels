import { useState } from "react";
import styled from "styled-components";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";

const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: var(--card-background);
  border-radius: 10px;
  padding: 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  max-height: 90vh;
  overflow-y: auto;

  @media (max-width: 450px) {
    width: 90%;
    padding: 20px;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #00a2ff44;
    border-radius: 3px;
  }
`;

const Title = styled(Typography)`
  font-family: "Orbitron", sans-serif !important;
  color: var(--primary-color) !important;
  margin-bottom: 20px !important;
  font-size: 1.5rem !important;

  @media (max-width: 450px) {
    font-size: 1.25rem !important;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    color: var(--text-primary);

    fieldset {
      border-color: rgba(255, 255, 255, 0.2);
    }

    &:hover fieldset {
      border-color: var(--primary-color);
    }

    &.Mui-focused fieldset {
      border-color: var(--primary-color);
    }
  }

  label {
    color: var(--text-secondary);

    &.Mui-focused {
      color: var(--primary-color);
    }
  }
`;

const SubmitButton = styled(Button)`
  background: var(--primary-gradient) !important;
  font-family: "Rajdhani", sans-serif !important;
  font-weight: 600 !important;
  padding: 10px !important;
  font-size: 1.1rem !important;
`;

interface RequestModelModalProps {
  open: boolean;
  onClose: () => void;
}

function RequestModelModal({ open, onClose }: RequestModelModalProps) {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="request-model-modal"
        sx={{
          "& .MuiBackdrop-root": {
            backdropFilter: "blur(3px)",
          },
        }}
      >
        <ModalContent>
          <Title variant="h5">Request New Model</Title>
          <Form onSubmit={handleSubmit}>
            <StyledTextField
              required
              label="Car Model"
              variant="outlined"
              placeholder="e.g., Porsche 911 GT3"
            />
            <StyledTextField
              required
              label="Email"
              type="email"
              variant="outlined"
              placeholder="your@email.com"
            />
            <StyledTextField
              label="Additional Details"
              multiline
              rows={3}
              variant="outlined"
              placeholder="Any specific details about the model..."
            />
            <SubmitButton type="submit" variant="contained">
              Submit Request
            </SubmitButton>
          </Form>
        </ModalContent>
      </Modal>
      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        message="Request submitted successfully!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        ContentProps={{
          sx: {
            background: "var(--card-background)",
            color: "var(--text-primary)",
            fontFamily: "Rajdhani, sans-serif",
            border: "1px solid var(--primary-color)",
          },
        }}
      />
    </>
  );
}

export default RequestModelModal;
