import '../styles/Nav.css';
import { useCvDataDispatch } from '../utils/CvDataContext';
import Button from './Button';

function Nav() {
  const dispatch = useCvDataDispatch();

  return (
    <nav>
      <Button
        name={'Clear CV'}
        onClick={() => dispatch({ type: 'clearAllData' })}
      />
    </nav>
  );
}

export default Nav;
