import '../styles/Page.css';
import { useCvData } from '../utils/CvDataContext';
import emailIcon from '../assets/icons/email.svg';
import phoneIcon from '../assets/icons/phone.svg';
import addressIcon from '../assets/icons/map-marker.svg';
import linkIcon from '../assets/icons/link.svg';
import { format } from 'date-fns';

function Page() {
  const cvDataImport = useCvData();
  const cvData = cvDataImport.tempCvData;

  return (
    <div className="page">
      <div className="personal-info">
        <h1 className="name">{cvData.personalDetails.fullName}</h1>
        {Object.entries(cvData.personalDetails).map(([key, value]) => {
          if (key.includes('professionalTitle') && value) {
            return (
              <h2 className="title" key={key}>
                {value}
              </h2>
            );
          } else if (key.includes('professionalSummary') && value) {
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
          if (key.includes('email') && value) {
            return (
              <div className="entry email" key={key}>
                <img src={emailIcon} alt="" />
                <p>{value}</p>
              </div>
            );
          } else if (key.includes('phone') && value) {
            return (
              <div className="entry phone" key={key}>
                <img src={phoneIcon} alt="" />
                <p>{value}</p>
              </div>
            );
          } else if (key.includes('address') && value) {
            return (
              <div className="entry address" key={key}>
                <img src={addressIcon} alt="" />
                <p>{value}</p>
              </div>
            );
          } else if (key.includes('links')) {
            return (
              <>
                {value.map((value, index) => {
                  if (value) {
                    return (
                      <div className="entry link" key={index}>
                        <img src={linkIcon} alt="" />
                        <p>{value}</p>
                      </div>
                    );
                  }
                })}
              </>
            );
          }
        })}
      </div>
      {(() => {
        if (cvData.education.length > 0) {
          return (
            <div className="education">
              <h3>Education</h3>
              {cvData.education.map((item) => {
                return (
                  <div className="school" key={item.id}>
                    <div className="main-info">
                      {(() => {
                        if (item.school) {
                          return <h4 className="name">{item.school}</h4>;
                        }
                      })()}
                      {(() => {
                        if (item.qualification) {
                          return (
                            <h5 className="qualification">
                              {item.qualification}
                            </h5>
                          );
                        }
                      })()}
                      {(() => {
                        if (item.grade) {
                          return <h5 className="grade">{item.grade}</h5>;
                        }
                      })()}
                    </div>
                    <div className="side-info">
                      {(() => {
                        if (item.location) {
                          return <p className="location">{item.location}</p>;
                        }
                      })()}
                      {(() => {
                        if (item.ongoing) {
                          if (Number(item.startDate)) {
                            return (
                              <p className="date">
                                {format(item.startDate, 'MMM yyyy')} - present
                              </p>
                            );
                          }
                        } else {
                          if (Number(item.startDate) && Number(item.endDate)) {
                            return (
                              <p className="date">
                                {format(item.startDate, 'MMM yyyy')} -{' '}
                                {format(item.endDate, 'MMM yyyy')}
                              </p>
                            );
                          }
                        }
                      })()}
                    </div>
                    {(() => {
                      const additionalInfo = getValueByKeyFragment(
                        item,
                        'additionalInfo'
                      );
                      if (additionalInfo.length === 0) {
                        return null;
                      }
                      if (additionalInfo.every((content) => content === '')) {
                        return null;
                      }

                      return (
                        <div className="additional-info">
                          {additionalInfo.map((value, index) => {
                            if (value === '') {
                              return null;
                            }

                            return <pre key={index}>{value}</pre>;
                          })}
                        </div>
                      );
                    })()}
                  </div>
                );
              })}
            </div>
          );
        }
      })()}
      {(() => {
        if (cvData.workExperience.length > 0) {
          return (
            <div className="work-experience">
              <h3>Work experience</h3>
            </div>
          );
        }
      })()}
      {(() => {
        if (cvData.skills.length > 0) {
          return (
            <div className="skills">
              <h3>Skills</h3>
              {cvData.skills.map((item) => {
                return (
                  <div className="skill-category" key={item.id}>
                    {(() => {
                      if (item.title) {
                        return <h6 className="title">{item.title}</h6>;
                      }
                    })()}
                    {(() => {
                      const skills = getValueByKeyFragment(item, 'skills');
                      if (skills.length === 0) {
                        return null;
                      }
                      if (skills.every((content) => content === '')) {
                        return null;
                      }

                      return (
                        <div className="skills">
                          {skills.map((value, index) => {
                            if (value === '') {
                              return null;
                            }

                            return <pre key={index}>{value}</pre>;
                          })}
                        </div>
                      );
                    })()}
                  </div>
                );
              })}
            </div>
          );
        }
      })()}
    </div>
  );
}

function getValueByKeyFragment(object, string) {
  return object[
    Object.keys(object).find((element) => element.includes(string))
  ];
}

export default Page;
