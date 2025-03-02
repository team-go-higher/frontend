import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useForm, Controller } from 'react-hook-form';

import * as S from './ModalStyledComponents';
import { processTypeInfo, processTypeList } from 'constants/process';
import { modalModeType } from 'hooks/feature/useApplicationModal';
import useDropDownHandler from 'hooks/feature/useDropDownHandler';
import ModalDropDown from './ModalDropDown';
import { handleApplicationSubmissionType } from './ModalViewModel';
import { fetchUserPositionInfo } from 'apis/auth';
import { getUserInfo } from 'utils/localStorage';
import { ProcessType } from 'types/interfaces/Common';
import { IPosition } from 'types/interfaces/Auth';

interface ModalViewModelProps {
  handleApplicationSubmission: handleApplicationSubmissionType;
  mode: modalModeType;
  currentProcessType: ProcessType;
  fetchedProcessData: any; // 적절한 타입으로 변경해주세요.
  applicationInfo: any; // 적절한 타입으로 변경해주세요.
}
interface IProps {
  viewModel: ModalViewModelProps;
  modalIsOpen: boolean;
  closeModal: () => void;
}

export type FormValuesType = {
  companyName: string;
  processType: string;
  detailedProcessType: string;
  position: string;
  schedule: string;
  url: string;
};

// TODO : defaultValue 설정 로직 수정
const ModalView = ({ viewModel, modalIsOpen, closeModal }: IProps) => {
  const {
    handleApplicationSubmission,
    mode,
    currentProcessType,
    fetchedProcessData,
    applicationInfo,
  } = viewModel;
  const [desiredPositionList, setDesiredPositionList] = useState<string[]>([]);
  const FormValues: FormValuesType = {
    companyName: '',
    processType: currentProcessType ? currentProcessType : applicationInfo.process.type,
    detailedProcessType:
      mode === 'updateCurrentProcess'
        ? applicationInfo.processDescription.length > 0
          ? applicationInfo.processDescription[0].description
          : ''
        : applicationInfo.process.description,
    position: applicationInfo.position !== '' ? applicationInfo.position : desiredPositionList[0],
    schedule: '',
    url: '',
  };

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    setError,
    clearErrors,
    watch,
    formState: { errors, defaultValues },
  } = useForm<typeof FormValues>({
    mode: 'onSubmit',
    defaultValues: getResetValues(),
  });

  const { dropDownToggle, setDropDownToggle, dropDownToggleHandler, dropDownItemHandler } =
    useDropDownHandler(setValue, 'processType');
  const {
    dropDownToggle: detailedDropDownToggle,
    setDropDownToggle: setDetailedDropDownToggle,
    dropDownToggleHandler: detailedDropDownToggleHandler,
    dropDownItemHandler: detailedDropDownItemHandler,
  } = useDropDownHandler(setValue, 'detailedProcessType');
  const {
    dropDownToggle: positionDropDownToggle,
    setDropDownToggle: setPositionDropDownToggle,
    dropDownToggleHandler: positionDropDownToggleHandler,
    dropDownItemHandler: positionDropDownItemHandler,
  } = useDropDownHandler(setValue, 'position');

  const processType = watch('processType');
  const detailedProcessType = watch('detailedProcessType');

  function isDetailedProcessTypeRequired() {
    if (getValues('processType') === 'TO_APPLY' || getValues('processType') === 'DOCUMENT') {
      return false;
    } else {
      return true;
    }
  }

  function isError(field: keyof typeof FormValues) {
    return errors[field] ? true : false;
  }

  function getResetValues() {
    if (!modalIsOpen) {
      return {
        companyName: '',
        processType: '',
        detailedProcessType: '',
        position: [],
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

    const position = applicationInfo.position || desiredPositionList[0];

    return {
      companyName: applicationInfo.companyName,
      processType,
      detailedProcessType,
      position,
      schedule: applicationInfo.process.schedule,
      url: applicationInfo.url,
    };
  }

  function validateProcessType() {
    if (isDetailedProcessTypeRequired()) {
      if (!detailedProcessType) {
        setError('detailedProcessType', {
          type: 'required',
          message: '세부 단계를 선택하세요',
        });
      } else {
        clearErrors('detailedProcessType');
      }
    } else {
      clearErrors('detailedProcessType');
    }
  }

  const storeUserPositionInfo = async () => {
    const userPositionInfo = await fetchUserPositionInfo();
    if (userPositionInfo) {
      localStorage.setItem('userPositionInfo', JSON.stringify(userPositionInfo.data));

      const { desiredPositions } = userPositionInfo.data;

      setDesiredPositionList(desiredPositions.map((item: IPosition) => item.position));
    }
  };

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo !== null && userInfo.role === 'USER') {
      storeUserPositionInfo();
    }
  }, []);

  // 세부단계 유효성 검사
  useEffect(() => {
    validateProcessType();
  }, [processType, detailedProcessType]);

  // 전형단계 변경시 세부단계 초기화
  useEffect(() => {
    if (mode === 'simpleRegister') {
      if (processType !== currentProcessType || processType === 'TO_APPLY') {
        setValue('detailedProcessType', '');
      }
    }
  }, [processType, mode]);

  // 모달 닫힐때 초기화
  useEffect(() => {
    reset(getResetValues());

    setDropDownToggle(false);
    setDetailedDropDownToggle(false);
    setPositionDropDownToggle(false);
  }, [modalIsOpen, mode]);

  useEffect(() => {
    if (dropDownToggle) {
      setDetailedDropDownToggle(false);
    } else if (detailedDropDownToggle) {
      setDropDownToggle(false);
    }
  }, [dropDownToggle, detailedDropDownToggle]);

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

            <ModalDropDown
              dropDownId='detailedProcessType'
              disabled={!isDetailedProcessTypeRequired()}
              toggle={detailedDropDownToggle}
              isError={isError('detailedProcessType')}
              value={
                getValues('detailedProcessType') === ''
                  ? '세부 단계를 입력하세요'
                  : getValues('detailedProcessType')
              }
              isPlaceHolder={defaultValues?.processType !== getValues('processType')}
              isArrowIconRequired={isDetailedProcessTypeRequired()}
              itemList={processTypeInfo[getValues('processType') as ProcessType]?.detailed}
              dropDownToggleHandler={detailedDropDownToggleHandler}
              dropDownItemHandler={detailedDropDownItemHandler}
            />
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
              <Controller
                name='companyName'
                control={control}
                render={({ field }) => (
                  <S.ModalInput
                    {...field}
                    onChange={e => field.onChange(e.target.value)}
                    required={true}
                    type='text'
                    $error={errors.companyName ? true : false}
                    placeholder='회사명을 입력하세요'
                  />
                )}
              />

              {errors.companyName && <S.InvalidIcon>!</S.InvalidIcon>}
            </S.ModalInputBox>

            {/* 전형단계 */}
            <ModalDropDown
              dropDownId='processType'
              disabled={mode === 'simpleEdit' ? true : false}
              toggle={dropDownToggle}
              isError={isError('processType')}
              isPlaceHolder={mode !== 'simpleEdit'}
              isArrowIconRequired={mode !== 'simpleEdit'}
              value={getValues('processType')}
              itemList={processTypeList}
              dropDownToggleHandler={dropDownToggleHandler}
              dropDownItemHandler={dropDownItemHandler}
            />

            {/* 세부단계 */}
            <ModalDropDown
              dropDownId='detailedProcessType'
              disabled={mode === 'simpleEdit' ? true : !isDetailedProcessTypeRequired()}
              toggle={detailedDropDownToggle}
              isError={isError('detailedProcessType')}
              value={
                getValues('detailedProcessType') === ''
                  ? '세부 단계를 입력하세요'
                  : getValues('detailedProcessType')
              }
              isPlaceHolder={
                defaultValues?.detailedProcessType !== getValues('detailedProcessType')
              }
              isArrowIconRequired={mode !== 'simpleEdit' && isDetailedProcessTypeRequired()}
              itemList={processTypeInfo[getValues('processType') as ProcessType]?.detailed}
              dropDownToggleHandler={detailedDropDownToggleHandler}
              dropDownItemHandler={detailedDropDownItemHandler}
            />

            {/* 직무 */}
            <ModalDropDown
              dropDownId='position'
              disabled={false}
              toggle={positionDropDownToggle}
              isError={isError('position')}
              isPlaceHolder={true}
              isArrowIconRequired={true}
              value={getValues('position')}
              itemList={desiredPositionList}
              dropDownToggleHandler={positionDropDownToggleHandler}
              dropDownItemHandler={positionDropDownItemHandler}
            />

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
            <S.InModalButton mode='cancel' onClick={closeModal}>
              취소
            </S.InModalButton>
            <S.InModalButton mode='confirm' type='submit' onClick={validateProcessType}>
              {mode === 'simpleEdit' ? '수정완료' : '간편등록'}
            </S.InModalButton>
          </S.ModalButtonWrapper>
        </S.ModalForm>
      </Modal>
    );
};

export default ModalView;
