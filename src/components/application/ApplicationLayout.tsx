import { useForm, useFieldArray, Control, FieldValues } from 'react-hook-form';
import {
  ContentContainer,
  Wrapper,
  RowContainer,
  ApplicationContent,
} from './ApplicationLayoutStyledComponents';
import ApplicationInput from './ApplicationInput';
import ApplicationLabel from './ApplicationLabel';
import ApplicationProcess from './ApplicationProcess';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components/default/button/Button';
import { RadioInput } from 'components/default/input/RadioInput';

interface ApplicationLayoutProps {
  applicationType: 'edit' | 'default' | 'add';
  data?: any; //TODO api 연결 이후 응답 데이터 applicationType으로 수정 필요
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
  { label: '공고 URL', name: 'url', isRequired: true },
  { label: '회사 위치', name: 'location', isRequired: false },
  { label: '우대 사항', name: 'preferredQualification', isRequired: false },
  { label: '채용 담당', name: 'contact', isRequired: false },
];

const RadioContentArr = [
  {
    label: '고용 형태',
    name: 'employmentType',
    options: ['정규직', '계약직', '파견직', '인턴'],
    isRequired: true,
  },
  {
    label: '경력 조건',
    name: 'careerRequirement',
    options: ['신입', '경력', '무관'],
    isRequired: false,
  },
  {
    label: '근무 형태',
    name: 'workType',
    options: ['상주', '재택근무', '재택가능'],
    isRequired: false,
  },
];

const ApplicationLayout = ({ applicationType, data = [] }: ApplicationLayoutProps) => {
  const navigate = useNavigate();

  const methods = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: {
      companyName: data.companyName || '',
      team: data.team || '',
      position: data.position || '',
      specificPosition: data.specificPosition || '',
      processes: data.processes || [],
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

  const { control, handleSubmit } = methods;

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'processes',
  });

  // 작성완료 버튼 클릭 시 동작, data를 통해서 입력값 확인 가능
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    if (applicationType === 'edit') {
      //   TODO 수정 API 연결
      return;
    }

    // TODO 등록 API 연결
  };

  return (
    <Wrapper>
      <div className='title'>내 지원서</div>
      <ContentContainer onSubmit={handleSubmit(onSubmit)}>
        {InputContentArr.map(e => (
          <RowContainer key={e.name}>
            <ApplicationLabel label={e.label} isRequired={e.isRequired} />
            <ApplicationContent>
              {e.name === 'processes' ? (
                <ApplicationProcess
                  control={control}
                  fields={fields}
                  append={append}
                  update={update}
                  remove={remove}
                  applicationType={applicationType}
                />
              ) : (
                <ApplicationInput
                  key={e.name}
                  applicationType={applicationType}
                  label={e.label}
                  name={e.name}
                  control={control}
                  isRequired={e.isRequired}
                  value={data[e.name]}
                />
              )}
            </ApplicationContent>
          </RowContainer>
        ))}
        {RadioContentArr.map(e => (
          <RowContainer key={e.name}>
            <ApplicationLabel label={e.label} isRequired={e.isRequired} />
            {e.options.map(option => (
              <RadioInput
                key={option}
                name={e.name}
                label={option}
                control={control}
                radioValue={option}
                readOnly={applicationType === 'default'}
              />
            ))}
          </RowContainer>
        ))}

        {/* 버튼 */}
        {applicationType === 'default' ? (
          <div className='btnContainer'>
            <Button variant='secondary'>삭제하기</Button>
            <Button onClick={() => navigate('/application/edit')}>수정하기</Button>
          </div>
        ) : (
          <div className='btnContainer'>
            <Button type='submit' onClick={() => navigate('/application/detail')}>
              작성완료
            </Button>
          </div>
        )}
      </ContentContainer>
    </Wrapper>
  );
};

export default ApplicationLayout;
