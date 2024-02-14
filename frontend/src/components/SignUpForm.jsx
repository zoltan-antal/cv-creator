import { useState } from 'react';
import _ from 'lodash';
import Button from './Button';
import userService from '../services/user';
import loginService from '../services/login';
import cvService from '../services/cv';
import { useCvData } from '../contexts/CvDataContext';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const cvList = useCvData().cvLists.savedCvData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.createUser({ username, password });
      const user = await loginService.login({ username, password });
      localStorage.setItem('cvCreatorAuthToken', user.token);
      cvService.setToken(user.token);
      cvList.forEach(
        async (cv) => await cvService.createCV(_.omit(cv, ['id']))
      );
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
      <label>
        Confirm password:
        <input
          type="password"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
        />
      </label>
      <Button className="done dark" name="Submit" type="submit" />
    </form>
  );
};

export default SignUpForm;
