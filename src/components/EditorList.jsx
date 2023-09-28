import { useEffect } from 'react';
import '../styles/EditorList.css';
import { useCvDataDispatch } from '../utils/CvDataContext';
import Button from './Button';

function EditorList({ title, type, path, data }) {
  const dispatchCvData = useCvDataDispatch();

  useEffect(() => {
    const textareas = document.querySelectorAll('.editor-list textarea');
    textareas.forEach((textarea) => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    });
  });

  return (
    <label className="editor-list">
      {title}
      {data.map((value, index) => {
        return (
          <div className="list-item" key={index}>
            {(() => {
              switch (type) {
                case 'text':
                  return (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        dispatchCvData({
                          type: 'update',
                          path: [...path, index],
                          value: e.target.value,
                        })
                      }
                    ></input>
                  );

                case 'textarea':
                  return (
                    <textarea
                      rows={1}
                      value={value}
                      onChange={(e) =>
                        dispatchCvData({
                          type: 'update',
                          path: [...path, index],
                          value: e.target.value,
                        })
                      }
                    ></textarea>
                  );
              }
            })()}
            <Button
              type={'remove'}
              onClick={() => {
                dispatchCvData({
                  type: 'removeListElement',
                  path: path,
                  index: index,
                  tempOnly: true,
                });
              }}
            ></Button>
          </div>
        );
      })}
      <Button
        type={'add'}
        onClick={() =>
          dispatchCvData({
            type: 'addListElement',
            path: path,
            blankDataElement: '',
            tempOnly: true,
          })
        }
      ></Button>
    </label>
  );
}

export default EditorList;
