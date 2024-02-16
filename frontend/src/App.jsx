import { useEffect } from 'react';
import './styles/App.css';
import Header from './components/Header';
import Main from './components/MainComponent';
import Footer from './components/Footer';
import { useDispatch } from 'react-redux';
import { initialiseCVData } from './slices/cvDataSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialiseCVData());
  });

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
