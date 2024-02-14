import '../styles/MainComponent.css';
import { useEffect } from 'react';
import { useSessionDispatch } from '../contexts/SessionContext';
import userService from '../services/user';
import cvService from '../services/cv';
import Editor from './Editor';
import Display from './Display';
import { useCvDataDispatch } from '../contexts/CvDataContext';

function Main() {
  const sessionDispatch = useSessionDispatch();
  const cvDataDispatch = useCvDataDispatch();

  useEffect(() => {
    const initialiseSession = async () => {
      const token = localStorage.getItem('cvCreatorAuthToken');
      if (!token) {
        return;
      }
      userService.setToken(token);
      sessionDispatch({ type: 'addToken', token });
      const user = await userService.getUser();
      sessionDispatch({ type: 'addUser', user });
      cvService.setToken(token);
      const cvList = await cvService.getCVs();
      localStorage.setItem('cvList', JSON.stringify(cvList));
      cvDataDispatch({ type: 'reloadCvData' });
    };

    initialiseSession();
  }, [sessionDispatch, cvDataDispatch]);

  return (
    <main>
      <Editor />
      <Display />
    </main>
  );
}

export default Main;
