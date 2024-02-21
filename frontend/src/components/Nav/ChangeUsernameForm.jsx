import Button from '../Button';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../slices/userSlice';

const ChangeUsernameForm = ({
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
    try {
      await dispatch(updateUser({ username: inputValues.username }));
      resetInputValues();
      resetErrorMessages();
      setView('main');
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

export default ChangeUsernameForm;
