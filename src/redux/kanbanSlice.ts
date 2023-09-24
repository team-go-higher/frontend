import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRegisterNewApplication, IkabanData, application } from 'types/interfaces/KanbanProcess';

const initialState: IkabanData[] = [];

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    setApplications: (state, { payload }) => {
      return payload;
    },
    // addSimpleApplication: (
    //   state,
    //   {
    //     payload,
    //   }: PayloadAction<{ processName: string; newApplicationData: IRegisterNewApplication }>,
    // ) => {
    //   const filterdData = state.filter(data => data.processType === payload.processName)[0];

    //   // filterdData.applications.push(payload.newApplicationData);
    // },
    updateProcess: (
      state,
      {
        payload,
      }: PayloadAction<{
        currentProcessName: string;
        target: application;
        nextProcessName: string;
      }>,
    ): IkabanData[] => {
      const { currentProcessName, target, nextProcessName } = payload;

      if (currentProcessName !== nextProcessName) {
        const currentProcessData = state.find(
          data => data.processType === currentProcessName,
        ) as IkabanData;
        const nextProcessData = state.find(
          data => data.processType === nextProcessName,
        ) as IkabanData;

        const targetIndex = currentProcessData.applications.findIndex(
          item => item.id === target.id,
        );

        if (targetIndex !== -1) {
          const updatedCurrentProcessApplications = currentProcessData.applications.filter(
            app => app.id !== target.id,
          );

          const updatedTarget = {
            ...target,
            schedule: '마감일을 입력하세요',
            processDescription: nextProcessName,
          };

          const newState: IkabanData[] = state.map(processData => {
            if (processData.processType === currentProcessName) {
              return { ...processData, applications: updatedCurrentProcessApplications };
            } else if (processData.processType === nextProcessName) {
              return {
                ...processData,
                applications: [...nextProcessData.applications, updatedTarget],
              };
            } else {
              return processData;
            }
          });
          return newState;
        }
      }
      return state;
    },
  },
});

export const { setApplications, updateProcess } = kanbanSlice.actions;
export default kanbanSlice.reducer;
