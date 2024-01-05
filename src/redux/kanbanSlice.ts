import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IKabanData, IApplication } from 'types/interfaces/KanbanProcess';

const initialState: IKabanData[] = [];

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    setApplications: (state, { payload }) => {
      return payload;
    },
    updateProcess: (
      state,
      {
        payload,
      }: PayloadAction<{
        currentProcessName: string;
        target: IApplication;
        nextProcessName: string;
      }>,
    ): IKabanData[] => {
      const { currentProcessName, target, nextProcessName } = payload;

      if (currentProcessName !== nextProcessName) {
        const currentProcessData = state.find(
          data => data.processType === currentProcessName,
        ) as IKabanData;
        const nextProcessData = state.find(
          data => data.processType === nextProcessName,
        ) as IKabanData;

        const targetIndex = currentProcessData.applications.findIndex(
          item => item.applicationId === target.applicationId,
        );

        if (targetIndex !== -1) {
          const updatedCurrentProcessApplications = currentProcessData.applications.filter(
            app => app.applicationId !== target.applicationId,
          );

          const updatedTarget = {
            ...target,
            schedule: '마감일을 입력하세요',
            processDescription: nextProcessName,
          };

          const newState: IKabanData[] = state.map(processData => {
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
