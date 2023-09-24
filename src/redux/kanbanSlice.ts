import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { kanbanProcessData2 } from 'data/mock/KanbanProcess';
import { IkabanData, application } from 'types/interfaces/KanbanProcess';
import { current } from '@reduxjs/toolkit';

const initialState: IkabanData[] = kanbanProcessData2;

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    addResume: (
      state,
      { payload }: PayloadAction<{ processName: string; newResumeData: application }>,
    ) => {
      const filterdData = state.filter(data => data.processType === payload.processName)[0];

      filterdData.applications.push(payload.newResumeData);
    },
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

export const { addResume, updateProcess } = kanbanSlice.actions;
export default kanbanSlice.reducer;
