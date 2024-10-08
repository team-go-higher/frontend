import ApplicationLayout from 'components/application/ApplicationLayout';
import useFetchApplication from 'hooks/application/useFetchApplication';
import { useParams } from 'react-router-dom';
import { removeProcessIds } from 'utils/removeIds';

const ApplicationEdit = () => {
  const applicationId = Number(useParams().applicationId);
  const { data: application } = useFetchApplication(applicationId);
  const applicationData = application ? removeProcessIds(application) : {};

  return (
    <ApplicationLayout
      applicationType='edit'
      applicationId={applicationId}
      data={applicationData}
    />
  );
};

export default ApplicationEdit;
