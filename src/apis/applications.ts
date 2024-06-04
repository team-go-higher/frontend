import ApiService from 'apis';

export const patchApplicationsFinished = async (applicationId: number, isCompleted: boolean) => {
  const data = await ApiService.Patch(`/v1/applications/${applicationId}/finished`, {
    isCompleted: isCompleted,
  });

  return data.data;
};
