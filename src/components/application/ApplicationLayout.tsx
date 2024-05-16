import { useForm, useFieldArray, FieldValues } from 'react-hook-form';
import * as S from './ApplicationLayoutStyledComponents';
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
    <S.Wrapper>
      <div className='title'>내 지원서</div>
      <S.ContentContainer onSubmit={handleSubmit(onSubmit)}>
        <S.RowContainer>
          <ApplicationLabel label='회사명' isRequired={true} />
          <ApplicationInput
            applicationType={applicationType}
            label='회사명'
            name='companyName'
            control={control}
            isRequired={true}
            value={data.companyName}
          />
        </S.RowContainer>
        <S.RowContainer>
          <ApplicationLabel label='부서' />
          <ApplicationInput
            applicationType={applicationType}
            label='부서'
            name='team'
            control={control}
            value={data.team}
          />
        </S.RowContainer>
        <S.RowContainer>
          <ApplicationLabel label='직군' isRequired={true} />
          <ApplicationInput
            applicationType={applicationType}
            label='직군'
            name='position'
            control={control}
            isRequired={true}
            value={data.position}
          />
        </S.RowContainer>
        <S.RowContainer>
          <ApplicationLabel label='세부직무' />
          <ApplicationInput
            applicationType={applicationType}
            label='세부직무'
            name='specificPosition'
            control={control}
            value={data.specificPosition}
          />
        </S.RowContainer>
        <S.RowContainer>
          <ApplicationLabel label='전형 단계' />
          <ApplicationProcess
            fields={fields}
            append={append}
            update={update}
            remove={remove}
            applicationType={applicationType}
          />
        </S.RowContainer>
        <S.RowContainer>
          <ApplicationLabel label='주요 업무' isRequired={true} />
          <ApplicationInput
            applicationType={applicationType}
            label='주요 업무'
            name='jobDescription'
            inputType='textarea'
            control={control}
            isRequired={true}
            value={data.jobDescription}
          />
        </S.RowContainer>
        <S.RowContainer>
          <ApplicationLabel label='필수 역량' />
          <ApplicationInput
            applicationType={applicationType}
            label='필수 역량'
            inputType='textarea'
            name='requiredCapability'
            control={control}
            value={data.requiredCapability}
          />
        </S.RowContainer>
        <S.RowContainer>
          <ApplicationLabel label='공고 URL' isRequired={true} />
          <ApplicationInput
            applicationType={applicationType}
            label='공고 URL'
            name='url'
            control={control}
            isRequired={true}
            value={data.url}
          />
        </S.RowContainer>
        <S.RowContainer>
          <ApplicationLabel label='회사 위치' />
          <ApplicationInput
            applicationType={applicationType}
            label='회사 위치'
            name='location'
            control={control}
            value={data.location}
          />
        </S.RowContainer>
        <S.RowContainer>
          <ApplicationLabel label='우대 사항' />
          <ApplicationInput
            applicationType={applicationType}
            label='우대 사항'
            inputType='textarea'
            name='preferredQualification'
            control={control}
            value={data.preferredQualification}
          />
        </S.RowContainer>
        <S.RowContainer>
          <ApplicationLabel label='채용 담당' />
          <ApplicationInput
            applicationType={applicationType}
            label='채용 담당'
            name='contact'
            control={control}
            value={data.contact}
          />
        </S.RowContainer>
        <S.RowContainer>
          <ApplicationLabel label='고용 형태' isRequired={true} />
          <S.RadioInputWrapper>
            {['정규직', '계약직', '파견직', '인턴'].map(option => (
              <RadioInput
                key={option}
                name='employmentType'
                label={option}
                control={control}
                radioValue={option}
                readOnly={applicationType === 'default'}
              />
            ))}
          </S.RadioInputWrapper>
        </S.RowContainer>
        <S.RowContainer>
          <ApplicationLabel label='경력 조건' />
          <S.RadioInputWrapper>
            {['신입', '경력', '무관'].map(option => (
              <RadioInput
                key={option}
                name='careerRequirement'
                label={option}
                control={control}
                radioValue={option}
                readOnly={applicationType === 'default'}
              />
            ))}
          </S.RadioInputWrapper>
        </S.RowContainer>
        <S.RowContainer>
          <ApplicationLabel label='근무 형태' />
          <S.RadioInputWrapper>
            {['상주', '재택근무', '재택가능'].map(option => (
              <RadioInput
                key={option}
                name='workType'
                label={option}
                control={control}
                radioValue={option}
                readOnly={applicationType === 'default'}
              />
            ))}
          </S.RadioInputWrapper>
        </S.RowContainer>

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
      </S.ContentContainer>
    </S.Wrapper>
  );
};

export default ApplicationLayout;
