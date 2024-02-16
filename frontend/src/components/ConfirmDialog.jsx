import '../styles/ConfirmDialog.css';
import { forwardRef } from 'react';
import Button from './Button';

const ConfirmDialog = forwardRef(({ message, onConfirm, onCancel }, ref) => {
  return (
    <dialog ref={ref} className="confirm">
      <div className="dialog-content">
        <p>{message}</p>
        <div className="buttons">
          <Button
            className="yes dark"
            type="yes"
            onClick={() => {
              if (onConfirm) {
                onConfirm();
              }
              ref.current.close();
            }}
          />
          <Button
            className="no dark"
            type="no"
            onClick={() => {
              if (onCancel) {
                onCancel();
              }
              ref.current.close();
            }}
          />
        </div>
      </div>
    </dialog>
  );
});

ConfirmDialog.displayName = 'ConfirmDialog';

export default ConfirmDialog;
