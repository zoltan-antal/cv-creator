import _ from 'lodash';
import { useContext, useState } from 'react';
import { CvDataContext, CvDataDispatchContext } from '../utils/CvDataContext';
import EditorSection from './EditorSection';
import Button from './Button';

function EditorSectionList({
  title,
  elementName,
  path,
  isActive,
  onShow,
  onHide,
  blankDataElement,
}) {
  const cvData = useContext(CvDataContext);
  const dispatch = useContext(CvDataDispatchContext);
  const [activeEditorSection, setActiveEditorSection] = useState(undefined);

  return (
    <div className="editor-section-list">
      <div className="header" onClick={isActive ? onHide : onShow}>
        <h2 className="title">{title}</h2>
        {(() => {
          if (isActive) {
            return <Button type={'collapse'} />;
          } else {
            return <Button type={'expand'} />;
          }
        })()}
      </div>
      <div className="content" style={!isActive ? { display: 'none' } : {}}>
        {_.get(cvData, ['tempCvData', ...path]).map((element, index) => {
          return (
            <EditorSection
              key={element.id}
              title={
                Object.values(element)[1]
                  ? Object.values(element)[1]
                  : `Unnamed ${elementName}`
              }
              index={index}
              path={[...path, index]}
              isActive={activeEditorSection === element.id}
              onShow={() => setActiveEditorSection(element.id)}
              onHide={() => setActiveEditorSection(false)}
            >
              <Button
                type={'delete'}
                name={`Delete ${elementName}`}
                onClick={() =>
                  dispatch({
                    type: 'removeListElement',
                    path: path,
                    index: index,
                  })
                }
              />
            </EditorSection>
          );
        })}
        <Button
          type={'add'}
          onClick={() => {
            const id = self.crypto.randomUUID();
            dispatch({
              type: 'addListElement',
              path: path,
              blankDataElement: blankDataElement,
              id: id,
            });
            setActiveEditorSection(id);
          }}
        />
      </div>
    </div>
  );
}

export default EditorSectionList;
