import _ from 'lodash';
import { useState } from 'react';
import EditorSection from './EditorSection';
import EditorSectionList from './EditorSectionList';
import blankSchool from '../dataStructures/blankSchool';
import blankJob from '../dataStructures/blankJob';
import blankSkillCategory from '../dataStructures/blankSkillCategory';

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

  function modifyList({ path, mode, index, blankDataElement, id, tempOnly }) {
    switch (mode) {
      case 'add':
        setDataFunctions.forEach((setData) => {
          if (tempOnly && setData === setSavedCvData) {
            return;
          }

          if (typeof blankDataElement === 'string') {
            setData((data) => {
              _.set(data, path, [..._.get(data, path), blankDataElement]);
            });
            return;
          }

          setData((data) => {
            _.set(data, path, [..._.get(data, path), { ...blankDataElement }]);
            _.set(data, [...path, _.get(data, path).length - 1, 'id'], id);
          });
        });
        break;

      case 'remove':
        setDataFunctions.forEach((setData) => {
          if (tempOnly && setData === setSavedCvData) {
            return;
          }

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
        modifyList={modifyList}
      ></EditorSection>
      <EditorSectionList
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
      ></EditorSectionList>
      <EditorSectionList
        title={'Work experience'}
        elementName={'job'}
        path={['workExperience']}
        data={tempCvData.workExperience}
        isActive={activeEditorSection === 'workExperience'}
        onShow={() => setActiveEditorSection('workExperience')}
        onHide={() => setActiveEditorSection(false)}
        manageSection={manageSection}
        updateField={updateField}
        blankDataElement={blankJob}
        modifyList={modifyList}
      ></EditorSectionList>
      <EditorSectionList
        title={'Skills'}
        elementName={'skill category'}
        path={['skills']}
        data={tempCvData.skills}
        isActive={activeEditorSection === 'skills'}
        onShow={() => setActiveEditorSection('skills')}
        onHide={() => setActiveEditorSection(false)}
        manageSection={manageSection}
        updateField={updateField}
        blankDataElement={blankSkillCategory}
        modifyList={modifyList}
      ></EditorSectionList>
    </section>
  );
}

export default Editor;
