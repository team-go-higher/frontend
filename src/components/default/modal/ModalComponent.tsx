import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import SelectArrowIcon from 'assets/main/main_modal_select_arrow.svg';
import * as S from './ModalStyledComponents';
import { processTypeInfo, processTypeListToKorean } from 'constants/process';
import { IRegisterNewApplication } from 'types/interfaces/KanbanProcess';
import { fomatProcessTypeToEnglish, formatProcessToKorean } from 'utils/process';
import {
  registerSimpleApplication,
  editSimpleApplication,
  updateApplicationProcess,
} from 'apis/kanban';
import { goHigerApi } from 'apis';

interface IProps {
  mode: string;
  modalIsOpen: boolean;
  closeModal: () => void;
  currentProcessType: string;
  fetchedProcessData: any;
  applicationInfo: any;
}

/*
TODO
  1. as 타입 추론 제거
  2. any 타입 제거
  3. 옵셔널 체이닝 제거
*/
const ModalComponent = ({
  mode,
  modalIsOpen,
  closeModal,
  currentProcessType,
  fetchedProcessData,
  applicationInfo,
}: IProps) => {
  const queryClient = useQueryClient();
  const [dropDownToggle, setDropDownToggle] = useState(false);
  const [detailDropDownToggle, setDetailDropDownToggle] = useState(false);
  const [userInputToggle, setUserInputToggle] = useState(false);

  console.log(currentProcessType.length);
  console.log(applicationInfo);
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
  });

  const registerMutation = useMutation(
    (newApplicationData: IRegisterNewApplication) => registerSimpleApplication(newApplicationData),
    {
      onSuccess() {
        queryClient.invalidateQueries('fetchKanbanList');
      },
    },
  );

  const editMutation = useMutation(
    (editData: any) => {
      const { editApplicationData, applicationId } = editData;
      return editSimpleApplication(editApplicationData, applicationId);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries('fetchKanbanList');
      },
    },
  );

  const updateProcessMutation = useMutation(
    (updateData: any) => {
      const { applicationId, processId } = updateData;
      return updateApplicationProcess(applicationId, processId);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries('fetchKanbanList');
        closeModal();
      },
    },
  );

  // 전형 or 세부단계 드롭박스 토글 함수
  function ToggleHandler(dropDownId: string) {
    if (dropDownId === 'processStage') {
      setDropDownToggle(!dropDownToggle);
      setDetailDropDownToggle(false);
    } else {
      setDetailDropDownToggle(!detailDropDownToggle);
    }
  }

  // 전형 or 세부 단계 선택시 실행 함수
  function dropDownItemHandler(dropDownId: string, process: string) {
    if (dropDownId === 'processStage') {
      setValue('processStage', process);
      setValue('detailedProcessStage', defaultValues?.detailedProcessStage as string);
      setDropDownToggle(!dropDownToggle);
    } else {
      setValue('detailedProcessStage', process);
      setDetailDropDownToggle(!detailDropDownToggle);
    }
  }

  // 간편등록 & 수정 handler
  function simpleResisterHandler() {
    if (mode === 'add') {
      const newApplicationData = {
        companyName: getValues('companyName'),
        position: getValues('position'),
        url: getValues('recruitUrl'),
        currentProcess: {
          type: fomatProcessTypeToEnglish(getValues('processStage') as string),
          description:
            getValues('detailedProcessStage') === defaultValues?.detailedProcessStage
              ? getValues('processStage')
              : getValues('detailedProcessStage'),
          schedule: getValues('scheduled'),
        },
      };

      registerMutation.mutate(newApplicationData);
    } else if (mode === 'edit') {
      const editApplicationData = {
        companyName: getValues('companyName'),
        position: getValues('position'),
        processId: applicationInfo.process.id,
        schedule: getValues('scheduled'),
        url: getValues('recruitUrl'),
      };

      editMutation.mutate({
        editApplicationData,
        applicationId: applicationInfo.applicationId,
      });
    }
    closeModal();
  }

  async function addNewProcess() {
    const requestData = {
      type: fomatProcessTypeToEnglish(getValues('processStage') as string),
      description:
        getValues('detailedProcessStage') === ''
          ? getValues('processStage')
          : getValues('detailedProcessStage'),
    };

    const { data } = await goHigerApi.post(
      `v1/applications/${applicationInfo.applicationId}/processes`,
      requestData,
    );

    if (data.success) {
      updateProcessMutation.mutate({
        applicationId: applicationInfo.applicationId,
        processId: data.data.id,
      });
    }
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
    if (getValues('detailedProcessStage') === '') {
      setError('detailedProcessStage', { type: 'required', message: '세부단계 필수' });
    } else {
      clearErrors('detailedProcessStage');
    }
  }
  // 모달close시 안의 내용 reset
  useEffect(() => {
    reset({
      companyName: applicationInfo?.companyName || '',
      processStage:
        currentProcessType.length > 1
          ? processTypeInfo[currentProcessType].korean
          : processTypeInfo[applicationInfo?.process?.type].korean,
      detailedProcessStage: applicationInfo?.process?.description || '',
      position: applicationInfo?.position,
      scheduled: applicationInfo?.process?.schedule || '',
      recruitUrl: applicationInfo?.recruitUrl || '',
    });

    setDropDownToggle(false);
    setDetailDropDownToggle(false);
    setUserInputToggle(false);
  }, [modalIsOpen]);

  useEffect(() => {
    validationDetailedProcess();
  }, [getValues('detailedProcessStage')]);

  if (mode === 'move') {
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='간편수정'
        style={S.editModalStyles}
        id={currentProcessType}
        appElement={document.getElementById('root') as HTMLBodyElement}>
        <S.ModalForm onSubmit={handleSubmit(addNewProcess)}>
          {fetchedProcessData.data.length === 0 ? (
            <S.ModalTitle>전형추가</S.ModalTitle>
          ) : (
            <S.ModalTitle>전형수정</S.ModalTitle>
          )}

          <S.ModalInputWrapper>
            <S.ModalDropdownBox
              type='button'
              onChange={validationProcess}
              $showItem={dropDownToggle}
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
              {dropDownToggle && (
                <S.ModalDropdownItemBox>
                  {processTypeListToKorean.map((process: string) => (
                    <S.DropdownItem
                      key={process}
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
            {userInputToggle ? (
              <S.ModalInputBox>
                <S.ModalInput
                  type='text'
                  $error={errors.detailedProcessStage ? true : false}
                  placeholder='세부 단계 입력'
                  {...register('detailedProcessStage')}
                />
                {errors.scheduled && <S.InvalidIcon>!</S.InvalidIcon>}
              </S.ModalInputBox>
            ) : (
              <S.ModalDropdownBox
                type='button'
                disabled={
                  getValues('processStage') === '지원예정' ||
                  getValues('processStage') === '서류전형'
                }
                $showItem={detailDropDownToggle}
                $error={errors.detailedProcessStage ? true : false}
                onClick={() => {
                  ToggleHandler('detailedProcessStage');
                }}>
                <S.PlaceHolder
                  $color={defaultValues?.detailedProcessStage !== getValues('detailedProcessStage')}
                  $error={errors.detailedProcessStage ? true : false}>
                  {getValues('detailedProcessStage') === ''
                    ? '세부 단계를 입력하세요'
                    : getValues('detailedProcessStage')}
                </S.PlaceHolder>
                {getValues('processStage') !== '지원예정' &&
                  getValues('processStage') !== '서류전형' && <S.ArrowIcon src={SelectArrowIcon} />}

                {detailDropDownToggle && (
                  <S.ModalDropdownItemBox>
                    {fetchedProcessData.data.map((process: any) => (
                      <S.DropdownItem
                        key={process.id}
                        onClick={() => {
                          dropDownItemHandler('detailedProcessStage', process.description);
                        }}>
                        {process.description}
                      </S.DropdownItem>
                    ))}
                    <S.DropdownItem onClick={() => setUserInputToggle(true)}>
                      직접 입력
                    </S.DropdownItem>
                  </S.ModalDropdownItemBox>
                )}
                {errors.detailedProcessStage && <S.InvalidIcon>!</S.InvalidIcon>}
              </S.ModalDropdownBox>
            )}
          </S.ModalInputWrapper>

          <S.ModalButtonWrapper>
            <S.InModalButton mode='common' onClick={closeModal}>
              돌아가기
            </S.InModalButton>
            <S.InModalButton mode='simple' type='submit' onClick={validationProcess}>
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
        <S.ModalForm onSubmit={handleSubmit(simpleResisterHandler)}>
          <S.ModalTitle>{mode === 'add' ? '간편등록' : '간편수정'}</S.ModalTitle>
          <S.ModalInputWrapper>
            {/* 회사명 */}
            <S.ModalInputBox>
              <S.ModalInput
                defaultValue={getValues('companyName')}
                type='text'
                $error={errors.companyName ? true : false}
                placeholder='회사명을 입력하세요'
                {...register('companyName', {
                  required: '회사명 필수',
                })}
              />
              {errors.companyName && <S.InvalidIcon>!</S.InvalidIcon>}
            </S.ModalInputBox>

            {/* 전형단계 */}
            <S.ModalDropdownBox
              type='button'
              disabled={mode === 'edit' ? true : false}
              onChange={validationProcess}
              $showItem={dropDownToggle}
              $error={errors.processStage ? true : false}
              onClick={() => {
                ToggleHandler('processStage');
              }}>
              <S.PlaceHolder
                $color={defaultValues?.processStage !== getValues('processStage')}
                $error={errors.processStage ? true : false}>
                {getValues('processStage')}
              </S.PlaceHolder>
              {mode === 'edit' ? null : <S.ArrowIcon src={SelectArrowIcon} />}
              {dropDownToggle && (
                <S.ModalDropdownItemBox>
                  {processTypeListToKorean.map((process: string) => (
                    <S.DropdownItem
                      key={process}
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
            {userInputToggle ? (
              <S.ModalInputBox>
                <S.ModalInput
                  type='text'
                  $error={errors.detailedProcessStage ? true : false}
                  placeholder='세부 단계 입력'
                  {...register('detailedProcessStage')}
                />
                {errors.scheduled && <S.InvalidIcon>!</S.InvalidIcon>}
              </S.ModalInputBox>
            ) : (
              <S.ModalDropdownBox
                type='button'
                disabled={
                  mode === 'edit'
                    ? true
                    : getValues('processStage') === '지원예정' ||
                      getValues('processStage') === '서류전형'
                }
                $showItem={detailDropDownToggle}
                $error={errors.detailedProcessStage ? true : false}
                onClick={() => {
                  ToggleHandler('detailedProcessStage');
                }}>
                <S.PlaceHolder
                  $color={defaultValues?.detailedProcessStage !== getValues('detailedProcessStage')}
                  $error={errors.detailedProcessStage ? true : false}>
                  {getValues('detailedProcessStage') === ''
                    ? '세부 단계를 입력하세요'
                    : getValues('detailedProcessStage')}
                </S.PlaceHolder>

                {mode === 'edit'
                  ? null
                  : getValues('processStage') !== '지원예정' &&
                    getValues('processStage') !== '서류전형' && (
                      <S.ArrowIcon src={SelectArrowIcon} />
                    )}

                {detailDropDownToggle && (
                  <S.ModalDropdownItemBox>
                    {processTypeInfo[getValues('processStage') as string].detailed?.map(
                      (process: string) => (
                        <S.DropdownItem
                          key={process}
                          onClick={() => {
                            dropDownItemHandler('detailedProcessStage', process);
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
                {errors.detailedProcessStage && <S.InvalidIcon>!</S.InvalidIcon>}
              </S.ModalDropdownBox>
            )}

            {/* 직무 */}
            <S.ModalInputBox>
              <S.ModalInput
                type='text'
                $error={errors.position ? true : false}
                placeholder='직무를 선택하세요'
                {...register('position', {
                  required: '직무 필수',
                })}
              />
              {errors.position && <S.InvalidIcon>!</S.InvalidIcon>}
            </S.ModalInputBox>

            {/* 마감일 */}
            <S.ModalInputBox>
              <S.ModalInput
                type='datetime-local'
                $error={errors.scheduled ? true : false}
                placeholder='마감일을 선택하세요'
                {...register('scheduled')}
              />
              {errors.scheduled && <S.InvalidIcon>!</S.InvalidIcon>}
            </S.ModalInputBox>

            {/* 공고링크 */}
            <S.ModalInput placeholder='https://' {...register('recruitUrl')} />
          </S.ModalInputWrapper>
          <S.ModalHelperText>
            자세한 채용정보 등록은
            <br />
            일반등록 버튼을 눌러주세요
          </S.ModalHelperText>
          <S.ModalButtonWrapper>
            <S.InModalButton mode='common' onClick={closeModal}>
              {mode === 'edit' ? '취소' : '일반등록'}
            </S.InModalButton>
            <S.InModalButton mode='simple' type='submit' onClick={validationProcess}>
              {mode === 'edit' ? '수정완료' : '간편등록'}
            </S.InModalButton>
          </S.ModalButtonWrapper>
        </S.ModalForm>
      </Modal>
    );
};

export default ModalComponent;
