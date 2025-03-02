import { useForm, useFieldArray, FieldValues } from 'react-hook-form';
import { useEffect } from 'react';
import * as S from './ApplicationLayoutStyledComponents';
import ApplicationInput from './ApplicationInput';
import ApplicationLabel from './ApplicationLabel';
import ApplicationProcess from './ApplicationProcess';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components/default/button/Button';
import { RadioInput } from 'components/default/input/RadioInput';
import useMutateApplication from 'hooks/application/useMutateApplication';
import { IApplicationSpecific } from 'types/interfaces/Application';
import ApplicationDropdown from './ApplicationDropdown';

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
  const { desiredPositions } = JSON.parse(localStorage.getItem('userPositionInfo') || '{}');
  const { registerApplicationMutation, editApplicationMutation } = useMutateApplication();

  const methods = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: {
      companyName: '',
      team: '',
      location: '',
      contact: '',
      position: '',
      specificPosition: '',
      jobDescription: '',
      workType: '',
      employmentType: '',
      careerRequirement: '',
      requiredCapability: '',
      preferredQualification: '',
      processes: [],
      url: '',
    },
  });

  const { control, handleSubmit, reset } = methods;
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'processes',
  });

  useEffect(() => {
    if (applicationType !== 'add' && data) {
      reset({
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
      });
    }
  }, [applicationType, data, reset]);

  const onSubmit = (data: FieldValues) => {
    // id 제거, 시간 포맷 `년-월-일T시:분`으로
    const newApplicationData = {
      ...data,
      processes: data.processes.map(({ id, schedule, ...rest }: any) => ({
        ...rest,
        schedule: schedule ? new Date(schedule).toISOString().slice(0, 16) : '',
      })),
    };

    // 등록했을 때
    if (applicationType === 'add') {
      registerApplicationMutation.mutate(newApplicationData, {
        onSuccess: headers => {
          const applicationId = headers.location.split('/').pop();
          navigate(`/application/detail/${applicationId}`);
        },
      });
    }

    // 수정했을 때
    if (applicationType === 'edit' && applicationId !== undefined) {
      editApplicationMutation.mutate(
        {
          applicationId,
          newApplicationData,
        },
        {
          onSuccess: () => navigate(`/application/detail/${applicationId}`),
        },
      );
    }
  };

  return (
    <S.Wrapper>
      <S.ApplicationTitle>내 지원서</S.ApplicationTitle>
      <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
        <S.RowContainer>
          <ApplicationLabel label='회사명' isRequired={true} />
          <ApplicationInput
            applicationType={applicationType}
            label='회사명'
            name='companyName'
            control={control}
            isRequired={true}
            value={data?.companyName || ''}
          />
        </S.RowContainer>

        <S.RowContainer>
          <ApplicationLabel label='부서' />
          <ApplicationInput
            applicationType={applicationType}
            label='부서'
            name='team'
            control={control}
            value={data?.team || ''}
          />
        </S.RowContainer>

        <S.RowContainer>
          <ApplicationLabel label='직군' isRequired={true} />
          <ApplicationDropdown
            applicationType={applicationType}
            dropdownItems={desiredPositions}
            control={control}
            name='position'
            value={data?.position || ''}
          />
        </S.RowContainer>

        <S.RowContainer>
          <ApplicationLabel label='세부직무' />
          <ApplicationInput
            applicationType={applicationType}
            label='세부직무'
            name='specificPosition'
            control={control}
            value={data?.specificPosition || ''}
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
            value={data?.jobDescription || ''}
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
            value={data?.requiredCapability || ''}
          />
        </S.RowContainer>

        <S.RowContainer>
          <ApplicationLabel label='공고 URL' />
          <ApplicationInput
            applicationType={applicationType}
            label='공고 URL'
            name='url'
            control={control}
            value={data?.url || ''}
          />
        </S.RowContainer>

        <S.RowContainer>
          <ApplicationLabel label='고용 형태' />
          <S.RadioInputWrapper>
            {[
              { label: '정규직', value: 'PERMANENT' },
              { label: '계약직', value: 'TEMPORARY' },
              { label: '인턴', value: 'INTERN' },
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
        <S.ButtonContainer>
          {applicationType === 'default' ? (
            <>
              <Button
                variant='secondary'
                type='button'
                onClick={() => navigate(`/application/edit/${applicationId}`)}>
                수정하기
              </Button>
              <Button type='button' onClick={() => navigate('/applicationStatus')}>
                지원 현황 모아보기
              </Button>
            </>
          ) : (
            <>
              <Button type='submit'>작성완료</Button>
            </>
          )}
        </S.ButtonContainer>
      </S.FormContainer>
    </S.Wrapper>
  );
};

export default ApplicationLayout;
