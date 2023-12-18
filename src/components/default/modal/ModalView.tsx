import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import {
  FieldErrors,
  FieldValues,
  UseFormClearErrors,
  UseFormSetError,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import * as S from './ModalStyledComponents';
import { processTypeInfo, processTypeList } from 'constants/process';
import { modalModeType } from 'hooks/useModal';
import { processType } from 'types/interfaces/KanbanProcess';
import useDropDownHandler from 'hooks/useDropDownHandler';
import ModalDropDown from './ModalDropDown';

interface ModalViewModelProps {
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  defaultValues: Readonly<{ [x: string]: any }> | undefined;
  errors: FieldErrors<FieldValues>;
  setError: UseFormSetError<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
  reset: UseFormReset<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  handleApplicationSubmission: () => void;
  isDetailedProcessTypeRequired: () => boolean;
  mode: modalModeType;
  currentProcessType: processType;
  fetchedProcessData: any; // 적절한 타입으로 변경해주세요.
  applicationInfo: any; // 적절한 타입으로 변경해주세요.
}

interface IProps {
  viewModel: ModalViewModelProps;
  modalIsOpen: boolean;
  closeModal: () => void;
}

const ModalView = ({ viewModel, modalIsOpen, closeModal }: IProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    errors,
    setError,
    clearErrors,
    reset,
    watch,
    handleApplicationSubmission,
    isDetailedProcessTypeRequired,
    mode,
    currentProcessType,
    fetchedProcessData,
    applicationInfo,
  } = viewModel;

  const detailedProcessType = watch('detailedProcessType');
  const [userInputToggle, setUserInputToggle] = useState(false);
  const {
    dropDownToggle,
    setDropDownToggle,
    detailDropDownToggle,
    setDetailDropDownToggle,
    dropDownToggleHandler,
    dropDownItemHandler,
  } = useDropDownHandler(setValue);

  function getResetValues() {
    if (!modalIsOpen) {
      return {
        companyName: '',
        processType: '',
        detailedProcessType: '',
        position: '',
        schedule: '',
        url: '',
      };
    }

    const processType = currentProcessType ? currentProcessType : applicationInfo.process.type;

    const detailedProcessType =
      mode === 'updateCurrentProcess'
        ? applicationInfo.processDescription.length > 0
          ? applicationInfo.processDescription[0].description
          : ''
        : applicationInfo.process.description;

    return {
      companyName: applicationInfo.companyName,
      processType,
      detailedProcessType,
      position: applicationInfo.position,
      schedule: applicationInfo.process.schedule,
      url: applicationInfo.url,
    };
  }

  function validationProcess() {
    if (isDetailedProcessTypeRequired()) {
      if (!detailedProcessType) {
        setError('detailedProcessType', {
          type: 'required',
          message: '세부 단계를 선택하세요',
        });
      } else {
        clearErrors('detailedProcessType');
      }
    }
  }

  function isError(field: string) {
    return errors[field] ? true : false;
  }

  useEffect(() => {
    if (userInputToggle) {
      setValue('detailedProcessType', '');
    }
  }, [userInputToggle]);

  useEffect(() => {
    reset(getResetValues());

    setDropDownToggle(false);
    setDetailDropDownToggle(false);
    setUserInputToggle(false);
  }, [modalIsOpen, mode]);

  useEffect(() => {
    validationProcess();
  }, [detailedProcessType]);

  if (mode === 'updateCurrentProcess') {
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='간편수정'
        style={S.editModalStyles}
        id={currentProcessType}
        appElement={document.getElementById('root') as HTMLBodyElement}>
        <S.ModalForm onSubmit={handleSubmit(handleApplicationSubmission)}>
          {fetchedProcessData.length === 0 ? (
            <S.ModalTitle>전형추가</S.ModalTitle>
          ) : (
            <S.ModalTitle>전형수정</S.ModalTitle>
          )}

          <S.ModalInputWrapper>
            <ModalDropDown
              dropDownId='processType'
              toggle={dropDownToggle}
              isError={isError('processType')}
              value={getValues('processType')}
              isPlaceHolder={getValues('processType') !== currentProcessType}
              isArrowIconRequired={true}
              itemList={processTypeList}
              dropDownToggleHandler={dropDownToggleHandler}
              dropDownItemHandler={dropDownItemHandler}
            />

            {/* 세부단계 */}
            {userInputToggle ? (
              <S.ModalInputBox>
                <S.ModalInput
                  type='text'
                  $error={errors.detailedProcessType ? true : false}
                  placeholder='세부 단계 입력'
                  {...register('detailedProcessType')}
                />
                {errors.detailedProcessType && <S.InvalidIcon>!</S.InvalidIcon>}
              </S.ModalInputBox>
            ) : (
              <ModalDropDown
                dropDownId='detailedProcessType'
                disabled={!isDetailedProcessTypeRequired()}
                toggle={detailDropDownToggle}
                isError={isError('detailedProcessType')}
                value={
                  getValues('detailedProcessType') === ''
                    ? '세부 단계를 입력하세요'
                    : getValues('detailedProcessType')
                }
                isPlaceHolder={
                  getValues('detailedProcessType') !== applicationInfo.process.description
                }
                isArrowIconRequired={isDetailedProcessTypeRequired()}
                itemList={processTypeInfo[getValues('processType') as processType].detailed}
                isInputToggle={true}
                inputToggleHandler={() => setUserInputToggle(true)}
                dropDownToggleHandler={dropDownToggleHandler}
                dropDownItemHandler={dropDownItemHandler}
              />
            )}
          </S.ModalInputWrapper>

          <S.ModalButtonWrapper>
            <S.InModalButton mode='common' onClick={closeModal}>
              돌아가기
            </S.InModalButton>
            <S.InModalButton mode='simple' type='submit'>
              수정완료
            </S.InModalButton>
          </S.ModalButtonWrapper>
        </S.ModalForm>
      </Modal>
    );
  } else
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='간편등록'
        style={S.normalModalStyles}
        id={currentProcessType}
        appElement={document.getElementById('root') as HTMLBodyElement}>
        <S.ModalForm onSubmit={handleSubmit(handleApplicationSubmission)}>
          <S.ModalTitle>{mode === 'simpleRegister' ? '간편등록' : '간편수정'}</S.ModalTitle>
          <S.ModalInputWrapper>
            {/* 회사명 */}
            <S.ModalInputBox>
              <S.ModalInput
                defaultValue={getValues('companyName')}
                type='text'
                $error={errors.companyName ? true : false}
                placeholder='회사명을 입력하세요'
                {...register('companyName', {
                  required: true,
                })}
              />
              {errors.companyName && <S.InvalidIcon>!</S.InvalidIcon>}
            </S.ModalInputBox>

            {/* 전형단계 */}
            <ModalDropDown
              dropDownId='processType'
              disabled={mode === 'simpleEdit' ? true : false}
              toggle={dropDownToggle}
              isError={isError('processType')}
              isPlaceHolder={getValues('processType') !== currentProcessType}
              isArrowIconRequired={mode !== 'simpleEdit'}
              value={getValues('processType')}
              itemList={processTypeList}
              dropDownToggleHandler={dropDownToggleHandler}
              dropDownItemHandler={dropDownItemHandler}
            />

            {/* 세부단계 */}
            {userInputToggle ? (
              <S.ModalInputBox>
                <S.ModalInput
                  type='text'
                  $error={errors.detailedProcessType ? true : false}
                  placeholder='세부 단계 입력'
                  {...register('detailedProcessType', { required: true })}
                />
                {errors.detailedProcessType && <S.InvalidIcon>!</S.InvalidIcon>}
              </S.ModalInputBox>
            ) : (
              <ModalDropDown
                dropDownId='detailedProcessType'
                disabled={mode === 'simpleEdit' ? true : !isDetailedProcessTypeRequired()}
                toggle={detailDropDownToggle}
                isError={isError('detailedProcessType')}
                value={
                  getValues('detailedProcessType') === ''
                    ? '세부 단계를 입력하세요'
                    : getValues('detailedProcessType')
                }
                isPlaceHolder={getValues('detailedProcessType') !== currentProcessType}
                isArrowIconRequired={mode !== 'simpleEdit' && isDetailedProcessTypeRequired()}
                itemList={processTypeInfo[getValues('processType') as processType]?.detailed}
                isInputToggle={true}
                inputToggleHandler={() => setUserInputToggle(true)}
                dropDownToggleHandler={dropDownToggleHandler}
                dropDownItemHandler={dropDownItemHandler}
              />
            )}

            {/* 직무 */}
            <S.ModalInputBox>
              <S.ModalInput
                type='text'
                $error={errors.position ? true : false}
                placeholder='직무를 선택하세요'
                {...register('position', {
                  required: true,
                })}
              />
              {errors.position && <S.InvalidIcon>!</S.InvalidIcon>}
            </S.ModalInputBox>

            {/* 마감일 */}
            <S.ModalInputBox>
              <S.ModalInput
                type='datetime-local'
                placeholder='마감일을 선택하세요'
                {...register('schedule')}
              />
            </S.ModalInputBox>

            {/* 공고링크 */}
            <S.ModalInput placeholder='https://' {...register('url')} />
          </S.ModalInputWrapper>
          <S.ModalHelperText>
            자세한 채용정보 등록은
            <br />
            일반등록 버튼을 눌러주세요
          </S.ModalHelperText>
          <S.ModalButtonWrapper>
            <S.InModalButton mode='common' onClick={closeModal}>
              {mode === 'simpleEdit' ? '취소' : '일반등록'}
            </S.InModalButton>
            <S.InModalButton mode='simple' type='submit' onClick={validationProcess}>
              {mode === 'simpleEdit' ? '수정완료' : '간편등록'}
            </S.InModalButton>
          </S.ModalButtonWrapper>
        </S.ModalForm>
      </Modal>
    );
};

export default ModalView;
