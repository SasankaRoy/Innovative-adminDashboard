import { useState, useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';
import {
  createGallery,
  updateGallery,
  deleteGallery,
} from '../../api-calls/apicalls';
import { Link, useNavigate } from 'react-router-dom';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddBgImg from '../../images/AddIcon2.jpg';

function GalleryTable({ galleryAllData }: any) {
  const [galleries, setGalleries] = useState<any[]>(galleryAllData);
  const [image, setImage] = useState();
  const [dbImage, setDbImage] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [update, setUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [galleryId, setGalleryId] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const [previewImg, setPreviewImg] = useState();

  const previewImage = (imgData: any) => {
    const fileData = new FileReader();
    if (imgData) {
      fileData.readAsDataURL(imgData);
    }

    fileData.onload = (result) => {
      if (result) {
        setPreviewImg(result.target.result);
      }
    };
  };

  const navigate = useNavigate();

  const handleClose = () => {
    setShowModal(false);
  };

  const handleCreate = async () => {
    const galleryData = new FormData();

    galleryData.append('name', name);
    galleryData.append('gallery', image);
    galleryData.append('category', category);

    const createdData = await createGallery(galleryData);
    if (
      createdData?.success == 'no' &&
      createdData?.message === 'jwt expired'
    ) {
      return navigate('/');
    } else if (createdData?.success == 'no') {
      alert('system error try again leter');
    } else if (createdData?.success == 'yes') {
      alert('gallery template created successfully');
      window.location.reload();
    }
  };

  const handleUpdate = async () => {
    const galleryData = new FormData();

    galleryData.append('name', name);
    galleryData.append('gallery', image);
    galleryData.append('category', category);
    galleryData.append('gallery_id', galleryId);

    const updatedData = await updateGallery(galleryData);

    if (
      updatedData?.success == 'no' &&
      updatedData?.message === 'jwt expired'
    ) {
      return navigate('/');
    } else if (updatedData?.success == 'no') {
      alert('system error try again leter');
    } else if (updatedData?.success == 'yes') {
      alert('gallery template updated successfully');
      window.location.reload();
    }
  };

  const handleDelete = async (id: any) => {
    const deleteData = { gallery_id: id };
    const deletedData = await deleteGallery(deleteData);
    if (
      deletedData?.success == 'no' &&
      deletedData?.message === 'jwt expired'
    ) {
      return navigate('/');
    } else if (deletedData?.success == 'no') {
      alert('system error try again leter');
    } else if (deletedData?.success == 'yes') {
      // let tempTemplates = templates
      // tempTemplates.forEach((temp, ind) => {
      //   if (temp?._id == id) {
      //     tempTemplates.splice(ind, 1)
      //   }
      // })
      // setTemplates([...tempTemplates])

      alert('gallery template deleted successfully');
      window.location.reload();
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Gallery Files Editor
        </h2>

        <nav className="flex justify-center items-center  gap-5 w-[40%]">
          <button
            onClick={() => {
              setUpdate(false);
              setShowModal(true);
            }}
            className="flex w-[25%] justify-center rounded-lg bg-primary py-2 font-medium text-gray hover:bg-opacity-90"
          >
            <AddIcon />
            Create
          </button>
          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium" to="/dashboard">
                Dashboard /
              </Link>
            </li>
            <li className="font-medium text-primary">
              Gallery Files Management
            </li>
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
              {galleries.length !== 0 &&
                galleries.map((gallery, ind) => (
                  <tr key={ind}>
                    <td className="border-b border-[#eee] py-5 px-2 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {ind + 1}
                      </h5>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-2 pl-0 dark:border-strokedark xl:pl-3">
                      <h5 className="font-medium text-black dark:text-white">
                        {gallery?.name}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          onClick={() => {
                            setUpdate(true);
                            setName(gallery?.name);
                            setDbImage(gallery?.image);
                            setCategory(gallery?.category);
                            setGalleryId(gallery?._id);
                            setShowModal(true);
                          }}
                          className="h-9 w-9 flex justify-center items-center border border-[#3c50e0] rounded-md hover:text-[#3c50e0] transition-all duration-150 ease-in-out"
                        >
                          <EditRoundedIcon />
                        </button>
                        <button
                          className="h-9 w-9 flex justify-center items-center border border-[#dc3545] rounded-md hover:text-[#dc3545] transition-all duration-150 ease-in-out"
                          onClick={() => {
                            handleDelete(gallery?._id);
                          }}
                        >
                          <DeleteRoundedIcon />
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
              <h2 className="text-[800] text-3xl ">
                {update ? 'Update Gallery' : 'Add Gallery'}
              </h2>
              <button
                onClick={() => {
                  handleClose();
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
                  Category
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                />
              </div>
            </div>

            {dbImage && (
              <div className="mb-2">
                <label className="pb-1">Attached Image</label>
                <img
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  alt="attached image"
                  src={dbImage}
                />
              </div>
            )}

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  {update ? 'Change Image' : 'Image'}
                </label>
                {/* <input
                        type="file"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    placeholder="Image"
                                    onChange={(e: any) => {
                                        setImage(e.target.files[0]);
                                    }}
                                /> */}
                <div className="w-full relative h-44 rounded-xl shadow-md overflow-hidden">
                  <input
                    type="file"
                    ref={fileRef}
                    onChange={(e: any) => {
                      setImage(e.target.files[0]);
                      previewImage(e.target.files[0]);
                    }}
                    hidden
                  />

                  <img
                    src={previewImg ? previewImg : AddBgImg}
                    className="object-cover w-full h-full"
                    alt="choose-img-preview"
                  />
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-4 justify-center items-center">
                    <button
                      onClick={() => fileRef.current.click()}
                      className="h-10 w-10 shadow-lg bg-white flex justify-center items-center rounded-full"
                    >
                      <AddIcon className="text-black text-3xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center gap-4 my-4">
              <button
                onClick={() => {
                  handleClose();
                }}
                className="w-[15%] py-3 bg-[#dc3545] rounded-lg text-white hover:bg-opacity-90"
              >
                Cancel
              </button>
              <button
                className="flex w-[15%] justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                onClick={() => {
                  update ? handleUpdate() : handleCreate();
                }}
              >
                {update ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GalleryTable;
