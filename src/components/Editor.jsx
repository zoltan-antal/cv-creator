import '../styles/Editor.css';
import { useState } from 'react';
import EditorSection from './EditorSection';
import EditorSectionList from './EditorSectionList';
import blankSchool from '../dataStructures/blankSchool';
import blankJob from '../dataStructures/blankJob';
import blankSkillCategory from '../dataStructures/blankSkillCategory';

function Editor() {
  const [activeEditorSection, setActiveEditorSection] = useState(undefined);

  return (
    <section className="editor">
      <EditorSection
        title={'Personal Details'}
        path={['personalDetails']}
        isActive={activeEditorSection === 'personalDetails'}
        onShow={() => setActiveEditorSection('personalDetails')}
        onHide={() => setActiveEditorSection(false)}
      ></EditorSection>
      <EditorSectionList
        title={'Education'}
        elementName={'school'}
        path={['education']}
        isActive={activeEditorSection === 'education'}
        onShow={() => setActiveEditorSection('education')}
        onHide={() => setActiveEditorSection(false)}
        blankDataElement={blankSchool}
      ></EditorSectionList>
      <EditorSectionList
        title={'Work experience'}
        elementName={'job'}
        path={['workExperience']}
        isActive={activeEditorSection === 'workExperience'}
        onShow={() => setActiveEditorSection('workExperience')}
        onHide={() => setActiveEditorSection(false)}
        blankDataElement={blankJob}
      ></EditorSectionList>
      <EditorSectionList
        title={'Skills'}
        elementName={'skill category'}
        path={['skills']}
        isActive={activeEditorSection === 'skills'}
        onShow={() => setActiveEditorSection('skills')}
        onHide={() => setActiveEditorSection(false)}
        blankDataElement={blankSkillCategory}
      ></EditorSectionList>
    </section>
  );
}

export default Editor;
