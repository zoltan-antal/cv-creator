import './EditableField.css';
import { useState } from 'react';
import Button from '../Button';

const EditableField = ({
  initialValue,
  handleChange,
  handleSave,
  handleDiscard,
  buttonLabel,
  className,
}) => {
  const [mode, setMode] = useState('view');
  const [value, setValue] = useState('');

  return (
    <div
      className={className ? `editable-field ${className}` : 'editable-field'}
    >
      {(() => {
        switch (mode) {
          case 'view':
            return (
              <>
                <pre>{initialValue}</pre>
                <Button
                  name={buttonLabel}
                  className="dark"
                  onClick={() => {
                    setValue(initialValue);
                    setMode('edit');
                  }}
                />
              </>
            );

          case 'edit':
            return (
              <>
                <input
                  type="text"
                  name={'name'}
                  value={value}
                  onChange={async (e) => {
                    setValue(e.target.value);
                    await handleChange(e);
                  }}
                ></input>
                <div className="manage-section">
                  <Button
                    type={'discard'}
                    className="dark"
                    onClick={async () => {
                      await handleDiscard();
                      setMode('view');
                    }}
                  />
                  <Button
                    type={'save'}
                    className="dark"
                    onClick={async () => {
                      if (!value) {
                        return;
                      }
                      await handleSave();
                      setMode('view');
                    }}
                  />
                </div>
              </>
            );
        }
      })()}
    </div>
  );
};

export default EditableField;
