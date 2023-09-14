import Button from './Button';
import '../styles/Nav.css';

function Nav({
  savedCvData,
  setSavedCvData,
  tempCvData,
  setTempCvData,
  blankCv,
}) {
  return (
    <nav>
      <Button
        name={'Clear CV'}
        onClick={() => {
          console.log(blankCv);
          setTempCvData((cvData) => (cvData = blankCv));
          setSavedCvData((cvData) => (cvData = blankCv));
        }}
      />
    </nav>
  );
}

export default Nav;
