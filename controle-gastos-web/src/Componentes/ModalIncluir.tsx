
import React from "react";
import "./ModalIncluir.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function ModalIncluir({ children}: ModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        {children}
      </div>
    </div>
  );
}