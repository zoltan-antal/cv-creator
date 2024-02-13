import '../styles/MainComponent.css';
import { useEffect } from 'react';
import { useSessionDispatch } from '../utils/SessionContext';
import userService from '../services/user';
import Editor from './Editor';
import Display from './Display';

function Main() {
  const sessionDispatch = useSessionDispatch();

  useEffect(() => {
    const initialiseSession = async () => {
      const token = localStorage.getItem('cvCreatorAuthToken');
      console.log(token);
      if (!token) {
        return;
      }
      userService.setToken(token);
      sessionDispatch({ type: 'addToken', token });
      const user = await userService.getUser();
      sessionDispatch({ type: 'addUser', user });
    };

    initialiseSession();
  }, [sessionDispatch]);

  return (
    <main>
      <Editor />
      <Display />
    </main>
  );
}

export default Main;
