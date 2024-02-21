import './Editor.css';
import { useState } from 'react';
import EditorSection from './EditorSection';
import EditorSectionList from './EditorSectionList';
import EditableField from '../EditableField';
import blankSchool from '../../dataStructures/blankSchool';
import blankJob from '../../dataStructures/blankJob';
import blankSkillCategory from '../../dataStructures/blankSkillCategory';
import { useDispatch, useSelector } from 'react-redux';
import {
  discardTempCV,
  saveTempCV,
  updateTempCV,
} from '../../slices/cvDataSlice';

const Editor = () => {
  const [activeEditorSection, setActiveEditorSection] = useState(undefined);
  const basePath = ['content'];
  const cvData = useSelector((state) => state.cvData);
  const dispatch = useDispatch();

  return (
    <section className="editor">
      <EditableField
        initialValue={cvData.cvLists.savedCVData[cvData.selectedCVIndex].name}
        handleChange={async (e) =>
          await dispatch(
            updateTempCV({ value: e.target.value, path: ['name'] })
          )
        }
        handleSave={async () => await dispatch(saveTempCV())}
        handleDiscard={async () => await dispatch(discardTempCV())}
        buttonLabel={'Rename'}
        className={'cv-name'}
      ></EditableField>
      <EditorSection
        title={'Personal Details'}
        path={[...basePath, 'personalDetails']}
        isActive={activeEditorSection === 'personalDetails'}
        onShow={() => setActiveEditorSection('personalDetails')}
        onHide={() => setActiveEditorSection(false)}
      ></EditorSection>
      <EditorSectionList
        title={'Education'}
        elementName={'school'}
        path={[...basePath, 'education']}
        isActive={activeEditorSection === 'education'}
        onShow={() => setActiveEditorSection('education')}
        onHide={() => setActiveEditorSection(false)}
        blankDataElement={blankSchool}
      ></EditorSectionList>
      <EditorSectionList
        title={'Work experience'}
        elementName={'job'}
        path={[...basePath, 'workExperience']}
        isActive={activeEditorSection === 'workExperience'}
        onShow={() => setActiveEditorSection('workExperience')}
        onHide={() => setActiveEditorSection(false)}
        blankDataElement={blankJob}
      ></EditorSectionList>
      <EditorSectionList
        title={'Skills'}
        elementName={'skill category'}
        path={[...basePath, 'skills']}
        isActive={activeEditorSection === 'skills'}
        onShow={() => setActiveEditorSection('skills')}
        onHide={() => setActiveEditorSection(false)}
        blankDataElement={blankSkillCategory}
      ></EditorSectionList>
    </section>
  );
};

export default Editor;
