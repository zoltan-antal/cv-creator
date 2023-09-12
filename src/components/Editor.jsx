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

  function discardSection(sectionName, index) {
    if (index) {
      setTempCvData((cvData) => {
        cvData[sectionName][index] = savedCvData[sectionName][index];
      });
    } else {
      setTempCvData((cvData) => {
        cvData[sectionName] = savedCvData[sectionName];
      });
    }
  }

  function saveSection(sectionName, index) {
    if (index) {
      setSavedCvData((cvData) => {
        cvData[sectionName][index] = tempCvData[sectionName][index];
      });
    } else {
      setSavedCvData((cvData) => {
        cvData[sectionName] = tempCvData[sectionName];
      });
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
        onDiscardSection={discardSection}
        onSaveSection={saveSection}
        onChange={updateField}
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
        onDiscardSection={discardSection}
        onSaveSection={saveSection}
        onChange={updateField}
        setSavedCvData={setSavedCvData}
        setTempCvData={setTempCvData}
      ></EditorList>
    </section>
  );
}

export default Editor;
