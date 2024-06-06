
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import UserTable from '../components/Tables/UserTable';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../api-calls/apicalls';
// import TableTwo from '../components/Tables/TableTwo';
// import TableThree from '../components/Tables/TableThree';

const UserManagement = () => {
  const [users, setUsers] = useState<any[]|undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    const fetcher = async () => {
      let usersData = await fetchUsers();
      // console.log("27", usersData)
      if (usersData?.message === "jwt expired") {
        return navigate("/");
      } else {
        setUsers([...usersData]);
      }
    };

    fetcher();

  }, [])

  if(users)
    {
  return (
    <DefaultLayout>
      
      <div className="flex flex-col gap-10">
        <UserTable title='Users' userAllData={users} />
      </div>
    </DefaultLayout>
  );
}
};
export default UserManagement;
