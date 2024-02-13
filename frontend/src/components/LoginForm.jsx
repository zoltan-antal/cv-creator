import { useState } from 'react';
import Button from './Button';
import loginService from '../services/login';

const LoginForm = () => {
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
      <Button className="done dark" name="Submit" type="submit" />
    </form>
  );
};

export default LoginForm;
