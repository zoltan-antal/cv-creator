import { useState } from 'react';
import blankCv from './dataStructures/blankCv';
import Editor from './Editor';
import Display from './Display';

function Main() {
  const [savedCvData, setSavedCvData] = useState(blankCv);
  const [tempCvData, setTempCvData] = useState(blankCv);

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
