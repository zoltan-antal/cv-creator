import Button from '../Button';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../slices/userSlice';

const LoginForm = ({
  dialogRef,
  inputValuesState: { inputValues, setInputValues, resetInputValues },
  errorMessagesState: { errorMessages, setErrorMessages, resetErrorMessages },
}) => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(inputValues.username && inputValues.password)) {
      return;
    }
    try {
      await dispatch(
        loginUser({
          username: inputValues.username,
          password: inputValues.password,
        })
      );
      resetInputValues();
      resetErrorMessages();
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
    setInputValues((state) => {
      state.username = e.target.value;
    });
    setErrorMessages((state) => {
      state.username = '';
    });
  };

  const handlePasswordChange = (e) => {
    setInputValues((state) => {
      state.password = e.target.value;
    });
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
          value={inputValues.username}
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
          value={inputValues.password}
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
