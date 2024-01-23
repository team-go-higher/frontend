import { IApplication } from 'types/interfaces/KanbanProcess';

export const initialApplicationInfo: IApplication = {
  applicationId: 0,
  companyName: '',
  position: '',
  process: {
    id: 0,
    type: '',
    description: '',
    schedule: '',
  },
  specificPosition: null,
};
