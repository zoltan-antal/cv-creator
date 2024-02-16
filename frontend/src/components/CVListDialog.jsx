import '../styles/CVListDialog.css';
import { forwardRef } from 'react';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewCV,
  deleteCVById,
  updateSelectedCVId,
} from '../slices/cvDataSlice';

const CVListDialog = forwardRef((_, ref) => {
  const cvData = useSelector((state) => state.cvData);
  const dispatch = useDispatch();

  return (
    <dialog ref={ref} className="cv-list">
      <div className="dialog-content">
        <div className="list">
          {(() => {
            return cvData.cvLists.savedCVData
              .toSorted((a, b) => (a.name >= b.name ? 1 : -1))
              .map((cv) => {
                return (
                  <div
                    key={cv.id}
                    className={`cv${
                      cv.id === cvData.selectedCVId ? ' selected' : ''
                    }`}
                    onClick={() => dispatch(updateSelectedCVId({ id: cv.id }))}
                  >
                    <p>{cv.name}</p>
                    <div className="manage-cv">
                      <Button
                        type={'remove'}
                        onClick={async (e) => {
                          e.stopPropagation();
                          await dispatch(deleteCVById({ id: cv.id }));
                        }}
                      />
                    </div>
                  </div>
                );
              });
          })()}
        </div>
        <div className="buttons">
          <Button
            type={'add'}
            onClick={async () => await dispatch(addNewCV({ type: 'blank' }))}
          />
          <Button
            className="done dark"
            name="Done"
            onClick={() => ref.current.close()}
          />
        </div>
      </div>
    </dialog>
  );
});

CVListDialog.displayName = 'CVListDialog';

export default CVListDialog;
