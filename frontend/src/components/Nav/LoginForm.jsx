import Button from '../Button';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../slices/userSlice';
import { useImmer } from 'use-immer';

const LoginForm = ({
  dialogRef,
  formValues: { username, setUsername, password, setPassword },
  resetInputs,
}) => {
  const dispatch = useDispatch();

  const [errorMessages, setErrorMessages] = useImmer({
    username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ username, password }));
      resetInputs();
      dialogRef.current.close();
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessages((state) => {
          state.username = ' ';
          state.password = 'Incorrect username or password';
        });
      }
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setErrorMessages((state) => {
      state.username = '';
    });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessages((state) => {
      state.password = '';
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          autoComplete="username"
        />
        {errorMessages.username && (
          <div className="error-message">{errorMessages.username}</div>
        )}
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          autoComplete="current-password"
        />
        {errorMessages.password && (
          <div className="error-message">{errorMessages.password}</div>
        )}
      </label>
      <Button className="done dark" name="Submit" type="submit" />
    </form>
  );
};

export default LoginForm;
