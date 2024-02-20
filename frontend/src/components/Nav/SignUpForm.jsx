import Button from '../Button';
import { useDispatch } from 'react-redux';
import { createUser } from '../../slices/userSlice';

const SignUpForm = ({
  dialogRef,
  inputValuesState: { inputValues, setInputValues, resetInputValues },
  errorMessagesState: { errorMessages, setErrorMessages, resetErrorMessages },
  setSelectedTab,
}) => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.values(errorMessages).every((value) => value === '')) {
      return;
    }
    try {
      await dispatch(
        createUser({
          username: inputValues.username,
          password: inputValues.password,
        })
      );
      resetInputValues();
      resetErrorMessages();
      setSelectedTab('login');
      dialogRef.current.close();
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessages((state) => {
          state.username = 'Username is taken';
        });
      }
    }
  };

  const handleUsernameChange = (e) => {
    setInputValues((state) => {
      state.username = e.target.value;
    });
    setErrorMessages((state) => {
      state.username =
        e.target.value.length < 4 ? 'Username must be 4+ characters' : '';
    });
  };

  const handlePasswordChange = (e) => {
    setInputValues((state) => {
      state.password = e.target.value;
    });
    setErrorMessages((state) => {
      state.password =
        e.target.value.length < 8 ? 'Password must be 8+ characters' : '';
    });
  };

  const handlePasswordRepeatChange = (e) => {
    setInputValues((state) => {
      state.passwordRepeat = e.target.value;
    });
    setErrorMessages((state) => {
      state.passwordRepeat =
        e.target.value !== inputValues.password ? 'Passwords do not match' : '';
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
          autoComplete="new-password"
        />
        {errorMessages.password && (
          <div className="error-message">{errorMessages.password}</div>
        )}
      </label>
      <label>
        Confirm password:
        <input
          type="password"
          value={inputValues.passwordRepeat}
          onChange={handlePasswordRepeatChange}
          autoComplete="new-password"
        />
        {errorMessages.passwordRepeat && (
          <div className="error-message">{errorMessages.passwordRepeat}</div>
        )}
      </label>
      <Button className="done dark" name="Submit" type="submit" />
    </form>
  );
};

export default SignUpForm;
