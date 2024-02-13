import '../styles/LoginDialog.css';
import { forwardRef, useState } from 'react';
import loginService from '../services/login';
// import Button from './Button';

const LoginDialog = forwardRef(function LoginDialog(_, ref) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      localStorage.setItem('cvCreatorAuthToken', user.token);
      location.reload();
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <dialog ref={ref} className="login">
      <div className="dialog-content">
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Login</button>
        </form>
        {/* <div className="buttons">
          <Button
            className="done dark"
            name="Done"
            onClick={() => ref.current.close()}
          />
        </div> */}
      </div>
    </dialog>
  );
});

export default LoginDialog;
