import { forwardRef, useState, useEffect, useCallback } from 'react';
import { useImmer } from 'use-immer';
import Button from '../Button';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const LoginDialog = forwardRef((_, ref) => {
  const [selectedTab, setSelectedTab] = useState('login');
  const [inputValues, setInputValues] = useImmer({
    username: '',
    password: '',
    passwordRepeat: '',
  });
  const [errorMessages, setErrorMessages] = useImmer({
    username: '',
    password: '',
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        resetInputValues();
        resetErrorMessages();
        setSelectedTab('login');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [resetInputValues, resetErrorMessages, setSelectedTab]);

  return (
    <dialog ref={ref} className="login">
      <div className="dialog-content">
        <div>
          <div>
            <Button
              className={`done ${selectedTab === 'login' ? 'light' : 'dark'}`}
              name="Log in"
              onClick={() => {
                resetInputValues();
                resetErrorMessages();
                setSelectedTab('login');
              }}
            />
            <Button
              className={`done ${selectedTab === 'signup' ? 'light' : 'dark'}`}
              name="Create account"
              onClick={() => {
                resetInputValues();
                resetErrorMessages();
                setSelectedTab('signup');
              }}
            />
          </div>
          <button
            onClick={() => {
              resetInputValues();
              resetErrorMessages();
              setSelectedTab('login');
              ref.current.close();
            }}
          >
            X
          </button>
        </div>
        {selectedTab === 'login' && (
          <LoginForm
            dialogRef={ref}
            inputValuesState={{ inputValues, setInputValues, resetInputValues }}
            errorMessagesState={{
              errorMessages,
              setErrorMessages,
              resetErrorMessages,
            }}
          />
        )}
        {selectedTab === 'signup' && (
          <SignUpForm
            dialogRef={ref}
            setSelectedTab={setSelectedTab}
            inputValuesState={{ inputValues, setInputValues, resetInputValues }}
            errorMessagesState={{
              errorMessages,
              setErrorMessages,
              resetErrorMessages,
            }}
          />
        )}
      </div>
    </dialog>
  );
});

LoginDialog.displayName = 'LoginDialog';

export default LoginDialog;
