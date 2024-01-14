import { useQuery, useMutation } from '@tanstack/react-query';
import apiService from 'apis';
import { queryKeys } from './queryKeys';

const getPositions = async () => {
  const { data }: any = await apiService.Get('/v1/positions');
  return data;
};

export const usePositions = () => {
  return useQuery({ queryKey: [queryKeys.AUTH, 'getPositions'], queryFn: getPositions });
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

export const fetchUserInfo = async () => {
  const { data }: any = await apiService.Get('/v1/users/me');
};