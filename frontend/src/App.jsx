import { useEffect } from 'react';
import './styles/App.css';
import Header from './components/Header';
import Main from './components/MainComponent';
import Footer from './components/Footer';
import { useDispatch } from 'react-redux';
import { initialiseCVData } from './slices/cvDataSlice';
import { retrieveLoggedUser } from './slices/userSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialiseCVData());
  });

  useEffect(() => {
    const initialiseUser = async () => {
      await dispatch(retrieveLoggedUser());
    };
    initialiseUser();
  });

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default App;
