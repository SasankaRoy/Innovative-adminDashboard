import { useEffect, useState } from 'react';


import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Avatar } from '@mui/material';
import { updateUsers } from '../../api-calls/apicalls';
import { useNavigate } from 'react-router-dom';

const TableOne = ({ title, userList }: any) => {
  const [isEditShow, setIsEditShow] = useState({
    state: false,
    userDeltails: '',
  });
  

  return (
    <>
      <div className="rounded-sm relative border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          {title}
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Serial No.
              </h5>
            </div>

            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Name
              </h5>
            </div>

            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Actions
              </h5>
            </div>
          </div>

          {userList.map((user: any, key: any) => (
            <>
              {user?.email !== 'admin@gmail.com' && (
                <div
                  className={`grid grid-cols-3 sm:grid-cols-3 ${
                    key === userList.length - 1
                      ? ''
                      : 'border-b border-stroke dark:border-strokedark'
                  }`}
                  key={key}
                >
                  <div className="flex items-center justify-start p-2.5 xl:p-5">
                    <p className="text-black  dark:text-white">{key}</p>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 xl:p-5">
                    <div className="flex-shrink-0">
                      <Avatar src={user?.logo} />
                    </div>
                    <p className="hidden text-black dark:text-white sm:block">
                      {user.first_name} {user?.last_name}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2.5 p-2.5  xl:p-5">
                    <button
                      onClick={() =>
                        setIsEditShow({ state: true, userDeltails: user })
                      }
                      className="h-9 w-9 flex justify-center items-center border-2 border-[#3c50e0] rounded-md hover:text-[#3c50e0] transition-all duration-150 ease-in-out"
                    >
                      <EditRoundedIcon />
                    </button>
                    <button className="h-9 w-9 flex justify-center items-center border-2 border-[#dc3545] rounded-md hover:text-[#dc3545] transition-all duration-150 ease-in-out">
                      <DeleteRoundedIcon />
                    </button>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
      {isEditShow.state && (
        <EditModel
          setIsEditShow={setIsEditShow}
          userDeltails={isEditShow.userDeltails}
        />
      )}
    </>
  );
};

export default TableOne;

const EditModel = ({ setIsEditShow, userDeltails }: any) => {
  const [updateUserDeltails, setUpdateUserDeltails] = useState({
    first_name: userDeltails?.first_name,
    last_name: userDeltails?.last_name,
    phone_no: userDeltails?.phone_no,
    email: userDeltails?.email,
    role: userDeltails?.role,
  });
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const navigate = useNavigate();

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };
  const handleOnChangeUpdate = (e: any) => {
    const { name, value } = e.target;
    console.log({ name, value }, userDeltails.role);
    setUpdateUserDeltails({
      ...updateUserDeltails,
      [name]: value,
    });
  };

  const updateUser = async () => {
    try {
      const saveUpdateUserDeltails = await updateUsers({
        ...updateUserDeltails,
        user_id: userDeltails?._id,
      });
      const checkUserSession =
        saveUpdateUserDeltails?.success == 'no' &&
        saveUpdateUserDeltails?.message === 'jwt expired';
      const successStatus = saveUpdateUserDeltails?.success === 'no';

      if (checkUserSession) {
        alert('Oops ! Session Expired..');
        navigate('/');
        return;
      }
      if (successStatus) {
        alert('Oops! update failed try again later');
        return;
      }

      alert('Update successfull');
      setIsEditShow({
        state: false,
        userDeltails: '',
      });

      console.log(saveUpdateUserDeltails);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  };
  return (
    <>
      <div className="fixed top-0 left-0 EditModelZindex flex justify-center items-center w-full h-full backdrop-blur-md">
        <div className="shadow-md p-4 w-[90%] xl:w-[50%] max-h-[85%] rounded-md dark:border-strokedark dark:bg-boxdark border-stroke bg-white">
          <div className="flex justify-between items-center">
            <h2 className="text-[800] text-3xl ">User update</h2>
            <button
              onClick={() => setIsEditShow({ state: false, userDeltails: '' })}
              className="hover:text-[#dc3545] transition-all duration-200 ease-in-out"
            >
              <CloseRoundedIcon className="text-6xl" />
            </button>
          </div>

          <div className="mt-4">
            <div className="flex flex-col justify-start items-start gap-1">
              <label className=" block text-black dark:text-white">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                placeholder="Enter First Name ..."
                value={updateUserDeltails.first_name}
                onChange={handleOnChangeUpdate}
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1">
              <label className=" block text-black dark:text-white">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                placeholder="Enter Last Name ..."
                value={updateUserDeltails.last_name}
                onChange={handleOnChangeUpdate}
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1">
              <label className=" block text-black dark:text-white">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                placeholder="Enter Phone Number ..."
                value={updateUserDeltails.phone_no}
                name="phone_no"
                onChange={handleOnChangeUpdate}
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1">
              <label className=" block text-black dark:text-white">
                Email ID
              </label>
              <input
                type="email"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                placeholder="Enter Email ID ..."
                value={updateUserDeltails.email}
                name="email"
                onChange={handleOnChangeUpdate}
              />
            </div>

            <div className="flex flex-col justify-start items-start gap-1">
              <label className=" block text-black dark:text-white">
                User Role
              </label>

              <select
                value={updateUserDeltails.role}
                name="role"
                onChange={(e) => {
                  handleOnChangeUpdate(e);
                  changeTextColor();
                  setIsOptionSelected(true);
                }}
                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                  isOptionSelected ? 'text-black dark:text-white' : ''
                }`}
              >
                <option
                  defaultValue="user 1"
                  className="text-body dark:text-bodydark"
                >
                  User 1
                </option>
                <option value="user 2" className="text-body dark:text-bodydark">
                  User 2
                </option>
                <option value="user 3" className="text-body dark:text-bodydark">
                  User 3
                </option>
              </select>
            </div>
          </div>
          <div className="flex justify-end items-center gap-3 mt-5 ">
            <button className="w-[15%] py-3 bg-[#dc3545] rounded-lg text-white hover:bg-opacity-90">
              Cancel
            </button>
            <button
              onClick={updateUser}
              className="flex w-[15%] justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
