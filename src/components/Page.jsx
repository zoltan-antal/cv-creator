import '../styles/Page.css';
import { useCvData } from '../utils/CvDataContext';

function Page() {
  const cvData = useCvData();
  const savedCvData = cvData.savedCvData;

  return (
    <div className="page">
      <div className="personal-details">
        {savedCvData.personalDetails.fullName}
      </div>
    </div>
  );
}

export default Page;
