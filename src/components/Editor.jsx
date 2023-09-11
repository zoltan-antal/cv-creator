import { useState } from 'react';
import EditorSection from './EditorSection';
import EditorField from './EditorField';

function Editor({ savedCvData, setSavedCvData, tempCvData, setTempCvData }) {
  const [activeEditorSection, setActiveEditorSection] = useState(undefined);

  function updatePersonalDetails(fieldName, value) {
    setTempCvData((cvData) => {
      cvData.personalDetails[fieldName] = value;
    });
  }

  function discardSection(sectionName) {
    setTempCvData((cvData) => {
      cvData[sectionName] = savedCvData[sectionName];
    });
  }

  function saveSection(sectionName) {
    setSavedCvData((cvData) => {
      cvData[sectionName] = tempCvData[sectionName];
    });
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
            onChange={updatePersonalDetails}
          />
          <EditorField
            title={'Title'}
            name={'title'}
            type={'text'}
            value={tempCvData.personalDetails.title}
            onChange={updatePersonalDetails}
          />
          <EditorField
            title={'Email'}
            name={'email'}
            type={'email'}
            value={tempCvData.personalDetails.email}
            onChange={updatePersonalDetails}
          />
          <EditorField
            title={'Phone'}
            name={'phone'}
            type={'text'}
            value={tempCvData.personalDetails.phone}
            onChange={updatePersonalDetails}
          />
          <EditorField
            title={'Address'}
            name={'address'}
            type={'text'}
            value={tempCvData.personalDetails.address}
            onChange={updatePersonalDetails}
          />
          <EditorField
            title={'Personal introduction'}
            name={'introduction'}
            type={'text'}
            value={tempCvData.personalDetails.introduction}
            onChange={updatePersonalDetails}
          />
        </>
      </EditorSection>
    </section>
  );
}

export default Editor;
