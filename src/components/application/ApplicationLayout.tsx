import { FieldValues, useForm } from 'react-hook-form';
import { ContentContainer, Wrapper } from './ApplicationLayoutStyledComponents';
import ApplicationRow from './ApplicationRow';
import ApplicationRowEdit from './ApplicationRowEdit';
import { useNavigate } from 'react-router-dom';

interface ApplicationLayoutProps {
  type: 'edit' | 'default' | 'add';
  data?: any; //TODO api 연결 이후 응답 데이터 type으로 수정 필요
}

// TODO 필수인지 여부 이후 api 연동 시 수정 필요
const InputContentArr = [
  { label: '회사명', name: 'companyName', isRequired: true },
  { label: '부서', name: 'team', isRequired: false },
  { label: '직군', name: 'position', isRequired: true },
  { label: '세부직무', name: 'specificPosition', isRequired: false },
  { label: '전형 단계', name: 'processes', isRequired: false },
  { label: '주요 업무', name: 'jobDescription', isRequired: true },
  { label: '필수 역량', name: 'requiredCapability', isRequired: false },
  { label: '경력 조건', name: 'requiredCapability', isRequired: false },
  { label: '공고 URL', name: 'url', isRequired: true },
  { label: '회사 위치', name: 'location', isRequired: false },
  { label: '우대 사항', name: 'preferredQualification', isRequired: false },
  { label: '채용 담당', name: 'contact', isRequired: false },
];

const RadioContentArr = [
  { label: '고용 형태', name: 'employmentType' },
  { label: '경력 조건', name: 'careerRequirement' },
  { label: '근무 형태', name: 'workType' },
];

const ApplicationLayout = ({ type, data = [] }: ApplicationLayoutProps) => {
  const navigate = useNavigate();

  const methods = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: {
      companyName: data.companyName || '',
      team: data.team || '',
      position: data.position || '',
      specificPosition: data.specificPosition || '',
      processes: data.processes || '',
      jobDescription: data.jobDescription || '',
      requiredCapability: data.requiredCapability || '',
      url: data.url || '',
      location: data.location || '',
      preferredQualification: data.preferredQualification || '',
      contact: data.contact || '',
      workType: data.workType || '',
      employmentType: data.employmentType || '',
      careerRequirement: data.careerRequirement || '',
    },
  });

  const { handleSubmit, control } = methods;

  // 작성완료 버튼 클릭 시 동작, data를 통해서 입력값 확인 가능
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    if (type === 'edit') {
      //   TODO 수정 API 연결
      return;
    }

    // TODO 등록 API 연결
  };

  return (
    <Wrapper>
      <div className='title'>내 지원서</div>
      <ContentContainer onSubmit={handleSubmit(onSubmit)}>
        {InputContentArr.map((e, index) =>
          type !== 'default' ? (
            <ApplicationRowEdit
              key={index}
              label={e.label}
              name={e.name}
              control={control}
              isRequired={e.isRequired}
            />
          ) : (
            <ApplicationRow key={index} label={e.label} name={e.name} value={data[e.name]} />
          ),
        )}

        {/* TODO Radio Component 교체 필요 */}
        {RadioContentArr.map((e, index) => {
          return <ApplicationRow key={index} label={e.label} name={e.name} value={data[e.name]} />;
        })}

        {/* TODO button component 교체 필요 */}
        {type === 'default' ? (
          <div className='btnContainer'>
            <button type='button'>삭제하기</button>
            <button type='button' onClick={() => navigate('/application/edit')}>
              수정하기
            </button>
          </div>
        ) : (
          <div className={`btnContainer`}>
            <button type='submit'>작성완료</button>
          </div>
        )}
      </ContentContainer>
    </Wrapper>
  );
};

export default ApplicationLayout;
