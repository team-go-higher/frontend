// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';
// import { useForm } from 'react-hook-form';
// import { useMutation, useQueryClient } from 'react-query';

// import SelectArrowIcon from 'assets/main/main_modal_select_arrow.svg';
// import * as S from './ModalStyledComponents';
// import { processTypeInfo, processTypeList } from 'constants/process';
// import { IRegisterNewApplication, processType } from 'types/interfaces/KanbanProcess';
// import { formatProcessToKor } from 'utils/process';
// import {
//   registerSimpleApplication,
//   editSimpleApplication,
//   updateApplicationProcess,
//   createNewProcess,
// } from 'apis/kanban';

// interface IProps {
//   mode: string;
//   modalIsOpen: boolean;
//   closeModal: () => void;
//   currentProcessType: processType;
//   fetchedProcessData: any;
//   applicationInfo: any;
// }

// /*
// TODO
//   1. as 타입 추론 제거
//   2. any 타입 제거
//   3. 옵셔널 체이닝 제거
// */
// const ModalComponent = ({
//   mode,
//   modalIsOpen,
//   closeModal,
//   currentProcessType,
//   fetchedProcessData,
//   applicationInfo,
// }: IProps) => {
//   const queryClient = useQueryClient();
//   const [dropDownToggle, setDropDownToggle] = useState(false);
//   const [detailDropDownToggle, setDetailDropDownToggle] = useState(false);
//   const [userInputToggle, setUserInputToggle] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     getValues,
//     setValue,
//     reset,
//     setError,
//     clearErrors,
//     watch,
//     formState: { errors, defaultValues },
//   } = useForm({
//     mode: 'onSubmit',
//   });

//   const detailedProcessType = watch('detailedProcessType');

//   function invalidateKanbanListOnSuccess() {
//     queryClient.invalidateQueries('fetchKanbanList');
//   }

//   const registerMutation = useMutation(
//     (newApplicationData: IRegisterNewApplication) => registerSimpleApplication(newApplicationData),
//     {
//       onSuccess() {
//         invalidateKanbanListOnSuccess();
//       },
//     },
//   );

//   const editMutation = useMutation(
//     (editData: any) => {
//       const { editApplicationData, applicationId } = editData;
//       return editSimpleApplication(editApplicationData, applicationId);
//     },
//     {
//       onSuccess() {
//         invalidateKanbanListOnSuccess();
//       },
//     },
//   );

//   const updateProcessMutation = useMutation(
//     (updateData: any) => {
//       const { applicationId, processId } = updateData;
//       return updateApplicationProcess(applicationId, processId);
//     },
//     {
//       onSuccess() {
//         invalidateKanbanListOnSuccess();
//         closeModal();
//       },
//     },
//   );

//   function isDetailedProcessTypeRequired() {
//     if (getValues('processType') === 'TO_APPLY' || getValues('processType') === 'DOCUMENT') {
//       return false;
//     } else {
//       return true;
//     }
//   }

//   // 전형 or 세부단계 드롭박스 토글 함수
//   function dropDownToggleHandler(dropDownId: string) {
//     if (dropDownId === 'processType') {
//       setDropDownToggle(!dropDownToggle);
//       setDetailDropDownToggle(false);
//     } else {
//       setDetailDropDownToggle(!detailDropDownToggle);
//     }
//   }

//   // 세부단계 유효성 검사 함수
//   function validationProcess() {
//     if (isDetailedProcessTypeRequired()) {
//       if (!detailedProcessType) {
//         setError('detailedProcessType', {
//           type: 'required',
//           message: '세부 단계를 선택하세요',
//         });
//       } else {
//         clearErrors('detailedProcessType');
//       }
//     }
//   }

//   // 전형 or 세부 단계 선택시 실행 함수
//   function dropDownItemHandler(dropDownId: string, process: string) {
//     if (dropDownId === 'processType') {
//       setValue('processType', process);
//       setValue('detailedProcessType', '');
//       setDropDownToggle(!dropDownToggle);
//     } else {
//       setValue('detailedProcessType', process);
//       setDetailDropDownToggle(!detailDropDownToggle);
//     }
//   }

//   async function handleApplicationSubmission() {
//     if (mode === 'simpleRegister') {
//       const newApplicationData = {
//         companyName: getValues('companyName'),
//         position: getValues('position'),
//         url: getValues('url'),
//         currentProcess: {
//           type: getValues('processType'),
//           description:
//             getValues('detailedProcessType') === ''
//               ? formatProcessToKor(getValues('processType'))
//               : getValues('detailedProcessType'),
//           schedule: getValues('schedule'),
//         },
//       };

//       registerMutation.mutate(newApplicationData);
//     } else if (mode === 'simpleEdit') {
//       const editApplicationData = {
//         companyName: getValues('companyName'),
//         position: getValues('position'),
//         processId: applicationInfo.process.id,
//         schedule: getValues('schedule'),
//         url: getValues('url'),
//       };

//       editMutation.mutate({
//         editApplicationData,
//         applicationId: applicationInfo.applicationId,
//       });
//     } else if (mode === 'updateCurrentProcess') {
//       const newProcessData = {
//         type: getValues('processType'),
//         description:
//           getValues('detailedProcessType') === ''
//             ? getValues('processType')
//             : getValues('detailedProcessType'),
//       };

//       const data = await createNewProcess(applicationInfo.applicationId, newProcessData);

//       if (data.success) {
//         updateProcessMutation.mutate({
//           applicationId: applicationInfo.applicationId,
//           processId: data.data.id,
//         });
//       }
//     }
//     closeModal();
//   }

//   function getResetValues() {
//     if (!modalIsOpen) {
//       return {
//         companyName: '',
//         processType: '',
//         detailedProcessType: '',
//         position: '',
//         schedule: '',
//         url: '',
//       };
//     }

//     const processType = currentProcessType ? currentProcessType : applicationInfo.process.type;

//     const detailedProcessType =
//       mode === 'updateCurrentProcess'
//         ? applicationInfo.processDescription.length > 0
//           ? applicationInfo.processDescription[0].description
//           : ''
//         : applicationInfo.process.description;

//     return {
//       companyName: applicationInfo.companyName,
//       processType,
//       detailedProcessType,
//       position: applicationInfo.position,
//       schedule: applicationInfo.process.schedule,
//       url: applicationInfo.url,
//     };
//   }

//   function resetInputValues() {
//     setValue('detailedProcessType', '');
//   }

//   useEffect(() => {
//     if (userInputToggle) {
//       resetInputValues();
//     }
//   }, [userInputToggle]);

//   useEffect(() => {
//     reset(getResetValues());

//     setDropDownToggle(false);
//     setDetailDropDownToggle(false);
//     setUserInputToggle(false);
//   }, [modalIsOpen, mode]);

//   useEffect(() => {
//     validationProcess();
//   }, [getValues('detailedProcessType')]);

//   if (mode === 'updateCurrentProcess') {
//     return (
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         contentLabel='간편수정'
//         style={S.editModalStyles}
//         id={currentProcessType}
//         appElement={document.getElementById('root') as HTMLBodyElement}>
//         <S.ModalForm onSubmit={handleSubmit(handleApplicationSubmission)}>
//           {fetchedProcessData.length === 0 ? (
//             <S.ModalTitle>전형추가</S.ModalTitle>
//           ) : (
//             <S.ModalTitle>전형수정</S.ModalTitle>
//           )}

//           <S.ModalInputWrapper>
//             <S.ModalDropdownBox
//               type='button'
//               $showItem={dropDownToggle}
//               $error={errors.processType ? true : false}
//               onClick={() => {
//                 dropDownToggleHandler('processType');
//               }}>
//               <S.PlaceHolder
//                 $color={currentProcessType !== getValues('processType')}
//                 $error={errors.processType ? true : false}>
//                 {formatProcessToKor(getValues('processType'))}
//               </S.PlaceHolder>
//               <S.ArrowIcon src={SelectArrowIcon} />
//               {dropDownToggle && (
//                 <S.ModalDropdownItemBox>
//                   {processTypeList.map((process: string) => (
//                     <S.DropdownItem
//                       key={process}
//                       onClick={() => {
//                         dropDownItemHandler('processType', process);
//                       }}>
//                       {formatProcessToKor(process)}
//                     </S.DropdownItem>
//                   ))}
//                 </S.ModalDropdownItemBox>
//               )}
//               {errors.processType && <S.InvalidIcon>!</S.InvalidIcon>}
//             </S.ModalDropdownBox>

//             {/* 세부단계 */}
//             {userInputToggle ? (
//               <S.ModalInputBox>
//                 <S.ModalInput
//                   type='text'
//                   $error={errors.detailedProcessType ? true : false}
//                   placeholder='세부 단계 입력'
//                   {...register('detailedProcessType')}
//                 />
//                 {errors.schedule && <S.InvalidIcon>!</S.InvalidIcon>}
//               </S.ModalInputBox>
//             ) : (
//               <S.ModalDropdownBox
//                 type='button'
//                 disabled={!isDetailedProcessTypeRequired()}
//                 $showItem={detailDropDownToggle}
//                 $error={errors.detailedProcessType ? true : false}
//                 onClick={() => {
//                   dropDownToggleHandler('detailedProcessType');
//                 }}>
//                 <S.PlaceHolder
//                   $color={defaultValues?.detailedProcessType !== getValues('detailedProcessType')}
//                   $error={errors.detailedProcessType ? true : false}>
//                   {getValues('detailedProcessType') === ''
//                     ? '세부 단계를 입력하세요'
//                     : getValues('detailedProcessType')}
//                 </S.PlaceHolder>
//                 {isDetailedProcessTypeRequired() && <S.ArrowIcon src={SelectArrowIcon} />}

//                 {detailDropDownToggle && (
//                   <S.ModalDropdownItemBox>
//                     {fetchedProcessData.map((process: any) => (
//                       <S.DropdownItem
//                         key={process.id}
//                         onClick={() => {
//                           dropDownItemHandler('detailedProcessType', process.description);
//                         }}>
//                         {process.description}
//                       </S.DropdownItem>
//                     ))}
//                     <S.DropdownItem onClick={() => setUserInputToggle(true)}>
//                       직접 입력
//                     </S.DropdownItem>
//                   </S.ModalDropdownItemBox>
//                 )}
//                 {errors.detailedProcessType && <S.InvalidIcon>!</S.InvalidIcon>}
//               </S.ModalDropdownBox>
//             )}
//           </S.ModalInputWrapper>

//           <S.ModalButtonWrapper>
//             <S.InModalButton mode='common' onClick={closeModal}>
//               돌아가기
//             </S.InModalButton>
//             <S.InModalButton mode='simple' type='submit'>
//               수정완료
//             </S.InModalButton>
//           </S.ModalButtonWrapper>
//         </S.ModalForm>
//       </Modal>
//     );
//   } else
//     return (
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         contentLabel='간편등록'
//         style={S.normalModalStyles}
//         id={currentProcessType}
//         appElement={document.getElementById('root') as HTMLBodyElement}>
//         <S.ModalForm onSubmit={handleSubmit(handleApplicationSubmission)}>
//           <S.ModalTitle>{mode === 'simpleRegister' ? '간편등록' : '간편수정'}</S.ModalTitle>
//           <S.ModalInputWrapper>
//             {/* 회사명 */}
//             <S.ModalInputBox>
//               <S.ModalInput
//                 defaultValue={getValues('companyName')}
//                 type='text'
//                 $error={errors.companyName ? true : false}
//                 placeholder='회사명을 입력하세요'
//                 {...register('companyName', {
//                   required: true,
//                 })}
//               />
//               {errors.companyName && <S.InvalidIcon>!</S.InvalidIcon>}
//             </S.ModalInputBox>

//             {/* 전형단계 */}
//             <S.ModalDropdownBox
//               type='button'
//               disabled={mode === 'simpleEdit' ? true : false}
//               $showItem={dropDownToggle}
//               $error={errors.processType ? true : false}
//               onClick={() => {
//                 dropDownToggleHandler('processType');
//               }}>
//               <S.PlaceHolder
//                 $color={defaultValues?.processType !== getValues('processType')}
//                 $error={errors.processType ? true : false}>
//                 {formatProcessToKor(getValues('processType'))}
//               </S.PlaceHolder>
//               {mode === 'simpleEdit' ? null : <S.ArrowIcon src={SelectArrowIcon} />}
//               {dropDownToggle && (
//                 <S.ModalDropdownItemBox>
//                   {processTypeList.map((process: string) => (
//                     <S.DropdownItem
//                       key={process}
//                       onClick={() => {
//                         dropDownItemHandler('processType', process);
//                       }}>
//                       {formatProcessToKor(process)}
//                     </S.DropdownItem>
//                   ))}
//                 </S.ModalDropdownItemBox>
//               )}
//               {errors.processType && <S.InvalidIcon>!</S.InvalidIcon>}
//             </S.ModalDropdownBox>

//             {/* 세부단계 */}
//             {userInputToggle ? (
//               <S.ModalInputBox>
//                 <S.ModalInput
//                   type='text'
//                   $error={errors.detailedProcessType ? true : false}
//                   placeholder='세부 단계 입력'
//                   {...register('detailedProcessType', { required: true })}
//                 />
//                 {errors.schedule && <S.InvalidIcon>!</S.InvalidIcon>}
//               </S.ModalInputBox>
//             ) : (
//               <S.ModalDropdownBox
//                 type='button'
//                 disabled={mode === 'simpleEdit' ? true : !isDetailedProcessTypeRequired()}
//                 $showItem={detailDropDownToggle}
//                 $error={errors.detailedProcessType ? true : false}
//                 onClick={() => {
//                   dropDownToggleHandler('detailedProcessType');
//                 }}>
//                 <S.PlaceHolder
//                   $color={defaultValues?.detailedProcessType !== getValues('detailedProcessType')}
//                   $error={errors.detailedProcessType ? true : false}>
//                   {getValues('detailedProcessType') === ''
//                     ? '세부 단계를 입력하세요'
//                     : getValues('detailedProcessType')}
//                 </S.PlaceHolder>

//                 {mode === 'simpleEdit'
//                   ? null
//                   : isDetailedProcessTypeRequired() && <S.ArrowIcon src={SelectArrowIcon} />}

//                 {detailDropDownToggle && (
//                   <S.ModalDropdownItemBox>
//                     {processTypeInfo[getValues('processType')].detailed?.map((process: string) => (
//                       <S.DropdownItem
//                         key={process}
//                         onClick={() => {
//                           dropDownItemHandler('detailedProcessType', process);
//                         }}>
//                         {process}
//                       </S.DropdownItem>
//                     ))}
//                     <S.DropdownItem onClick={() => setUserInputToggle(true)}>
//                       직접 입력
//                     </S.DropdownItem>
//                   </S.ModalDropdownItemBox>
//                 )}
//                 {errors.detailedProcessType && <S.InvalidIcon>!</S.InvalidIcon>}
//               </S.ModalDropdownBox>
//             )}

//             {/* 직무 */}
//             <S.ModalInputBox>
//               <S.ModalInput
//                 type='text'
//                 $error={errors.position ? true : false}
//                 placeholder='직무를 선택하세요'
//                 {...register('position', {
//                   required: true,
//                 })}
//               />
//               {errors.position && <S.InvalidIcon>!</S.InvalidIcon>}
//             </S.ModalInputBox>

//             {/* 마감일 */}
//             <S.ModalInputBox>
//               <S.ModalInput
//                 type='datetime-local'
//                 $error={errors.schedule ? true : false}
//                 placeholder='마감일을 선택하세요'
//                 {...register('schedule')}
//               />
//               {errors.schedule && <S.InvalidIcon>!</S.InvalidIcon>}
//             </S.ModalInputBox>

//             {/* 공고링크 */}
//             <S.ModalInput placeholder='https://' {...register('url')} />
//           </S.ModalInputWrapper>
//           <S.ModalHelperText>
//             자세한 채용정보 등록은
//             <br />
//             일반등록 버튼을 눌러주세요
//           </S.ModalHelperText>
//           <S.ModalButtonWrapper>
//             <S.InModalButton mode='common' onClick={closeModal}>
//               {mode === 'simpleEdit' ? '취소' : '일반등록'}
//             </S.InModalButton>
//             <S.InModalButton mode='simple' type='submit' onClick={validationProcess}>
//               {mode === 'simpleEdit' ? '수정완료' : '간편등록'}
//             </S.InModalButton>
//           </S.ModalButtonWrapper>
//         </S.ModalForm>
//       </Modal>
//     );
// };

// export default ModalComponent;
import React from 'react';

const ModalComponent = () => {
  return <div></div>;
};

export default ModalComponent;
