import Button from '../Button';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../slices/userSlice';

const DeleteUserForm = ({
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
    if (!inputValues.currentPassword) {
      return;
    }
    try {
      await dispatch(
        deleteUser({
          password: inputValues.currentPassword,
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

  return (
    <form onSubmit={handleSubmit}>
      <pre>
        {
          'Are you sure you want to delete your account?\nAll CVs will be permanently lost.'
        }
      </pre>
      <pre>If yes, please confirm your current password:</pre>
      <label>
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
      <div className="buttons">
        <Button className="done dark red" name="Delete account" type="submit" />
        <Button
          className="discard dark"
          name="Cancel"
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

export default DeleteUserForm;
