import { forwardRef, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../Button';
import ConfirmDialog from '../ConfirmDialog';
import { deleteUser } from '../../slices/userSlice';

const UserDialog = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const deleteAccountConfirmDialogRef = useRef(null);

  const handleDeleteAccount = async () => {
    await dispatch(deleteUser());
    ref.current.close();
  };

  return (
    <dialog ref={ref} className="user-settings">
      <div className="dialog-content">
        <div className="header">
          <h2>User settings</h2>
          <Button
            type={'close'}
            onClick={() => {
              ref.current.close();
            }}
          />
        </div>
        <Button
          name={'Delete account'}
          className="dark red"
          onClick={() => deleteAccountConfirmDialogRef.current.showModal()}
        />
      </div>
      <ConfirmDialog
        ref={deleteAccountConfirmDialogRef}
        message="Are you sure you want to delete your account?

All CVs will be permanently lost."
        onConfirm={handleDeleteAccount}
      />
    </dialog>
  );
});

UserDialog.displayName = 'UserDialog';

export default UserDialog;
