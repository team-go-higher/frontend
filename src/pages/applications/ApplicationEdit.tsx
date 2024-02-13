import ApplicationLayout from 'components/application/ApplicationLayout';
interface Data {
  [key: string]: string | string[];
}

const DummyData: Data = {
  companyName: '현대글로비스',
  team: '',
  position: '디자인',
  specificPosition: '',
  processes: [],
  jobDescription: '오토벨 광고 컨텐츠 크리에이티브 컨셉 도출 및 기획 (DA/SNS/영상 콘텐츠 등)',
  requiredCapability: 'Figma 활용 숙련자',
  url: 'https://glovis.recruiter.co.kr/app/jobnotice/list',
  location: '서울 성동구',
  preferredQualification: 'IT 및 자동차 산업에 대한 이해도 보유',
  contact: 'sj.lee@glovis.net 02-6393-9552',
  workType: '재택가능',
  employmentType: '정규직',
  careerRequirement: '무관',
};

const ApplicationEdit = () => {
  // TODO api 연동 후 data 교체 필요
  return <ApplicationLayout applicationType='edit' data={DummyData} />;
};

export default ApplicationEdit;
