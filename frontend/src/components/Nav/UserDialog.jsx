import { forwardRef, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useImmer } from 'use-immer';
import Button from '../Button';
import ChangeUsernameForm from './ChangeUsernameForm';
import ChangePasswordForm from './ChangePasswordForm';
import DeleteUserForm from './DeleteUserForm';

const UserDialog = forwardRef((_, ref) => {
  const user = useSelector((state) => state.user);

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
                      onClick={() => setView('deleteUser')}
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

              case 'deleteUser':
                return (
                  <DeleteUserForm
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
      </dialog>
    )
  );
});

UserDialog.displayName = 'UserDialog';

export default UserDialog;
