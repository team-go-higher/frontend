import ApplicationLayout from 'components/application/ApplicationLayout';
import useFetchApplication from 'hooks/application/useFetchApplication';
import { useParams } from 'react-router-dom';

const ApplicationDetail = () => {
  const applicationId = Number(useParams().applicationId);
  const { data: applicationData } = useFetchApplication(applicationId);

  return (
    <ApplicationLayout
      applicationType='default'
      applicationId={applicationId}
      data={applicationData?.data}
    />
  );
};

export default ApplicationDetail;
