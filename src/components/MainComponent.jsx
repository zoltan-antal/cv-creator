import { useImmer } from 'use-immer';
import blankCv from '../dataStructures/blankCv';
import Editor from './Editor';
import Display from './Display';
import '../styles/MainComponent.css';

function Main() {
  const [savedCvData, setSavedCvData] = useImmer(blankCv);
  const [tempCvData, setTempCvData] = useImmer(blankCv);

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
