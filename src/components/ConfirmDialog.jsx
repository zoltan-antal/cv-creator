import { forwardRef } from 'react';

const ConfirmDialog = forwardRef(function ConfirmDialog(
  { message, onConfirm, onCancel },
  ref
) {
  return (
    <dialog ref={ref} className="confirm">
      <div className="dialog-content">
        <p>{message}</p>
        <div className="buttons">
          <button
            className="yes"
            onClick={() => {
              if (onConfirm) {
                onConfirm();
              }
              ref.current.close();
            }}
          >
            Yes
          </button>
          <button
            className="no"
            onClick={() => {
              if (onCancel) {
                onCancel();
              }
              ref.current.close();
            }}
          >
            No
          </button>
        </div>
      </div>
    </dialog>
  );
});

export default ConfirmDialog;
