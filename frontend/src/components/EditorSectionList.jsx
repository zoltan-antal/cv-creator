import _ from 'lodash';
import { useState } from 'react';
import EditorSection from './EditorSection';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  addListElementToTempCV,
  removeListElementFromTempCV,
  saveTempCV,
} from '../slices/cvDataSlice';

function EditorSectionList({
  title,
  elementName,
  path,
  isActive,
  onShow,
  onHide,
  blankDataElement,
}) {
  const cvData = useSelector((state) => state.cvData);
  const dispatch = useDispatch();
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
        {_.get(cvData, [
          'cvLists',
          'tempCVData',
          cvData.selectedCVIndex,
          ...path,
        ]).map((element, index) => {
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
                className={'dark'}
                name={`Delete ${elementName}`}
                onClick={async () => {
                  dispatch(removeListElementFromTempCV({ index, path }));
                  await dispatch(saveTempCV());
                }}
              />
            </EditorSection>
          );
        })}
        <Button
          type={'add'}
          onClick={async () => {
            const id = self.crypto.randomUUID();
            const newDataElement = { ...blankDataElement };
            newDataElement.id = id;
            dispatch(
              addListElementToTempCV({ blankDataElement: newDataElement, path })
            );
            await dispatch(saveTempCV());
            setActiveEditorSection(id);
          }}
        />
      </div>
    </div>
  );
}

export default EditorSectionList;
