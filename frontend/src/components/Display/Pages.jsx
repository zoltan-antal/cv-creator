import './Pages.css';
import emailIcon from '../../assets/icons/email.svg';
import phoneIcon from '../../assets/icons/phone.svg';
import addressIcon from '../../assets/icons/map-marker.svg';
import linkIcon from '../../assets/icons/link.svg';
import { format, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';

const Pages = () => {
  const cvData = useSelector(
    (state) =>
      state.cvData.cvLists.tempCVData[state.cvData.selectedCVIndex].content
  );

  const personalInfo = (
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
  );
  const personalData = (
    <div className="personal-data">
      {Object.entries(cvData.personalDetails).map(([key, value]) => {
        if (key.includes('email') && value) {
          return (
            <div className="entry email" key={key}>
              <img src={emailIcon} alt="" />
              <pre>{value}</pre>
            </div>
          );
        } else if (key.includes('phone') && value) {
          return (
            <div className="entry phone" key={key}>
              <img src={phoneIcon} alt="" />
              <pre>{value}</pre>
            </div>
          );
        } else if (key.includes('address') && value) {
          return (
            <div className="entry address" key={key}>
              <img src={addressIcon} alt="" />
              <pre>{value}</pre>
            </div>
          );
        } else if (key.includes('links')) {
          return value.map((value, index) => {
            if (value) {
              return (
                <div className="entry link" key={index}>
                  <img src={linkIcon} alt="" />
                  <pre>{value}</pre>
                </div>
              );
            }
          });
        }
      })}
    </div>
  );
  const education = (
    <>
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
                          if (item.startDate) {
                            return (
                              <p className="date">
                                {format(parseISO(item.startDate), 'MMM yyyy')} -
                                present
                              </p>
                            );
                          }
                        } else {
                          if (item.startDate && item.endDate) {
                            return (
                              <p className="date">
                                {format(parseISO(item.startDate), 'MMM yyyy')} -{' '}
                                {format(parseISO(item.endDate), 'MMM yyyy')}
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
    </>
  );
  const skills = (
    <>
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
    </>
  );
  const workExperience = (
    <>
      {(() => {
        if (cvData.workExperience.length > 0) {
          return (
            <div className="work-experience">
              <h3>Work experience</h3>
              {cvData.workExperience.map((item) => {
                return (
                  <div className="job" key={item.id}>
                    <div className="main-info">
                      {(() => {
                        if (item.title) {
                          return <h4 className="title">{item.title}</h4>;
                        }
                      })()}
                      {(() => {
                        if (item.company) {
                          return <h5 className="company">{item.company}</h5>;
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
                          if (item.startDate) {
                            return (
                              <p className="date">
                                {format(parseISO(item.startDate), 'MMM yyyy')} -
                                present
                              </p>
                            );
                          }
                        } else {
                          if (item.startDate && item.endDate) {
                            return (
                              <p className="date">
                                {format(parseISO(item.startDate), 'MMM yyyy')} -{' '}
                                {format(parseISO(item.endDate), 'MMM yyyy')}
                              </p>
                            );
                          }
                        }
                      })()}
                    </div>
                    {(() => {
                      const responsibilities = getValueByKeyFragment(
                        item,
                        'responsibilities'
                      );
                      if (responsibilities.length === 0) {
                        return null;
                      }
                      if (responsibilities.every((content) => content === '')) {
                        return null;
                      }

                      return (
                        <div className="additional-info">
                          {responsibilities.map((value, index) => {
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
    </>
  );

  const pages = [];
  let pageNumber = 0;
  pages[pageNumber] = [];
  pages[pageNumber].push(personalInfo);
  pages[pageNumber].push(personalData);
  pages[pageNumber].push(education);
  pages[pageNumber].push(workExperience);
  pages[pageNumber].push(skills);

  return (
    <div className="pages">
      {pages.map((page, index) => (
        <div key={index} className="page">
          {page}
        </div>
      ))}
    </div>
  );
};

function getValueByKeyFragment(object, string) {
  return object[
    Object.keys(object).find((element) => element.includes(string))
  ];
}

export default Pages;
