import { useQuery, useMutation } from '@tanstack/react-query';
import apiService from 'apis';
import { queryKey } from './queryKey';

const getPositions = async () => {
  const { data }: any = await apiService.Get('/v1/positions');
  return data;
};

export const usePositions = () => {
  return useQuery({ queryKey: [queryKey.POSITON], queryFn: getPositions });
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
  return useMutation({ mutationFn: postPositions });
};
