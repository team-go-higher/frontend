import { goHigerApi } from 'apis';
import { useQuery, useMutation } from 'react-query';

const getPositions = async () => {
  const { data }: any = await goHigerApi.get('/v1/positions');
  return data;
};

export const usePositions = () => {
  return useQuery('positions', getPositions);
};

const postPositions = async (positionIds: number[]) => {
  const { data }: any = await goHigerApi.post('/v1/desired-positions', {
    positionIds: positionIds,
  });
  return data;
};

export const usePostPositions = () => {
  return useMutation(postPositions);
};
