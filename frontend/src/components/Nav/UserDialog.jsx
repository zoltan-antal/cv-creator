import { forwardRef, useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button';
import ConfirmDialog from '../ConfirmDialog';
// import EditableField from '../EditableField';
import { deleteUser } from '../../slices/userSlice';
import ChangeUsernameForm from './ChangeUsernameForm';
import { useImmer } from 'use-immer';
import ChangePasswordForm from './ChangePasswordForm';

const UserDialog = forwardRef((_, ref) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const deleteAccountConfirmDialogRef = useRef(null);

  const [view, setView] = useState('main');
  const [inputValues, setInputValues] = useImmer({
    username: '',
    currentPassword: '',
    newPassword: '',
    passwordRepeat: '',
  });
  const [errorMessages, setErrorMessages] = useImmer({
    username: '',
    currentPassword: '',
    newPassword: '',
    passwordRepeat: '',
  });

  const resetInputValues = useCallback(() => {
    setInputValues((state) => {
      Object.keys(state).forEach((key) => (state[key] = ''));
    });
  }, [setInputValues]);
  const resetErrorMessages = useCallback(() => {
    setErrorMessages((state) => {
      Object.keys(state).forEach((key) => (state[key] = ''));
    });
  }, [setErrorMessages]);

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
                resetInputValues();
                resetErrorMessages();
                setView('main');
                ref.current.close();
              }}
            />
          </div>
          {(() => {
            switch (view) {
              case 'main':
                return (
                  <div className="settings-buttons">
                    <Button
                      name={'Change username'}
                      className="dark"
                      onClick={() => {
                        setInputValues((state) => {
                          state.username = user.username;
                        });
                        setView('changeUsername');
                      }}
                    />
                    <Button
                      name={'Change password'}
                      className="dark"
                      onClick={() => setView('changePassword')}
                    />
                    <Button
                      name={'Delete account'}
                      className="dark red"
                      onClick={() =>
                        deleteAccountConfirmDialogRef.current.showModal()
                      }
                    />
                  </div>
                );

              case 'changeUsername':
                return (
                  <ChangeUsernameForm
                    inputValuesState={{
                      inputValues,
                      setInputValues,
                      resetInputValues,
                    }}
                    errorMessagesState={{
                      errorMessages,
                      setErrorMessages,
                      resetErrorMessages,
                    }}
                    setView={setView}
                  />
                );

              case 'changePassword':
                return (
                  <ChangePasswordForm
                    inputValuesState={{
                      inputValues,
                      setInputValues,
                      resetInputValues,
                    }}
                    errorMessagesState={{
                      errorMessages,
                      setErrorMessages,
                      resetErrorMessages,
                    }}
                    setView={setView}
                  />
                );
            }
          })()}
        </div>
        <ConfirmDialog
          ref={deleteAccountConfirmDialogRef}
          message="
Are you sure you want to delete your account?

All CVs will be permanently lost.

"
          onConfirm={handleDeleteAccount}
        />
      </dialog>
    )
  );
});

UserDialog.displayName = 'UserDialog';

export default UserDialog;
