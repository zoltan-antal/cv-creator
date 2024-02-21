import Button from '../Button';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../slices/userSlice';

const ChangePasswordForm = ({
  inputValuesState: { inputValues, setInputValues, resetInputValues },
  errorMessagesState: { errorMessages, setErrorMessages, resetErrorMessages },
  setView,
}) => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.values(errorMessages).every((value) => value === '')) {
      return;
    }
    if (!(inputValues.currentPassword && inputValues.newPassword)) {
      return;
    }
    try {
      await dispatch(
        updateUser({
          currentPassword: inputValues.currentPassword,
          newPassword: inputValues.newPassword,
        })
      );
      resetInputValues();
      resetErrorMessages();
      setView('main');
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessages((state) => {
          state.currentPassword = 'Incorrect password';
        });
      } else if (error.response.status === 409) {
        setErrorMessages((state) => {
          state.username = 'Username is taken';
        });
      }
    }
  };

  const handleCurrentPasswordChange = (e) => {
    setInputValues((state) => {
      state.currentPassword = e.target.value;
    });
    setErrorMessages((state) => {
      state.currentPassword = '';
    });
  };

  const handleNewPasswordChange = (e) => {
    setInputValues((state) => {
      state.newPassword = e.target.value;
    });
    setErrorMessages((state) => {
      state.newPassword =
        e.target.value.length < 8 ? 'Password must be 8+ characters' : '';
      state.passwordRepeat =
        e.target.value !== inputValues.passwordRepeat
          ? 'Passwords do not match'
          : '';
    });
  };

  const handlePasswordRepeatChange = (e) => {
    setInputValues((state) => {
      state.passwordRepeat = e.target.value;
    });
    setErrorMessages((state) => {
      state.passwordRepeat =
        e.target.value !== inputValues.newPassword
          ? 'Passwords do not match'
          : '';
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Current password:
        <input
          type="password"
          value={inputValues.currentPassword}
          onChange={handleCurrentPasswordChange}
          autoComplete="current-password"
        />
        {errorMessages.currentPassword && (
          <div className="error-message">{errorMessages.currentPassword}</div>
        )}
      </label>
      <label>
        New password:
        <input
          type="password"
          value={inputValues.newPassword}
          onChange={handleNewPasswordChange}
          autoComplete="new-password"
        />
        {errorMessages.newPassword && (
          <div className="error-message">{errorMessages.newPassword}</div>
        )}
      </label>
      <label>
        Confirm new password:
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
      <div className="buttons">
        <Button className="done dark green" name="Submit" type="submit" />
        <Button
          className="discard dark"
          name="Discard"
          type="button"
          onClick={() => {
            resetInputValues();
            resetErrorMessages();
            setView('main');
          }}
        />
      </div>
    </form>
  );
};

export default ChangePasswordForm;
