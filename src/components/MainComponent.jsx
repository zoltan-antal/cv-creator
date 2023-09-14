import Editor from './Editor';
import Display from './Display';
import '../styles/MainComponent.css';

function Main({ savedCvData, setSavedCvData, tempCvData, setTempCvData }) {
  return (
    <main>
      <Editor
        savedCvData={savedCvData}
        setSavedCvData={setSavedCvData}
        tempCvData={tempCvData}
        setTempCvData={setTempCvData}
      />
      <Display cvData={tempCvData} />
    </main>
  );
}

export default Main;
