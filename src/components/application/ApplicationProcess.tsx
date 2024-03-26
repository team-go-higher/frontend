import React, { useState, useEffect } from 'react';
import { Control, FieldValues, FieldArrayWithId } from 'react-hook-form';
import { DropDown } from 'components/default/dropdown/DropDown';
import { Label } from 'components/default/label/Label';
import { CalendarInput } from 'components/default/input/CalendarInput';
import styled from 'styled-components';

interface ApplicationProcessProps {
  value: any;
  applicationType: 'edit' | 'default' | 'add';
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
  value,
  applicationType,
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
    if (selectedOptions.length === 0 && applicationType === 'add') {
      setSelectedOptions(['서류전형']);
      append({ type: 'DOCUMENT', description: '서류전형', schedule: '' });
    } else if (applicationType === 'edit') {
      value.forEach((v: any) => setSelectedOptions([...selectedOptions, v.description]));
    }
  }, []);

  const handleSelectCheckbox = (process: ProcessType, option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(selected => selected !== option));
      const index = value.findIndex((v: any) => v.type === option);
      remove(index);
    } else {
      setSelectedOptions([...selectedOptions, option]);
      append({ type: process, description: option, schedule: '' });
    }
  };

  const updateFieldArray = (date: Date | null, process: ProcessType, option: string) => {
    const index = selectedOptions.indexOf(option);
    update(index, { type: process, description: option, schedule: date });
  };

  return (
    <ProcessContainer>
      {applicationType === 'default' ? (
        <div>
          {ProcessArr.map((e, index) => (
            <div style={{ display: 'flex', width: '100%' }} key={index}>
              <div className='label' key={index}>
                <Label process={e.type} isPast={true} />
              </div>
              <div className='calendarInput default'>
                {value.map((v: any, index: number) => (
                  <div key={index}>
                    {v.type === e.type && (
                      <CalendarInput
                        onChange={updateFieldArray}
                        applicationType={applicationType}
                        process={v.type}
                        detailProcess={v.description}
                        schedule={v.schedule}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {ProcessArr.map((event: any, index: number) => (
            <div style={{ display: 'flex', width: '100%' }} key={event.id}>
              <div className='label'>
                {event.type === 'DOCUMENT' ? (
                  <Label process='DOCUMENT'></Label>
                ) : (
                  <DropDown
                    process={event.type}
                    options={ProcessArr.find(e => e.type === event.type)?.description || []}
                    selectedOptions={selectedOptions}
                    onSelect={handleSelectCheckbox}
                  />
                )}
              </div>
              <div className='calendarInput'>
                {fields.map((field: any, index: number) => (
                  <div>
                    {field.type === event.type && (
                      <CalendarInput
                        onChange={updateFieldArray}
                        applicationType={applicationType}
                        process={field.type}
                        detailProcess={field.description}
                        schedule={field.schedule}
                      />
                    )}
                  </div>
                ))}
              </div>
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
  .label {
    width: 140px !important;
    line-height: 40px;
  }
  .calendarInput {
    width: calc(100% - 140px);
    line-height: 40px;
  }
`;
