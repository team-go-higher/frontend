import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { KanbanProcessData } from 'data/mock/KanbanProcess';
import { IKanbanProcess, Data } from 'types/interfaces/KanbanProcess';

const initialState: IKanbanProcess = KanbanProcessData;

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    addResume: (
      state,
      { payload }: PayloadAction<{ processName: string; newResumeData: Data }>,
    ) => {
      state[payload.processName].data.push(payload.newResumeData);
    },
    updateProcess: (
      state,
      { payload }: PayloadAction<{ target: Data; nextProcessName: string }>,
    ) => {
      const targetCurrentProcess = payload.target.currentProcess;
      const targetId = payload.target.id;
      const nextProcessName = payload.nextProcessName;

      if (targetCurrentProcess !== nextProcessName) {
        // drop한 Item을 가져와서 updatedTargetData 민들기
        // updatedTargetData process의 data 항목에 넣어주기
        const updatedTargetData = state[targetCurrentProcess].data.find(
          item => item.id === targetId,
        ) as Data;
        updatedTargetData.currentProcess = nextProcessName;
        updatedTargetData.schedule = '마감일을 입력하세요';
        updatedTargetData.detailProcess = state[nextProcessName].korean;

        state[nextProcessName].data.push(updatedTargetData);

        // drop된 공고를 filter한 새로운 state를 기존의 state에 대체
        const filterdProcessData = state[targetCurrentProcess].data.filter(
          data => data.id !== targetId,
        );
        state[targetCurrentProcess].data = filterdProcessData;
      }
    },
  },
});

export const { addResume, updateProcess } = kanbanSlice.actions;
export default kanbanSlice.reducer;
