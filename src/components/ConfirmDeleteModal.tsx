import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDeleteModalProps {
  mealTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  mealTitle,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content confirm-delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-delete-header">
          <div className="confirm-delete-icon">
            <AlertTriangle size={24} />
          </div>
          <button type="button" onClick={onCancel} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <div className="confirm-delete-body">
          <h2>Eliminar àpat</h2>
          <p className="confirm-delete-message">
            Estàs segur que vols eliminar l'àpat <strong>"{mealTitle}"</strong>?
          </p>
          <p className="confirm-delete-warning">
            Aquesta acció no es pot desfer.
          </p>
        </div>

        <div className="confirm-delete-actions">
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel·lar
          </button>
          <button type="button" onClick={onConfirm} className="confirm-delete-btn">
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
