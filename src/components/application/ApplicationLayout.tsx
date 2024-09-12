import { useForm, useFieldArray, FieldValues } from 'react-hook-form';
import * as S from './ApplicationLayoutStyledComponents';
import ApplicationInput from './ApplicationInput';
import ApplicationLabel from './ApplicationLabel';
import ApplicationProcess from './ApplicationProcess';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components/default/button/Button';
import { RadioInput } from 'components/default/input/RadioInput';
import useMutateApplication from 'hooks/application/useMutateApplication';
import { IApplicationSpecific } from 'types/interfaces/Application';

interface ApplicationLayoutProps {
  applicationType: 'edit' | 'default' | 'add';
  applicationId?: number;
  data?: IApplicationSpecific;
}

const ApplicationLayout = ({
  applicationType,
  applicationId,
  data = {},
}: ApplicationLayoutProps) => {
  const navigate = useNavigate();
  const { registerApplicationMutation, deleteApplicationMutation, editApplicationMutation } =
    useMutateApplication();

  const methods = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: {
      companyName: data.companyName || '',
      team: data.team || '',
      location: data.location || '',
      contact: data.contact || '',
      position: data.position || '',
      specificPosition: data.specificPosition || '',
      jobDescription: data.jobDescription || '',
      workType: data.workType || '',
      employmentType: data.employmentType || '',
      careerRequirement: data.careerRequirement || '',
      requiredCapability: data.requiredCapability || '',
      preferredQualification: data.preferredQualification || '',
      processes: data.processes || [],
      url: data.url || '',
    },
  });

  const { control, handleSubmit } = methods;

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'processes',
  });

  const onSubmit = (data: FieldValues) => {
    if (applicationType === 'add') {
      registerApplicationMutation.mutate(data);
    }
    if (applicationType === 'edit' && applicationId !== undefined) {
      editApplicationMutation.mutate({
        applicationId,
        newApplicationData: data,
      });
    }
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
          <ApplicationLabel label='주요 업무' />
          <ApplicationInput
            applicationType={applicationType}
            label='주요 업무'
            name='jobDescription'
            inputType='textarea'
            control={control}
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
          <ApplicationLabel label='공고 URL' />
          <ApplicationInput
            applicationType={applicationType}
            label='공고 URL'
            name='url'
            control={control}
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
          <ApplicationLabel label='고용 형태' />
          <S.RadioInputWrapper>
            {[
              { label: '정규직', value: 'PERMANENT' },
              { label: '계약직', value: 'PERMANENT' },
              { label: '인턴', value: 'PERMANENT' },
            ].map(option => (
              <RadioInput
                key={option.label}
                name='employmentType'
                label={option.label}
                control={control}
                radioValue={option.value}
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
              <Button
                variant='secondary'
                type='button'
                onClick={() => {
                  if (applicationId !== undefined) {
                    deleteApplicationMutation.mutate(applicationId);
                  }
                }}>
                삭제하기
              </Button>
              <Button type='button' onClick={() => navigate(`/application/edit/${applicationId}`)}>
                수정하기
              </Button>
            </>
          ) : (
            <>
              <Button>작성완료</Button>
            </>
          )}
        </div>
      </S.ContentContainer>
    </S.Wrapper>
  );
};

export default ApplicationLayout;
