import './Nav.css';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Button from '../Button';
import ConfirmDialog from '../ConfirmDialog';
import CVListDialog from './CVListDialog';
import LoginDialog from './LoginDialog';
import LogoutButton from './LogoutButton';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCV, clearCV } from '../../slices/cvDataSlice';

const Nav = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const clearConfirmDialogRef = useRef(null);
  const selectCVDialogRef = useRef(null);
  const loginDialogRef = useRef(null);

  const generatePdf = async () => {
    const input = document.querySelector('.page');
    const canvas = await html2canvas(input, { scale: 4 });

    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    // Invert colours
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
    // Apply 100% greyscale
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const newColour = avg <= 127 ? 0 : 255;
      data[i] = newColour;
      data[i + 1] = newColour;
      data[i + 2] = newColour;
    }
    ctx.putImageData(imageData, 0, 0);

    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
    const blobURL = pdf.output('bloburl');
    window.open(blobURL, '_blank');
  };

  return (
    <nav>
      <Button name={'Print/Save'} className="dark" onClick={generatePdf} />
      <Button
        name={'Clear'}
        className="dark red"
        onClick={() => clearConfirmDialogRef.current.showModal()}
      />
      <Button
        name={'Example CV'}
        className="dark"
        onClick={async () => {
          dispatch(addNewCV({ type: 'example' }));
        }}
      />
      <Button
        name={'CV list'}
        className="dark"
        onClick={() => selectCVDialogRef.current.showModal()}
      />
      {!user ? (
        <Button
          name={'Login'}
          className="dark"
          onClick={() => loginDialogRef.current.showModal()}
        />
      ) : (
        <LogoutButton />
      )}
      <ConfirmDialog
        ref={clearConfirmDialogRef}
        message="Are you sure you want to clear all contents of this CV?"
        onConfirm={async () => {
          await dispatch(clearCV());
        }}
      />
      <CVListDialog ref={selectCVDialogRef} />
      <LoginDialog ref={loginDialogRef} />
    </nav>
  );
};

export default Nav;
