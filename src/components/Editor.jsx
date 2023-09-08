import { useState } from 'react';
import EditorSection from './EditorSection';
import EditorField from './EditorField';

function Editor({ savedCvData, setSavedCvData, tempCvData, setTempCvData }) {
  function updatePersonalDetails(fieldName, value) {
    const newCvData = { ...tempCvData };
    newCvData.personalDetails[fieldName] = value;
    console.log(newCvData);
    setTempCvData(newCvData);
  }

  return (
    <section className="editor">
      <EditorSection title={'Personal Details'}>
        <EditorField
          title={'Full name'}
          name={'fullName'}
          type={'text'}
          onChange={updatePersonalDetails}
        />
        <p>{tempCvData.personalDetails.fullName}</p>
        <EditorField title={'Title'} name={'title'} type={'text'} />
        <EditorField title={'Email'} name={'email'} type={'email'} />
        <EditorField title={'Phone'} name={'phone'} type={'text'} />
        <EditorField title={'Address'} name={'address'} type={'text'} />
        <EditorField
          title={'Personal introduction'}
          name={'introduction'}
          type={'text'}
        />
      </EditorSection>
    </section>
  );
}

export default Editor;
