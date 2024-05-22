import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableThree from '../components/Tables/TableThree';
import DefaultLayout from '../layout/DefaultLayout';

const GalleryManagement = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gallery Management" />

      <div className="flex flex-col gap-10">
        <TableThree pagetitle="Gallery" />
      </div>
    </DefaultLayout>
  );
};

export default GalleryManagement;
