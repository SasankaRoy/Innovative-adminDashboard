import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { createOurVision, updateOurVision } from '../../../api-calls/apicalls';


function OurVisionTable({ ourVisionData }: any) {

  const [ovs, setOvs] = useState<any[]>(ourVisionData);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [update, setUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ovId, setOvId] = useState("");


  const navigate = useNavigate();

  const handleClose = () => {
    setShowModal(false);
    window.location.reload()
  };

  const handleCreate = async () => {
    const ovData = {
      name: name,
      title: title,
      description: description,
    };
    const createdData = await createOurVision(ovData);

    if (
      createdData?.success == "no" &&
      createdData?.message === "jwt expired"
    ) {
      return navigate("/");
    } else if (createdData?.success == "no") {
      alert("system error try again leter");
    } else if (createdData?.success == "yes") {
      alert("our Vision created successfully")
      window.location.reload();
    }
  };

  const handleUpdate = async () => {
    const ovData = {
      ov_id: ovId,
      name: name,
      title: title,
      description: description,
    };

    const updatedData = await updateOurVision(ovData);

    if (
      updatedData?.success == "no" &&
      updatedData?.message === "jwt expired"
    ) {
      return navigate("/");
    } else if (updatedData?.success == "no") {
      alert("system error try again leter");
    } else if (updatedData?.success == "yes") {
      alert("our Vision updated successfully")
      window.location.reload();
    }
  };


  return (
    <>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Our Vision Editor
        </h2>

        <nav className="flex justify-center items-center  gap-5 w-[40%]">

          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium" to="/dashboard">
                Dashboard /
              </Link>
            </li>
            <li className="font-medium text-primary">Our Vision Management</li>
          </ol>
        </nav>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-bold text-black dark:text-white xl:pl-11">
                  Serial No.
                </th>
                <th className="min-w-[120px] py-4 px-4 font-bold text-black dark:text-white">
                  Name
                </th>
                <th className="py-4 px-4 font-bold text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {ovs.length !== 0 && ovs.map((ov, ind) =>
              (
                <tr key={ind}>

                  <td className="border-b border-[#eee] py-5 px-2 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {ind}
                    </h5>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-2 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {ov?.name}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        onClick={() => {
                          setUpdate(true);
                          setName(ov?.name);
                          setDescription(ov?.description);
                          setTitle(ov?.title)
                          setShowModal(true);
                          setOvId(ov?._id);
                        }}
                        className="h-9 w-9 flex justify-center items-center border border-[#3c50e0] rounded-md hover:text-[#3c50e0] transition-all duration-150 ease-in-out"
                      >
                        <EditRoundedIcon />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {showModal && (
        <div className="fixed top-0 left-0 EditModelZindex flex justify-center items-center w-full h-full backdrop-blur-md">
          <div className="shadow-md p-4 w-[50%] rounded-md dark:border-strokedark dark:bg-boxdark border-stroke bg-white overflow-y-auto max-h-full">
            <div className="flex justify-between items-center">
              <h2 className="text-[800] text-3xl ">{update ? "Update AboutUs" : "Add AboutUs"}</h2>
              <button
                onClick={() => {
                  handleClose()
                }}
                className="hover:text-[#dc3545] transition-all duration-200 ease-in-out"
              >
                <CloseRoundedIcon className="text-6xl" />
              </button>
            </div>

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  Description
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
            </div>






            <div className="flex justify-end items-center gap-4 my-4">
              <button onClick={() => { handleClose() }} className="w-[15%] py-3 bg-[#dc3545] rounded-lg text-white hover:bg-opacity-90">
                Cancel
              </button>
              <button className="flex w-[15%] justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90"

                onClick={() => { update ? handleUpdate() : handleCreate() }}
              >
                {update ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>

      )}

    </>
  )
}

export default OurVisionTable