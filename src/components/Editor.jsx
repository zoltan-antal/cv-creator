import { useState } from 'react';
import EditorSection from './EditorSection';
import EditorField from './EditorField';
import EditorList from './EditorList';
import blankSchool from '../dataStructures/blankSchool';

function Editor({ savedCvData, setSavedCvData, tempCvData, setTempCvData }) {
  const [activeEditorSection, setActiveEditorSection] = useState(undefined);

  function updateField(sectionName, index, fieldName, value) {
    if (index !== undefined) {
      setTempCvData((cvData) => {
        cvData[sectionName][index][fieldName] = value;
      });
    } else {
      setTempCvData((cvData) => {
        cvData[sectionName][fieldName] = value;
      });
    }
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
        data={tempCvData.personalDetails}
        isActive={activeEditorSection === 'personalDetails'}
        onShow={() => setActiveEditorSection('personalDetails')}
        onHide={() => setActiveEditorSection(false)}
        onDiscardSection={discardSection}
        onSaveSection={saveSection}
      >
        <>
          <EditorField
            title={'Full name'}
            name={'fullName'}
            type={'text'}
            value={tempCvData.personalDetails.fullName}
            sectionName={'personalDetails'}
            onChange={updateField}
          />
          <EditorField
            title={'Title'}
            name={'title'}
            type={'text'}
            value={tempCvData.personalDetails.title}
            sectionName={'personalDetails'}
            onChange={updateField}
          />
          <EditorField
            title={'Email'}
            name={'email'}
            type={'email'}
            value={tempCvData.personalDetails.email}
            sectionName={'personalDetails'}
            onChange={updateField}
          />
          <EditorField
            title={'Phone'}
            name={'phone'}
            type={'text'}
            value={tempCvData.personalDetails.phone}
            sectionName={'personalDetails'}
            onChange={updateField}
          />
          <EditorField
            title={'Address'}
            name={'address'}
            type={'text'}
            value={tempCvData.personalDetails.address}
            sectionName={'personalDetails'}
            onChange={updateField}
          />
          <EditorField
            title={'Personal introduction'}
            name={'introduction'}
            type={'text'}
            value={tempCvData.personalDetails.introduction}
            sectionName={'personalDetails'}
            onChange={updateField}
          />
        </>
      </EditorSection>
      <EditorList
        title={'Education'}
        sectionName={'education'}
        elementName={'school'}
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
