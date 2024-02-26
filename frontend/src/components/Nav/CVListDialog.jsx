import { forwardRef, useRef, useState } from 'react';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewCV,
  deleteCVById,
  updateSelectedCVId,
} from '../../slices/cvDataSlice';
import ConfirmDialog from '../ConfirmDialog';

const CVListDialog = forwardRef((_, ref) => {
  const cvData = useSelector((state) => state.cvData);
  const dispatch = useDispatch();

  const deleteConfirmDialogRef = useRef(null);
  const [cvToDeleteId, setCvToDeleteId] = useState(null);

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
                      {cvData.cvLists.savedCVData.length > 1 && (
                        <Button
                          type={'remove'}
                          onClick={async (e) => {
                            e.stopPropagation();
                            setCvToDeleteId(cv.id);
                            deleteConfirmDialogRef.current.showModal();
                          }}
                        />
                      )}
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
      <ConfirmDialog
        ref={deleteConfirmDialogRef}
        message={
          cvToDeleteId &&
          `Are you sure you want to delete this CV?

        ${cvData.cvLists.savedCVData.find((cv) => cv.id === cvToDeleteId).name}`
        }
        onConfirm={async () => {
          const id = cvToDeleteId;
          setCvToDeleteId(null);
          await dispatch(deleteCVById({ id }));
        }}
      />
    </dialog>
  );
});

CVListDialog.displayName = 'CVListDialog';

export default CVListDialog;
