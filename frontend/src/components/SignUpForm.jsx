import { useState } from 'react';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { createUser } from '../slices/userSlice';

const SignUpForm = ({ dialogRef, setSelectedTab }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(createUser({ username, password }));
      setUsername('');
      setPassword('');
      setSelectedTab('login');
      dialogRef.current.close();
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
      </label>
      <label>
        Confirm password:
        <input
          type="password"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
          autoComplete="new-password"
        />
      </label>
      <Button className="done dark" name="Submit" type="submit" />
    </form>
  );
};

export default SignUpForm;
