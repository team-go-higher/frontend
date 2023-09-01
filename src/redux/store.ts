import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import kanbanReducer from './kanbanSlice';

const rootReducer = combineReducers({
  kanban: kanbanReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  // 미들웨어 등 설정 옵션 추가 가능
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {},
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
