import apiService from 'apis';
import { IPosition, IUserInfo } from 'types/interfaces/Auth';

export const getPositions = async () => {
  const config = await apiService.Get<IPosition[]>('/v1/positions');
  return config.data;
};

export const postPositions = async (positionIds: number[]) => {
  await apiService.Post('/v1/desired-positions', {
    positionIds: positionIds,
    mainPositionId: positionIds[0],
    emptyInput: true,
  });
};

export const fetchUserPositionInfo = async () => {
  const config = await apiService.Get<IUserInfo>('/v1/users/me');
  return config.data;
};

export const postLogout = async () => {
  await apiService.Post('tokens/logout');
};
