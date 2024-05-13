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
import { InputContentArr, RadioContentArr } from 'constants/application';

interface ApplicationLayoutProps {
  applicationType: 'edit' | 'default' | 'add';
  data?: any; //TODO api 연결 이후 응답 데이터 applicationType으로 수정 필요
}

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
        {/* input 입력 부분 */}
        {InputContentArr.map(e => (
          <RowContainer key={e.name}>
            <ApplicationLabel label={e.label} isRequired={e.isRequired} />
            <ApplicationContent>
              {e.name === 'processes' ? (
                <ApplicationProcess
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

        {/* 라디오 인풋 입력 부분 */}
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
        <div className='btnContainer'>
          {applicationType === 'default' ? (
            <>
              <Button variant='secondary'>삭제하기</Button>
              <Button onClick={() => navigate('/application/edit')}>수정하기</Button>
            </>
          ) : (
            <>
              <Button type='submit' onClick={() => navigate('/application/detail')}>
                작성완료
              </Button>
            </>
          )}
        </div>
      </ContentContainer>
    </Wrapper>
  );
};

export default ApplicationLayout;
