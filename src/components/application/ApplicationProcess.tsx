import React, { useState, useEffect } from 'react';
import { FieldValues, FieldArrayWithId } from 'react-hook-form';
import { DropDown } from 'components/default/dropdown/DropDown';
import { CalendarInput } from 'components/default/input/CalendarInput';
import styled from 'styled-components';
import { ProcessArr } from 'constants/application';
import LogoIcon from 'assets/default/icon_logo.svg';
import LogoGreyIcon from 'assets/default/icon_grey_logo.svg';
import { TYPE_PROCESS } from 'styles/processColor';
import { Label } from 'components/default/label/Label';
import { ProcessType } from 'types/interfaces/Common';

interface ApplicationProcessProps {
  applicationType: 'edit' | 'default' | 'add';
  fields: FieldArrayWithId<FieldValues>[];
  append: (
    value?: Partial<FieldValues> | Partial<FieldValues>[],
    options?: { shouldFocus?: boolean },
  ) => void;
  update: (index: number, value: Partial<FieldValues>) => void;
  remove: (index?: number | number[] | undefined) => void;
}

const ApplicationProcess = ({
  applicationType,
  fields,
  append,
  update,
  remove,
}: ApplicationProcessProps) => {
  const [selectedOptions, setSelectedOptions] = useState<
    { process: ProcessType; option: string }[]
  >([]);

  // 지원서 상세 페이지: 서류전형 / 수정 페이지: 유저 데이터 로 초기화
  useEffect(() => {
    if (selectedOptions.length === 0 && applicationType === 'add') {
      setSelectedOptions([{ process: 'DOCUMENT', option: '서류전형' }]);
      append({ type: 'DOCUMENT', description: '서류전형', schedule: '', isCurrent: true });
    } else if (applicationType === 'edit') {
      fields.forEach((v: any) =>
        setSelectedOptions(prevOptions => [
          ...prevOptions,
          { process: v.type, option: v.description },
        ]),
      );
    }
  }, []);

  // 드롭다운 상세 전형 클릭 함수
  const handleSelectCheckbox = (process: ProcessType, option: string) => {
    const itemIndex = selectedOptions.findIndex(
      item => item.process === process && item.option === option,
    );

    // 최종 발표는 하나만 선택가능
    if (process === 'COMPLETE') {
      setSelectedOptions(prevOptions => [...prevOptions, { process, option }]);
      const fieldIndex = fields.findIndex((v: any) => v.type === process);
      if (fieldIndex !== -1) {
        update(fieldIndex, { type: process, description: option, schedule: '', isCurrent: false });
      } else {
        append({ type: process, description: option, schedule: '', isCurrent: false });
      }
      return;
    }

    // 그 외는 여러개 선택 가능
    if (itemIndex !== -1) {
      setSelectedOptions(prevOptions =>
        prevOptions.filter(item => !(item.process === process && item.option === option)),
      );
      const index = fields.findIndex((v: any) => v.type === process && v.description === option);
      if (index !== -1) {
        remove(index);
      }
    } else {
      setSelectedOptions(prevOptions => [...prevOptions, { process, option }]);
      append({ type: process, description: option, schedule: '', isCurrent: false });
    }
  };

  // schedule 변경 함수
  const handleUpdateSchedule = (process: ProcessType, option: string, date: Date | null) => {
    const index = fields.findIndex((v: any) => v.type === process && v.description === option);
    if (index !== -1) {
      update(index, { type: process, description: option, schedule: date, isCurrent: false });
    }
  };

  // isCurrent 변경 함수
  const handleLogoClick = (process: ProcessType, option: string) => {
    if (applicationType === 'default') return;

    const index = fields.findIndex((v: any) => v.type === process && v.description === option);
    fields.forEach((field: any, idx: number) => {
      if (idx === index) {
        update(idx, { ...field, isCurrent: true });
      } else {
        update(idx, { ...field, isCurrent: false });
      }
    });
  };

  // 각 type별로 이 상세 전형이 비어있는지 확인하는 함수
  const isTypeScheduleEmpty = (process: ProcessType) => {
    return fields.filter((v: any) => v.type === process).length === 0;
  };

  return (
    <ProcessContainer>
      {ProcessArr.map((event: any) => (
        <ProcessRowContainer>
          <LabelContainer>
            {applicationType === 'default' ? (
              <Label process={event.type} isEmpty={isTypeScheduleEmpty(event.type)} />
            ) : (
              <DropDown
                process={event.type}
                options={ProcessArr.find(e => e.type === event.type)?.description || []}
                selectedOptions={selectedOptions}
                onSelect={handleSelectCheckbox}
                disabled={event.type === 'DOCUMENT'}
              />
            )}
          </LabelContainer>

          <CalendarInputContainer>
            {fields.map((field: any) => (
              <FieldContainer
                isCurrent={field.isCurrent}
                process={event.type}
                key={field.description}>
                {field.type === event.type && (
                  <CalendarInputWrapper>
                    <CalendarInput
                      key={field.description}
                      onChange={handleUpdateSchedule}
                      applicationType={applicationType}
                      process={field.type}
                      detailProcess={field.description}
                      schedule={field.schedule}
                    />
                    <IsCurrentImage
                      src={field.isCurrent ? LogoIcon : LogoGreyIcon}
                      alt='logoIcon'
                      onClick={() => handleLogoClick(field.type, field.description)}
                    />
                  </CalendarInputWrapper>
                )}
              </FieldContainer>
            ))}
          </CalendarInputContainer>
        </ProcessRowContainer>
      ))}
    </ProcessContainer>
  );
};

export default ApplicationProcess;

const getRgbaColor = (rgbaValue: string, alpha: number) => {
  const rgbaParts = rgbaValue.split(',');
  rgbaParts[rgbaParts.length - 1] = ` ${alpha})`;
  return rgbaParts.join(',');
};

const ProcessContainer = styled.div`
  width: 100%;
`;

const ProcessRowContainer = styled.div`
  display: flex;
  width: 100%;
`;

const LabelContainer = styled.div`
  display: flex;
  width: 140px;
  height: 40px;
  align-items: center;
`;

const CalendarInputContainer = styled.div`
  width: calc(100% - 140px);
`;

const FieldContainer = styled.div<{ isCurrent: boolean; process: ProcessType }>`
  line-height: 40px;
  padding: 0 10px;
  background-color: ${({ isCurrent, process }) =>
    isCurrent && process ? getRgbaColor(TYPE_PROCESS[process], 0.15) : 'transparent'};
  border-radius: ${({ isCurrent }) => (isCurrent ? '5px' : '0')};
`;

const CalendarInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IsCurrentImage = styled.img`
  width: 22px;
  cursor: pointer;
`;
