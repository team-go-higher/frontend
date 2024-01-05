import apiService from 'apis';
import { useQuery, useMutation } from 'react-query';

const getPositions = async () => {
  const { data }: any = await apiService.Get('/v1/positions');
  return data;
};

export const usePositions = () => {
  return useQuery('positions', getPositions);
};

const postPositions = async (positionIds: number[]) => {
  const { data }: any = await apiService.Post('/v1/desired-positions', {
    positionIds: positionIds,
    mainPositionId: positionIds[0],
    emptyInput: true,
  });
  return data;
};

export const usePostPositions = () => {
  return useMutation(postPositions);
};
