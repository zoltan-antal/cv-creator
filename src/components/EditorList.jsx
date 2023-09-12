import { useState } from 'react';
import EditorSection from './EditorSection';
import Button from './Button';

function EditorList({
  title,
  sectionName,
  elementName,
  path,
  data,
  blankDataElement,
  isActive,
  onShow,
  onHide,
  manageSection,
  updateField,
  setSavedCvData,
  setTempCvData,
}) {
  const [activeEditorSection, setActiveEditorSection] = useState(undefined);

  return (
    <>
      <h2>{title}</h2>
      {(() => {
        if (isActive) {
          return (
            <>
              <Button name={'▲'} onClick={onHide} />
              {data.map((element, index) => {
                return (
                  <div key={element.id}>
                    <EditorSection
                      title={
                        element.school || element.title
                          ? element.school || element.title
                          : `Unnamed ${elementName}`
                      }
                      name={sectionName}
                      index={index}
                      path={[...path, index]}
                      data={element}
                      isActive={activeEditorSection === element.id}
                      onShow={() => setActiveEditorSection(element.id)}
                      onHide={() => setActiveEditorSection(false)}
                      manageSection={manageSection}
                      updateField={updateField}
                    ></EditorSection>
                    <Button
                      name={'╳'}
                      onClick={() => {
                        setSavedCvData((cvData) => {
                          cvData[sectionName].splice(index, 1);
                        });
                        setTempCvData((cvData) => {
                          cvData[sectionName].splice(index, 1);
                        });
                      }}
                    />
                  </div>
                );
              })}
              <Button
                name={'+'}
                onClick={() => {
                  let id = self.crypto.randomUUID();
                  setSavedCvData((cvData) => {
                    cvData[sectionName].push({ ...blankDataElement });
                    cvData[sectionName].slice(-1)[0].id = id;
                  });
                  setTempCvData((cvData) => {
                    cvData[sectionName].push({ ...blankDataElement });
                    cvData[sectionName].slice(-1)[0].id = id;
                  });
                }}
              />
            </>
          );
        } else {
          return (
            <>
              <Button name={'▼'} onClick={onShow} />
            </>
          );
        }
      })()}
    </>
  );
}

export default EditorList;
