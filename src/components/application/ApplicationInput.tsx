import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Input } from 'components/default/input/Input';

interface ApplicationInputProps {
  applicationType: 'edit' | 'default' | 'add';
  label: string;
  control: Control<FieldValues>;
  name: FieldPath<FieldValues>;
  isRequired: boolean;
  value?: string;
}

const ApplicationInput = ({
  applicationType,
  label,
  name,
  control,
  isRequired,
  value,
}: ApplicationInputProps) => {
  return applicationType === 'default' ? (
    <div>
      {name === 'url' ? (
        <a className='content url' href={value}>
          채용사이트
        </a>
      ) : (
        <div className='content'>{value === '' ? '-' : value}</div>
      )}
    </div>
  ) : (
    <Input name={name} label={label} error={false} isRequired={isRequired} control={control} />
  );
};

export default ApplicationInput;
