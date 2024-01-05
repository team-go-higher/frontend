import {
  registerSimpleApplication,
  editSimpleApplication,
  updateApplicationProcess,
  createNewProcess,
} from 'apis/kanban';
import { IRegisterNewApplication } from 'types/interfaces/KanbanProcess';

class ModalModel {
  registerApplication(newApplication: IRegisterNewApplication) {
    return registerSimpleApplication(newApplication);
  }

  editApplication(editData: any) {
    const { editApplicationData, applicationId } = editData;
    return editSimpleApplication(editApplicationData, applicationId);
  }

  updateProcess(updateData: any) {
    const { applicationId, processId } = updateData;
    return updateApplicationProcess(applicationId, processId);
  }

  createNewProcess(applicationId: number, newProcessData: any) {
    return createNewProcess(applicationId, newProcessData);
  }
}

export default ModalModel;
