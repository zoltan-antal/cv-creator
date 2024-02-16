import '../styles/LoginDialog.css';
import { forwardRef, useState } from 'react';
import Button from './Button';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const LoginDialog = forwardRef(function LoginDialog(_, ref) {
  const [selectedTab, setSelectedTab] = useState('login');

  return (
    <dialog ref={ref} className="login">
      <div className="dialog-content">
        <div>
          <Button
            className={`done ${selectedTab === 'login' ? 'light' : 'dark'}`}
            name="Log in"
            onClick={() => setSelectedTab('login')}
          />
          <Button
            className={`done ${selectedTab === 'signup' ? 'light' : 'dark'}`}
            name="Create account"
            onClick={() => setSelectedTab('signup')}
          />
        </div>
        {selectedTab === 'login' && <LoginForm dialogRef={ref} />}
        {selectedTab === 'signup' && (
          <SignUpForm dialogRef={ref} setSelectedTab={setSelectedTab} />
        )}
      </div>
    </dialog>
  );
});

export default LoginDialog;
