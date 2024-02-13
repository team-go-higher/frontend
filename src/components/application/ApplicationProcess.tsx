import React, { useState, useEffect } from 'react';
import { Control, FieldValues, FieldArrayWithId } from 'react-hook-form';
import { DropDown } from 'components/default/dropdown/DropDown';
import { Label } from 'components/default/label/Label';
import { CalendarInput } from 'components/default/input/CalendarInput';
import styled from 'styled-components';

interface ApplicationProcessProps {
  applicationType: 'edit' | 'default' | 'add';
  control: Control<FieldValues>;
  fields: FieldArrayWithId<FieldValues>[];
  append: (
    value?: Partial<FieldValues> | Partial<FieldValues>[] | undefined,
    options?: { shouldFocus?: boolean },
  ) => void;
  update: (index: number, value: Partial<FieldValues>) => void;
  remove: (index?: number | number[] | undefined) => void;
}

type ProcessType = 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';

const ApplicationProcess = ({
  applicationType,
  control,
  fields,
  append,
  update,
  remove,
}: ApplicationProcessProps) => {
  const ProcessArr: { type: ProcessType; description: string[] | null }[] = [
    {
      type: 'DOCUMENT',
      description: null,
    },
    {
      type: 'TEST',
      description: [
        '실기테스트',
        '사전과제',
        '코딩테스트',
        '인적성검사',
        '인성검사',
        '역량검사',
        '기타(직접입력)',
      ],
    },
    { type: 'INTERVIEW', description: ['1차면접', '2차면접', '3차면접', '인성면접', '직무면접'] },
    {
      type: 'COMPLETE',
      description: [
        '최종합격',
        '서류합격',
        '테스트 합격',
        '과제 합격',
        '검사 합격',
        '1차 면접 합격',
        '2차 면접합격',
        '3차 면접 합격',
      ],
    },
  ];
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  const handleSelectCheckbox = (process: ProcessType, option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(selected => selected !== option));
      const index = selectedOptions.indexOf(option);
      remove(index);
    } else {
      setSelectedOptions([...selectedOptions, option]);
      append({ type: process, description: option, schedule: '' });
    }
  };

  return (
    <ProcessContainer>
      {applicationType === 'default' ? (
        <div>
          {ProcessArr.map((e, index) => (
            <div className='dropdown' key={index}>
              <Label process={e.type} isPast={true} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          {ProcessArr.map((event: any, index: number) => (
            <div style={{ display: 'flex', width: '100%' }} key={event.id}>
              <div className='dropdown'>
                <DropDown
                  process={event.type}
                  options={ProcessArr.find(e => e.type === event.type)?.description || []}
                  selectedOptions={selectedOptions}
                  onSelect={handleSelectCheckbox}
                />
              </div>
              {fields.map((field: any, index: number) => (
                <div className='calendarInput'>
                  {field.type === event.type && (
                    <div style={{ width: '100%' }}>
                      <CalendarInput
                        onChange={(date: Date | null) => update(field.id, { schedule: date })}
                        process={field.type}
                        detailProcess={field.description}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </ProcessContainer>
  );
};

export default ApplicationProcess;

const ProcessContainer = styled.div`
  width: 100%;
  .dropdown {
    width: 140px;
    line-height: 30px;
  }
  .calendarInput {
    width: calc(100% - 140px);
  }
`;
