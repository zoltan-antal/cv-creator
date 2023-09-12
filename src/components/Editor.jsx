import { useState } from 'react';
import EditorSection from './EditorSection';
import EditorList from './EditorList';
import blankSchool from '../dataStructures/blankSchool';
import _ from 'lodash';

function Editor({ savedCvData, setSavedCvData, tempCvData, setTempCvData }) {
  const setDataFunctions = [setSavedCvData, setTempCvData];
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

  function modifyList({ path, mode, index, blankDataElement }) {
    let id = self.crypto.randomUUID();

    switch (mode) {
      case 'add':
        setDataFunctions.forEach((setData) => {
          setData((data) => {
            _.set(data, path, [..._.get(data, path), { ...blankDataElement }]);
            _.set(data, [...path, _.get(data, path).length - 1, 'id'], id);
          });
        });
        break;

      case 'remove':
        setDataFunctions.forEach((setData) => {
          setData((data) => {
            _.set(data, path, [
              ..._.get(data, path).slice(0, index),
              ..._.get(data, path).slice(index + 1),
            ]);
          });
        });
        break;
    }
  }

  return (
    <section className="editor">
      <EditorSection
        title={'Personal Details'}
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
        elementName={'school'}
        path={['education']}
        data={tempCvData.education}
        isActive={activeEditorSection === 'education'}
        onShow={() => setActiveEditorSection('education')}
        onHide={() => setActiveEditorSection(false)}
        manageSection={manageSection}
        updateField={updateField}
        blankDataElement={blankSchool}
        modifyList={modifyList}
      ></EditorList>
    </section>
  );
}

export default Editor;
