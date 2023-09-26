import '../styles/Page.css';
import { useCvData } from '../utils/CvDataContext';
import emailIcon from '../assets/icons/email.svg';
import phoneIcon from '../assets/icons/phone.svg';
import addressIcon from '../assets/icons/map-marker.svg';
import linkIcon from '../assets/icons/link.svg';

function Page() {
  const cvDataImport = useCvData();
  const cvData = cvDataImport.tempCvData;

  return (
    <div className="page">
      <div className="personal-details">
        <div className="personal-info">
          {Object.entries(cvData.personalDetails).map(([key, value]) => {
            if (key.includes('fullName')) {
              return (
                <h1 className="name" key={key}>
                  {value}
                </h1>
              );
            } else if (key.includes('professionalTitle')) {
              return (
                <h2 className="title" key={key}>
                  {value}
                </h2>
              );
            } else if (key.includes('professionalSummary')) {
              return (
                <pre className="summary" key={key}>
                  {value}
                </pre>
              );
            }
          })}
        </div>
        <div className="personal-data">
          {Object.entries(cvData.personalDetails).map(([key, value]) => {
            if (key.includes('email')) {
              return (
                <div className="entry email" key={key}>
                  <img src={emailIcon} alt="" />
                  <p>{value}</p>
                </div>
              );
            } else if (key.includes('phone')) {
              return (
                <div className="entry phone" key={key}>
                  <img src={phoneIcon} alt="" />
                  <p>{value}</p>
                </div>
              );
            } else if (key.includes('address')) {
              return (
                <div className="entry address" key={key}>
                  <img src={addressIcon} alt="" />
                  <p>{value}</p>
                </div>
              );
            } else if (key.includes('links')) {
              return (
                <>
                  {value.map((value) => {
                    return (
                      <div className="entry link" key={key}>
                        <img src={linkIcon} alt="" />
                        <p>{value}</p>
                      </div>
                    );
                  })}
                </>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Page;
