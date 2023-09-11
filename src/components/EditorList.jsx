import { useState } from 'react';
import EditorSection from './EditorSection';
import Button from './Button';
import EditorField from './EditorField';

function EditorList({
  title,
  sectionName,
  elementName,
  data,
  blankDataElement,
  isActive,
  onShow,
  onHide,
  onDiscardSection,
  onSaveSection,
  onChange,
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
              {data.map((item, index) => {
                return (
                  <div key={item.id}>
                    <EditorSection
                      title={
                        item.school || item.title
                          ? item.school || item.title
                          : `Unnamed ${elementName}`
                      }
                      name={sectionName}
                      index={index}
                      data={item}
                      isActive={activeEditorSection === item.id}
                      onShow={() => setActiveEditorSection(item.id)}
                      onHide={() => setActiveEditorSection(false)}
                      onDiscardSection={onDiscardSection}
                      onSaveSection={onSaveSection}
                    >
                      <>
                        {Object.entries(item).map(([key, value]) => {
                          if (key === 'id') {
                            return null;
                          }
                          if (typeof value === 'string') {
                            return (
                              <EditorField
                                key={key}
                                title={key}
                                name={key}
                                type={'text'}
                                value={value}
                                sectionName={sectionName}
                                index={index}
                                onChange={onChange}
                              />
                            );
                          }
                          if (typeof value === 'boolean') {
                            return (
                              <EditorField
                                key={key}
                                title={key}
                                name={key}
                                type={'checkbox'}
                                value={value}
                                sectionName={sectionName}
                                index={index}
                                onChange={onChange}
                              />
                            );
                          }
                          return <div key={key}></div>;
                        })}
                      </>
                    </EditorSection>
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
