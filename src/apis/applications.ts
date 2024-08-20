import apiService from 'apis';

export type ApplicationProcessType = 'TO_APPLY' | 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';
export interface ApplicationStatusCardData {
  applicationId: number;
  companyName: string;
  position: string;
  specificPosition: string;
  isCompleted: boolean;
  process: {
    id: number;
    type: ApplicationProcessType;
    description: string;
    schedule: string;
  };
}

interface GetApplicationsRes {
  hasNext: boolean;
  content: ApplicationStatusCardData[];
}

export type ApplicationSort = 'processType' | 'reverseProcessType' | 'closing' | null;
export type ApplicationProcess = ApplicationProcessType[] | null;

export const getApplications = async (
  pageNumber: number,
  companyName: string,
  sort?: ApplicationSort,
  process?: ApplicationProcess,
  complete?: boolean | null,
) => {
  let params = '';
  if (companyName !== '') params += `&companyName=${companyName}`;
  if (sort) params += `&sort=${sort}`;
  if (process && process.length > 0) {
    params = process.reduce((acc, el) => {
      return (acc += `&process=${el}`);
    }, params);
  }
  if (complete !== null) params += `&completed=${complete}`;

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

export const deleteApplication = async (applicationId: number) => {
  const data = await apiService.Delete(`/v1/applications/${applicationId}`);
  return data.data;
};
