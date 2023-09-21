import '../styles/Nav.css';
import { useCvDataDispatch } from '../utils/CvDataContext';
import Button from './Button';

function Nav() {
  const dispatchCvData = useCvDataDispatch();

  return (
    <nav>
      <Button
        name={'Clear CV'}
        onClick={() => dispatchCvData({ type: 'clearAllData' })}
      />
    </nav>
  );
}

export default Nav;
