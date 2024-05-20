
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
// import TableTwo from '../components/Tables/TableTwo';
// import TableThree from '../components/Tables/TableThree';

const UserManagement = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="User Management" />

      <div className="flex flex-col gap-10">
        <TableOne title='Users' />
        {/* <TableTwo />
        <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};
export default UserManagement;
