import './styles/App.css';
import Header from './components/Header';
import Main from './components/MainComponent';
import Footer from './components/Footer';
import blankCv from './dataStructures/blankCv';
import { useImmer } from 'use-immer';

function App() {
  const localCvData = JSON.parse(localStorage.getItem('cvData'));

  const [savedCvData, setSavedCvData] = useImmer(localCvData || blankCv);
  const [tempCvData, setTempCvData] = useImmer(localCvData || blankCv);

  return (
    <>
      <Header
        savedCvData={savedCvData}
        setSavedCvData={setSavedCvData}
        tempCvData={tempCvData}
        setTempCvData={setTempCvData}
        blankCv={blankCv}
      />
      <Main
        savedCvData={savedCvData}
        setSavedCvData={setSavedCvData}
        tempCvData={tempCvData}
        setTempCvData={setTempCvData}
      />
      <Footer />
    </>
  );
}

export default App;
