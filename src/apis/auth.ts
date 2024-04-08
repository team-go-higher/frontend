import apiService from 'apis';

export const getPositions = async () => {
  const { data }: any = await apiService.Get('/v1/positions');
  return data;
};

export const postPositions = async (positionIds: number[]) => {
  const { data }: any = await apiService.Post('/v1/desired-positions', {
    positionIds: positionIds,
    mainPositionId: positionIds[0],
    emptyInput: true,
  });
  return data;
};

export const fetchUserPoistionInfo = async () => {
  const { data }: any = await apiService.Get('/v1/users/me');
  return data;
};

export const postLogout = async () => {
  await apiService.Post('tokens/logout');
};
