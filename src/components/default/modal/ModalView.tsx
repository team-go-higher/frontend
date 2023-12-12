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
import { formatProcessToKor } from 'utils/process';
import { processTypeInfo, processTypeList } from 'constants/process';
import SelectArrowIcon from 'assets/main/main_modal_select_arrow.svg';
import { modalMode } from 'hooks/useModal';
import { processType } from 'types/interfaces/KanbanProcess';

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
  mode: modalMode;
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
    defaultValues,
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

  const [dropDownToggle, setDropDownToggle] = useState(false);
  const [detailDropDownToggle, setDetailDropDownToggle] = useState(false);
  const [userInputToggle, setUserInputToggle] = useState(false);

  const detailedProcessType = watch('detailedProcessType');

  function dropDownToggleHandler(dropDownId: string) {
    if (dropDownId === 'processType') {
      setDropDownToggle(!dropDownToggle);
      setDetailDropDownToggle(false);
    } else {
      setDetailDropDownToggle(!detailDropDownToggle);
    }
  }

  function dropDownItemHandler(dropDownId: string, process: string) {
    if (dropDownId === 'processType') {
      setValue('processType', process);
      setValue('detailedProcessType', '');
      setDropDownToggle(!dropDownToggle);
    } else {
      setValue('detailedProcessType', process);
      setDetailDropDownToggle(!detailDropDownToggle);
    }
  }

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
            <S.ModalDropdownBox
              type='button'
              $showItem={dropDownToggle}
              $error={errors.processType ? true : false}
              onClick={() => {
                dropDownToggleHandler('processType');
              }}>
              <S.PlaceHolder
                $color={currentProcessType !== getValues('processType')}
                $error={errors.processType ? true : false}>
                {formatProcessToKor(getValues('processType'))}
              </S.PlaceHolder>
              <S.ArrowIcon src={SelectArrowIcon} />
              {dropDownToggle && (
                <S.ModalDropdownItemBox>
                  {processTypeList.map((process: string) => (
                    <S.DropdownItem
                      key={process}
                      onClick={() => {
                        dropDownItemHandler('processType', process);
                      }}>
                      {formatProcessToKor(process)}
                    </S.DropdownItem>
                  ))}
                </S.ModalDropdownItemBox>
              )}
              {errors.processType && <S.InvalidIcon>!</S.InvalidIcon>}
            </S.ModalDropdownBox>

            {/* 세부단계 */}
            {userInputToggle ? (
              <S.ModalInputBox>
                <S.ModalInput
                  type='text'
                  $error={errors.detailedProcessType ? true : false}
                  placeholder='세부 단계 입력'
                  {...register('detailedProcessType')}
                />
                {errors.schedule && <S.InvalidIcon>!</S.InvalidIcon>}
              </S.ModalInputBox>
            ) : (
              <S.ModalDropdownBox
                type='button'
                disabled={!isDetailedProcessTypeRequired()}
                $showItem={detailDropDownToggle}
                $error={errors.detailedProcessType ? true : false}
                onClick={() => {
                  dropDownToggleHandler('detailedProcessType');
                }}>
                <S.PlaceHolder
                  $color={defaultValues?.detailedProcessType !== getValues('detailedProcessType')}
                  $error={errors.detailedProcessType ? true : false}>
                  {getValues('detailedProcessType') === ''
                    ? '세부 단계를 입력하세요'
                    : getValues('detailedProcessType')}
                </S.PlaceHolder>
                {isDetailedProcessTypeRequired() && <S.ArrowIcon src={SelectArrowIcon} />}

                {detailDropDownToggle && (
                  <S.ModalDropdownItemBox>
                    {fetchedProcessData.map((process: any) => (
                      <S.DropdownItem
                        key={process.id}
                        onClick={() => {
                          dropDownItemHandler('detailedProcessType', process.description);
                        }}>
                        {process.description}
                      </S.DropdownItem>
                    ))}
                    <S.DropdownItem onClick={() => setUserInputToggle(true)}>
                      직접 입력
                    </S.DropdownItem>
                  </S.ModalDropdownItemBox>
                )}
                {errors.detailedProcessType && <S.InvalidIcon>!</S.InvalidIcon>}
              </S.ModalDropdownBox>
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
            <S.ModalDropdownBox
              type='button'
              disabled={mode === 'simpleEdit' ? true : false}
              $showItem={dropDownToggle}
              $error={errors.processType ? true : false}
              onClick={() => {
                dropDownToggleHandler('processType');
              }}>
              <S.PlaceHolder
                $color={defaultValues?.processType !== getValues('processType')}
                $error={errors.processType ? true : false}>
                {formatProcessToKor(getValues('processType'))}
              </S.PlaceHolder>
              {mode === 'simpleEdit' ? null : <S.ArrowIcon src={SelectArrowIcon} />}
              {dropDownToggle && (
                <S.ModalDropdownItemBox>
                  {processTypeList.map((process: string) => (
                    <S.DropdownItem
                      key={process}
                      onClick={() => {
                        dropDownItemHandler('processType', process);
                      }}>
                      {formatProcessToKor(process)}
                    </S.DropdownItem>
                  ))}
                </S.ModalDropdownItemBox>
              )}
              {errors.processType && <S.InvalidIcon>!</S.InvalidIcon>}
            </S.ModalDropdownBox>

            {/* 세부단계 */}
            {userInputToggle ? (
              <S.ModalInputBox>
                <S.ModalInput
                  type='text'
                  $error={errors.detailedProcessType ? true : false}
                  placeholder='세부 단계 입력'
                  {...register('detailedProcessType', { required: true })}
                />
                {errors.schedule && <S.InvalidIcon>!</S.InvalidIcon>}
              </S.ModalInputBox>
            ) : (
              <S.ModalDropdownBox
                type='button'
                disabled={mode === 'simpleEdit' ? true : !isDetailedProcessTypeRequired()}
                $showItem={detailDropDownToggle}
                $error={errors.detailedProcessType ? true : false}
                onClick={() => {
                  dropDownToggleHandler('detailedProcessType');
                }}>
                <S.PlaceHolder
                  $color={defaultValues?.detailedProcessType !== getValues('detailedProcessType')}
                  $error={errors.detailedProcessType ? true : false}>
                  {getValues('detailedProcessType') === ''
                    ? '세부 단계를 입력하세요'
                    : getValues('detailedProcessType')}
                </S.PlaceHolder>

                {mode === 'simpleEdit'
                  ? null
                  : isDetailedProcessTypeRequired() && <S.ArrowIcon src={SelectArrowIcon} />}

                {detailDropDownToggle && (
                  <S.ModalDropdownItemBox>
                    {processTypeInfo[getValues('processType') as processType].detailed?.map(
                      (process: string) => (
                        <S.DropdownItem
                          key={process}
                          onClick={() => {
                            dropDownItemHandler('detailedProcessType', process);
                          }}>
                          {process}
                        </S.DropdownItem>
                      ),
                    )}
                    <S.DropdownItem onClick={() => setUserInputToggle(true)}>
                      직접 입력
                    </S.DropdownItem>
                  </S.ModalDropdownItemBox>
                )}
                {errors.detailedProcessType && <S.InvalidIcon>!</S.InvalidIcon>}
              </S.ModalDropdownBox>
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
                $error={errors.schedule ? true : false}
                placeholder='마감일을 선택하세요'
                {...register('schedule')}
              />
              {errors.schedule && <S.InvalidIcon>!</S.InvalidIcon>}
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
