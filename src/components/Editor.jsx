import { useState } from 'react';
import EditorSection from './EditorSection';
import EditorList from './EditorList';
import blankSchool from '../dataStructures/blankSchool';
import _ from 'lodash';

function Editor({ savedCvData, setSavedCvData, tempCvData, setTempCvData }) {
  const [activeEditorSection, setActiveEditorSection] = useState(undefined);

  function updateField(path, value) {
    setTempCvData((cvData) => {
      _.set(cvData, path, value);
    });
  }

  function manageSection(path, mode) {
    switch (mode) {
      case 'discard':
        setTempCvData((cvData) =>
          _.set(cvData, path, _.get(savedCvData, path))
        );
        break;

      case 'save':
        setSavedCvData((cvData) => {
          _.set(cvData, path, _.get(tempCvData, path));
        });
        break;
    }
  }

  return (
    <section className="editor">
      <EditorSection
        title={'Personal Details'}
        name={'personalDetails'}
        path={['personalDetails']}
        data={tempCvData.personalDetails}
        isActive={activeEditorSection === 'personalDetails'}
        onShow={() => setActiveEditorSection('personalDetails')}
        onHide={() => setActiveEditorSection(false)}
        manageSection={manageSection}
        updateField={updateField}
      ></EditorSection>
      <EditorList
        title={'Education'}
        sectionName={'education'}
        elementName={'school'}
        path={['education']}
        data={tempCvData.education}
        blankDataElement={blankSchool}
        isActive={activeEditorSection === 'education'}
        onShow={() => setActiveEditorSection('education')}
        onHide={() => setActiveEditorSection(false)}
        manageSection={manageSection}
        updateField={updateField}
        setSavedCvData={setSavedCvData}
        setTempCvData={setTempCvData}
      ></EditorList>
    </section>
  );
}

export default Editor;
