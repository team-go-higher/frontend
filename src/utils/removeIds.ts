import { IApplicationSpecific, IProcesses } from 'types/interfaces/Application';

export const removeProcessIds = (application: IApplicationSpecific) => {
  if (application?.processes) {
    return {
      ...application,
      processes: application.processes.map((process: IProcesses) => {
        const { id, ...rest } = process;
        return rest;
      }),
    };
  }
  return application;
};
