import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableThree from '../components/Tables/McqTable';
import DefaultLayout from '../layout/DefaultLayout';

const ProductManagement = () => {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Product Management" />
        <div className="flex flex-col gap-10">
          <TableThree pagetitle="Product" />
        </div>
      </DefaultLayout>
    </>
  );
};

export default ProductManagement;
