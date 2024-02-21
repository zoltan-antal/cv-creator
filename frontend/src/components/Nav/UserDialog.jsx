import { forwardRef, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button';
import ConfirmDialog from '../ConfirmDialog';
import EditableField from '../EditableField';
import { deleteUser, updateUser } from '../../slices/userSlice';

const UserDialog = forwardRef((_, ref) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const deleteAccountConfirmDialogRef = useRef(null);

  const [username, setUsername] = useState('');

  const handleDeleteAccount = async () => {
    await dispatch(deleteUser());
    ref.current.close();
  };

  return (
    user && (
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
          <div className="username-change">
            <div>Username:</div>
            <EditableField
              initialValue={user.username}
              handleChange={(e) => setUsername(e.target.value)}
              handleSave={async () => {
                if (!username || username === user.username) {
                  return;
                }
                await dispatch(updateUser({ username }));
              }}
              handleDiscard={() => setUsername(user.username)}
              buttonLabel={'Change'}
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
    )
  );
});

UserDialog.displayName = 'UserDialog';

export default UserDialog;
