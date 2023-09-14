import Nav from './Nav';
import '../styles/Header.css';

function Header({
  savedCvData,
  setSavedCvData,
  tempCvData,
  setTempCvData,
  blankCv,
}) {
  return (
    <header>
      <h1>
        <a href="">CV Generator</a>
      </h1>
      <Nav
        savedCvData={savedCvData}
        setSavedCvData={setSavedCvData}
        tempCvData={tempCvData}
        setTempCvData={setTempCvData}
        blankCv={blankCv}
      />
    </header>
  );
}

export default Header;
