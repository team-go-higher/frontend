import { FieldValues, UseControllerProps } from 'react-hook-form';
import { Input } from 'components/default/input/Input';
import { Textarea } from 'components/default/input/Textarea';
import * as S from './ApplicationLayoutStyledComponents';

interface ApplicationInputProps extends UseControllerProps<FieldValues> {
  applicationType: 'edit' | 'default' | 'add';
  label: string;
  inputType?: 'input' | 'textarea';
  isRequired?: boolean;
  value?: string;
}

interface DefaultContentViewProps {
  name: string;
  value?: string;
}

const DefaultContentView = ({ name, value = '' }: DefaultContentViewProps) => {
  if (value === '') {
    return <S.ContentBox>-</S.ContentBox>;
  }

  return (
    <>
      {name === 'url' ? (
        <S.ContentBox>
          <a href={value}>채용사이트</a>
        </S.ContentBox>
      ) : (
        <S.ContentBox>{value}</S.ContentBox>
      )}
    </>
  );
};

const ApplicationInput = ({
  applicationType,
  label,
  inputType = 'input',
  name,
  control,
  isRequired = false,
  value = '',
}: ApplicationInputProps) => {
  return applicationType === 'default' ? (
    <DefaultContentView name={name} value={value}></DefaultContentView>
  ) : (
    <>
      {inputType === 'input' ? (
        <Input name={name} label={label} error={false} isRequired={isRequired} control={control} />
      ) : (
        <Textarea
          name={name}
          label={label}
          error={false}
          isRequired={isRequired}
          control={control}
        />
      )}
    </>
  );
};

export default ApplicationInput;
