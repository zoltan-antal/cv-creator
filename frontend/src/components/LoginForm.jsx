import { useState } from 'react';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { loginUser } from '../slices/userSlice';

const LoginForm = ({ dialogRef }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ username, password }));
      setUsername('');
      setPassword('');
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
          autoComplete="current-password"
        />
      </label>
      <Button className="done dark" name="Submit" type="submit" />
    </form>
  );
};

export default LoginForm;
