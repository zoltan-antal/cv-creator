const exampleCV = {
  name: 'Example CV',
  id: '',
  content: {
    personalDetails: {
      fullName: 'John Doe',
      professionalTitle: 'Software Developer',
      email: 'john.doe@outlook.com',
      phone: '+44 1632 960525',
      address: "3 Blundell's Rd, Yeovil, Devon, EX16 4DB",
      links: ['linkedin.com/in/john-doe', 'john-doe.io'],
      professionalSummary_long:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    education: [
      {
        id: '6a56896b-c1ac-4d3e-acde-b17f5773e2f8',
        school: 'University of Devon',
        location: 'Exeter',
        qualification: 'BSc in Computer Science',
        grade: '1st class',
        ongoing: true,
        startDate: '2019-09',
        endDate: '',
        additionalInfo_long: ['Committee member in drama society for 2 years.'],
      },
      {
        id: '5dd0a0c6-a5ce-468d-97e7-e25bf2087a6e',
        school: 'Holy Oaks College',
        location: 'Yeovil',
        qualification: 'A levels: Maths & Physics',
        grade: 'A*',
        ongoing: false,
        startDate: '2017-09',
        endDate: '2019-07',
        additionalInfo_long: [
          'Football captain for 1 year',
          'Won local maths competition',
        ],
      },
    ],
    workExperience: [
      {
        id: 'c0b59a4e-74e0-4817-a9bf-03cfea624b7d',
        title: 'Software Developer intern',
        company: 'MySpace',
        location: 'Bristol',
        ongoing: false,
        startDate: '2021-09',
        endDate: '2022-09',
        responsibilities_long: [
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
          'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
          'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        ],
      },
    ],
    skills: [
      {
        id: 'f1a75677-bc5d-41b3-8f00-d3355e3f649b',
        title: 'Programming',
        skills: ['C#', 'C++', 'SQL', 'Git'],
      },
      {
        id: 'f60977c8-a041-4f70-b2cc-d58c1f744878',
        title: 'Languages',
        skills: ['Spanish', 'French'],
      },
    ],
  },
};

export default exampleCV;
