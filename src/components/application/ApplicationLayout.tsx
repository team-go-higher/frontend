import { ContentContainer, Wrapper } from './ApplicationLayoutStyledComponents';
import ApplicationRow from './ApplicationRow';
import ApplicationRowEdit from './ApplicationRowEdit';
import { useNavigate } from 'react-router-dom';

interface ApplicationLayoutProps {
  type: 'edit' | 'default';
}

interface Data {
  [key: string]: string;
}

const DummyData: Data = {
  companyName: '현대글로비스',
  team: '',
  position: '디자인',
  specificPosition: '',
  processes: '',
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

const InputContentArr = [
  { label: '회사명', name: 'companyName' },
  { label: '부서', name: 'team' },
  { label: '직군', name: 'position' },
  { label: '세부직무', name: 'specificPosition' },
  { label: '전형 단계', name: 'processes' },
  { label: '주요 업무', name: 'jobDescription' },
  { label: '필수 역량', name: 'requiredCapability' },
  { label: '경력 조건', name: 'requiredCapability' },
  { label: '공고 URL', name: 'url' },
  { label: '회사 위치', name: 'location' },
  { label: '우대 사항', name: 'preferredQualification' },
  { label: '채용 담당', name: 'contact' },
];

const RadioContentArr = [
  { label: '고용 형태', name: 'employmentType' },
  { label: '경력 조건', name: 'careerRequirement' },
  { label: '근무 형태', name: 'workType' },
];

const ApplicationLayout = ({ type }: ApplicationLayoutProps) => {
  const navigate = useNavigate();

  const handleSubmit = (e: any, type: 'default' | 'edit') => {
    e.preventDefault();

    if (type === 'edit') {
      navigate('/applicatioEdit');
      return;
    }

    //   TODO 수정 API 연결
    // TODO 우선 상세페이지로 이동, 이후 수정 필요
    navigate('/applicationDetail');
  };

  return (
    <Wrapper>
      <div className='title'>내 지원서</div>
      <ContentContainer>
        {InputContentArr.map((e, index) =>
          type === 'edit' ? (
            <ApplicationRowEdit
              key={index}
              label={e.label}
              name={e.name}
              value={DummyData[e.name]}
            />
          ) : (
            <ApplicationRow key={index} label={e.label} name={e.name} value={DummyData[e.name]} />
          ),
        )}

        {/* TODO Radio Component 교체 필요 */}
        {RadioContentArr.map((e, index) => {
          return (
            <ApplicationRow key={index} label={e.label} name={e.name} value={DummyData[e.name]} />
          );
        })}

        {/* TODO button component 교체 필요 */}
        {type === 'default' ? (
          <div className='btnContainer'>
            <button>삭제하기</button>
            <button onClick={e => handleSubmit(e, 'edit')} type='submit'>
              수정하기
            </button>
          </div>
        ) : (
          <div className={`btnContainer`}>
            <button onClick={e => handleSubmit(e, 'default')} type='button'>
              작성완료
            </button>
          </div>
        )}
      </ContentContainer>
    </Wrapper>
  );
};

export default ApplicationLayout;
