import { useState } from 'react';
// import _ from 'lodash';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { loginUser } from '../slices/userSlice';
// import loginService from '../services/login';
// import cvService from '../services/cv';
// import { useCvData } from '../contexts/CvDataContext';
// import blankCv from '../dataStructures/blankCv';

const LoginForm = ({ dialogRef }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const cvList = useCvData().cvLists.savedCvData;
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const user = await loginService.login({ username, password });
      // localStorage.setItem('cvCreatorAuthToken', user.token);
      // const cvListToKeep = cvList.filter(
      //   (cv) => !_.isEqual(_.omit(cv, ['id']), _.omit(blankCv, ['id']))
      // );
      // cvService.setToken(user.token);
      // cvListToKeep.forEach(
      //   async (cv) => await cvService.createCV(_.omit(cv, ['id']))
      // );
      // location.reload();
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
