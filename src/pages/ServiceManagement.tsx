import { ServicesTable } from '../components/Tables/ServicesTable/ServicesTable';
import DefaultLayout from '../layout/DefaultLayout';

export const ServiceManagement = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <ServicesTable pagetitle="Service" pageName="Service Management" />
      </div>
    </DefaultLayout>
  );
};
