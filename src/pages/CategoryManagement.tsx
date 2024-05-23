import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableThree from '../components/Tables/TableThree';
import DefaultLayout from '../layout/DefaultLayout';

export const CategoryManagement = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Category Management" />

      <div className="flex flex-col gap-10">
        <TableThree pagetitle="Category" />
      </div>
    </DefaultLayout>
  );
};
