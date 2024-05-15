// src/components/SubmitButton.tsx
import React from "react";

interface SubmitButtonProps {
  text: string;
  loadingText?: string;
  onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  loadingText,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      disabled={!(loadingText == null)}
      style={{
        backgroundColor: "#007BFF",
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
        border: "none",
        outline: "none",
        transition: "background-color 0.3s ease"
      }}
    >
      {loadingText ?? text}
    </button>
  );
};

export default SubmitButton;
