import Button from '../Button';
import { useDispatch } from 'react-redux';
import { createUser } from '../../slices/userSlice';
import { useImmer } from 'use-immer';

const SignUpForm = ({
  dialogRef,
  setSelectedTab,
  formValues: {
    username,
    setUsername,
    password,
    setPassword,
    passwordRepeat,
    setPasswordRepeat,
  },
  resetInputs,
}) => {
  const dispatch = useDispatch();

  const [errorMessages, setErrorMessages] = useImmer({
    username: '',
    password: '',
    passwordRepeat: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.values(errorMessages).every((value) => value === '')) {
      return;
    }
    try {
      await dispatch(createUser({ username, password }));
      resetInputs();
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
    setUsername(e.target.value);
    setErrorMessages((state) => {
      state.username =
        e.target.value.length < 4 ? 'Username must be 4+ characters' : '';
    });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessages((state) => {
      state.password =
        e.target.value.length < 8 ? 'Password must be 8+ characters' : '';
    });
  };

  const handlePasswordRepeatChange = (e) => {
    setPasswordRepeat(e.target.value);
    setErrorMessages((state) => {
      state.passwordRepeat =
        e.target.value !== password ? 'Passwords do not match' : '';
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
          value={passwordRepeat}
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
