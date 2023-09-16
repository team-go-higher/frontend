import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';

import { processStage, processStageKeys } from 'data/RecruitProcess';
import * as S from './ModalStyledComponents';
import { useAppDispatch } from 'redux/store';
import { addResume } from 'redux/kanbanSlice';
import SelectArrowIcon from 'assets/main/main_modal_select_arrow.svg';

interface IProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  currentModalProcess: string;
}

const ModalComponent = ({ modalIsOpen, closeModal, currentModalProcess }: IProps) => {
  const dispatch = useAppDispatch();
  const [processStageToggle, setProcessStageToggle] = useState(false);
  const [detailedprocessStageToggle, setdetailedProcessStageToggle] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    setError,
    clearErrors,
    formState: { errors, defaultValues },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      companyName: '',
      processStage: '전형단계를 선택하세요',
      detailedProcessStage: '세부단계를 선택하세요',
      role: '',
      scheduled: '',
      recruitUrl: '',
    },
  });

  // 모달close시 안의 내용 reset
  useEffect(() => {
    reset({
      companyName: '',
      processStage: '전형단계를 선택하세요',
      detailedProcessStage: '세부단계를 선택하세요',
      role: '',
      scheduled: '',
    });

    setProcessStageToggle(false);
    setdetailedProcessStageToggle(false);
  }, [closeModal]);

  // 전형 or 세부단계 드롭박스 토글 함수
  function ToggleHandler(dropDownId: string) {
    if (dropDownId === 'processStage') {
      setProcessStageToggle(!processStageToggle);
    } else {
      setdetailedProcessStageToggle(!detailedprocessStageToggle);
    }
  }

  // 전형 or 세부 단계 선택시 실행 함수
  function dropDownItemHandler(dropDownId: string, process: string) {
    if (dropDownId === 'processStage') {
      setValue('processStage', process);
      setValue('detailedProcessStage', defaultValues?.detailedProcessStage as string);
      setProcessStageToggle(!processStageToggle);
    } else {
      setValue('detailedProcessStage', process);
      setdetailedProcessStageToggle(!detailedprocessStageToggle);
    }
  }

  // 간편등록 handler
  function addSimpleHandler() {
    const newResumeData = {
      id: 10,
      companyName: getValues('companyName'),
      duty: getValues('role'),
      detailedDuty: getValues('role'),
      processDescription:
        getValues('detailedProcessStage') === defaultValues?.detailedProcessStage
          ? getValues('processStage')
          : getValues('detailedProcessStage'),
      schedule: getValues('scheduled'),
      recruitUrl: getValues('recruitUrl'),
    };
    dispatch(addResume({ processName: currentModalProcess, newResumeData }));
    closeModal();
  }

  // 전형 or 세부단계 유효성 검사 함수
  function validationProcess() {
    if (getValues('processStage') === '전형단계를 선택하세요') {
      setError('processStage', { type: 'required', message: '전형단계 필수' });
    } else {
      clearErrors('processStage');
    }

    if (
      getValues('processStage') === '과제 및 테스트' ||
      getValues('processStage') === '면접전형' ||
      getValues('processStage') === '최종발표'
    ) {
      validationDetailedProcess();
    }
  }

  function validationDetailedProcess() {
    if (getValues('detailedProcessStage') === '세부단계를 선택하세요') {
      setError('detailedProcessStage', { type: 'required', message: '세부단계 필수' });
    } else {
      clearErrors('detailedProcessStage');
    }
  }

  useEffect(() => {
    validationProcess();
  }, [getValues('processStage')]);

  useEffect(() => {
    validationDetailedProcess();
  }, [getValues('detailedProcessStage')]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel='간편등록'
      style={S.modalStyles}
      id={currentModalProcess}
      appElement={document.getElementById('root') as HTMLBodyElement}>
      <S.ModalForm onSubmit={handleSubmit(addSimpleHandler)}>
        <S.ModalTitle>간편등록</S.ModalTitle>
        <S.ModalInputWrapper>
          {/* 회사명 */}
          <S.ModalInputBox>
            <S.ModalInput
              type='text'
              $error={errors.companyName ? true : false}
              placeholder='회사명을 입력하세요'
              {...register('companyName', { required: '회사명 필수' })}
            />
            {errors.companyName && <S.InvalidIcon>!</S.InvalidIcon>}
          </S.ModalInputBox>

          {/* 전형단계 */}
          <S.ModalDropdownBox
            type='button'
            onChange={validationProcess}
            $showItem={processStageToggle}
            $error={errors.processStage ? true : false}
            onClick={() => {
              ToggleHandler('processStage');
            }}>
            <S.PlaceHolder
              $color={defaultValues?.processStage !== getValues('processStage')}
              $error={errors.processStage ? true : false}>
              {getValues('processStage')}
            </S.PlaceHolder>
            <S.ArrowIcon src={SelectArrowIcon} />
            {processStageToggle && (
              <S.ModalDropdownItemBox>
                {processStageKeys.map((process: string) => (
                  <S.DropdownItem
                    onClick={() => {
                      dropDownItemHandler('processStage', process);
                    }}>
                    {process}
                  </S.DropdownItem>
                ))}
              </S.ModalDropdownItemBox>
            )}
            {errors.processStage && <S.InvalidIcon>!</S.InvalidIcon>}
          </S.ModalDropdownBox>

          {/* 세부단계 */}
          <S.ModalDropdownBox
            type='button'
            disabled={
              getValues('processStage') === '지원예정' ||
              getValues('processStage') === '서류전형' ||
              defaultValues?.processStage === getValues('processStage')
            }
            $showItem={detailedprocessStageToggle}
            $error={errors.detailedProcessStage ? true : false}
            onClick={() => {
              ToggleHandler('detailedProcessStage');
            }}>
            <S.PlaceHolder
              $color={defaultValues?.detailedProcessStage !== getValues('detailedProcessStage')}
              $error={errors.detailedProcessStage ? true : false}>
              {getValues('detailedProcessStage')}
            </S.PlaceHolder>
            {getValues('processStage') !== '지원예정' &&
              getValues('processStage') !== '서류전형' &&
              defaultValues?.processStage !== getValues('processStage') && (
                <S.ArrowIcon src={SelectArrowIcon} />
              )}

            {detailedprocessStageToggle && (
              <S.ModalDropdownItemBox>
                {processStage[getValues('processStage')].detailed?.map((process: string) => (
                  <S.DropdownItem
                    onClick={() => {
                      dropDownItemHandler('detailedProcessStage', process);
                    }}>
                    {process}
                  </S.DropdownItem>
                ))}
              </S.ModalDropdownItemBox>
            )}
            {errors.detailedProcessStage && <S.InvalidIcon>!</S.InvalidIcon>}
          </S.ModalDropdownBox>

          {/* 직무 */}
          <S.ModalInputBox>
            <S.ModalInput
              type='text'
              $error={errors.role ? true : false}
              placeholder='직무를 선택하세요'
              {...register('role', {
                required: '직무 필수',
              })}
            />
            {errors.role && <S.InvalidIcon>!</S.InvalidIcon>}
          </S.ModalInputBox>

          {/* 마감일 */}
          <S.ModalInputBox>
            <S.ModalInput
              type='datetime-local'
              $error={errors.scheduled ? true : false}
              placeholder='마감일을 선택하세요'
              {...register('scheduled', {
                required: '마감일 필수',
              })}
            />
            {errors.scheduled && <S.InvalidIcon>!</S.InvalidIcon>}
          </S.ModalInputBox>

          {/* 공고링크 */}
          <S.ModalInput type='url' placeholder='https://' />
        </S.ModalInputWrapper>
        <S.ModalHelperText>
          자세한 채용정보 등록은
          <br />
          일반등록 버튼을 눌러주세요
        </S.ModalHelperText>
        <S.ModalButtonWrapper>
          <S.InModalButton mode='common' onClick={closeModal}>
            일반등록
          </S.InModalButton>
          <S.InModalButton mode='simple' type='submit' onClick={validationProcess}>
            간편등록
          </S.InModalButton>
        </S.ModalButtonWrapper>
      </S.ModalForm>
    </Modal>
  );
};

export default ModalComponent;
