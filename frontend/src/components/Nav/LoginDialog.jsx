import { forwardRef, useState, useEffect } from 'react';
import Button from '../Button';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const LoginDialog = forwardRef((_, ref) => {
  const [selectedTab, setSelectedTab] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const resetInputs = () => {
    setUsername('');
    setPassword('');
    setPasswordRepeat('');
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        resetInputs();
        setSelectedTab('login');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setSelectedTab]);

  return (
    <dialog ref={ref} className="login">
      <div className="dialog-content">
        <div>
          <div>
            <Button
              className={`done ${selectedTab === 'login' ? 'light' : 'dark'}`}
              name="Log in"
              onClick={() => {
                resetInputs();
                setSelectedTab('login');
              }}
            />
            <Button
              className={`done ${selectedTab === 'signup' ? 'light' : 'dark'}`}
              name="Create account"
              onClick={() => {
                resetInputs();
                setSelectedTab('signup');
              }}
            />
          </div>
          <button
            onClick={() => {
              resetInputs();
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
            formValues={{ username, setUsername, password, setPassword }}
            resetInputs={resetInputs}
          />
        )}
        {selectedTab === 'signup' && (
          <SignUpForm
            dialogRef={ref}
            setSelectedTab={setSelectedTab}
            formValues={{
              username,
              setUsername,
              password,
              setPassword,
              passwordRepeat,
              setPasswordRepeat,
            }}
            resetInputs={resetInputs}
          />
        )}
      </div>
    </dialog>
  );
});

LoginDialog.displayName = 'LoginDialog';

export default LoginDialog;
