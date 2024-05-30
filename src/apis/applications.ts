import apiService from 'apis';
export interface ApplicationStatusCardData {
  applicationId: number;
  companyName: string;
  position: string;
  specificPosition: string;
  isCompleted: boolean;
  process: {
    id: number;
    type: 'TO_APPLY' | 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';
    description: string;
    schedule: string;
  };
}

interface GetApplicationsRes {
  hasNext: boolean;
  content: ApplicationStatusCardData[];
}

export const getApplications = async (pageNumber: number, companyName: string) => {
  let params = '';
  if (companyName !== '') params += `&companyName=${companyName}`;
  const data = await apiService.Get<GetApplicationsRes>(
    `/v1/applications?page=${pageNumber}&size=10` + params,
  );

  return data;
};

export const patchApplicationsFinished = async (applicationId: number, isCompleted: boolean) => {
  const data = await apiService.Patch(`/v1/applications/${applicationId}/finished`, {
    isCompleted: isCompleted,
  });

  return data.data;
};
