import { useState } from 'react';
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from 'react-router-dom';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { createCategories, deleteCategories, updateCategories } from '../../api-calls/apicalls';

function CategoryTable({ allCategoryData }: any) {
    const [categoryName, setCategoryName] = useState("");
    const [categoryImage, setCategoryImage] = useState("");
    const [categoryDbImage, setCategoryDbImage] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState<any[]>(allCategoryData);
    const [update, setUpdate] = useState(false)
    const [showCreate, setShowCreate] = useState(false);

    const navigate = useNavigate();

    const handleClose = () => {
        // setShowCreate(false);
        window.location.reload()

    };

    const handleCreate = async () => {
        let addData = new FormData()
        addData.append("name", categoryName)
        addData.append("category", categoryImage)

        const createdData = await createCategories(addData)

        if (
            createdData?.success == "no" &&
            createdData?.message === "jwt expired"
        ) {
            return navigate("/");
        } else if (createdData?.success == "no") {
            alert("system error try again leter");
        } else if (createdData?.success == "yes") {
            alert("category created successfully")
            window.location.reload();
        }

    }

    const handleUpdate = async () => {
        // let fileTemplatesIds = []
        // let mcqTemplatesIds = []
        // let quizTemplatesIds = []

        // selectedFileTemplates.forEach((file) => {
        //     fileTemplatesIds.push(file?._id)
        // })

        // selectedMcqTemplates.forEach((mcq) => {
        //     mcqTemplatesIds.push(mcq?._id)
        // })

        // selectedQuizTemplates.forEach((quiz) => {
        //     quizTemplatesIds.push(quiz?._id)
        // })


        // const updateData = {
        //     name: categoryName,
        //     category_id:categoryId,
        //     image:image
        // file_templates: fileTemplatesIds,
        // mcq_templates: mcqTemplatesIds,
        // quiz_templates: quizTemplatesIds
        // }

        let updateData = new FormData()
        updateData.append("name", categoryName)
        updateData.append("category_id", categoryId)
        updateData.append("category", categoryImage)

        const updatedData = await updateCategories(updateData)

        if (
            updatedData?.success == "no" &&
            updatedData?.message === "jwt expired"
        ) {
            return navigate("/");
        } else if (updatedData?.success == "no") {
            alert("system error try again leter");
        } else if (updatedData?.success == "yes") {
            alert("category updated successfully")
            window.location.reload();
        }
    }

    const handleDelete = async (id: any) => {
        const deleteData = { cat_id: id }
        const deletedData = await deleteCategories(deleteData)
        if (
            deletedData?.success == "no" &&
            deletedData?.message === "jwt expired"
        ) {
            return navigate("/");
        } else if (deletedData?.success == "no") {
            alert("system error try again leter");
        } else if (deletedData?.success == "yes") {
            alert("category deleted successfully")
            window.location.reload();
        }
    }

    return (
        <>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    Category Editor
                </h2>

                <nav className="flex justify-center items-center  gap-5 w-[40%]">
                    <button onClick={() => {
                        setUpdate(false)
                        setShowCreate(true)
                    }} className="flex w-[25%] justify-center rounded-lg bg-primary py-2 font-medium text-gray hover:bg-opacity-90">
                        <AddIcon />
                        Create
                    </button>
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link className="font-medium" to="/dashboard">
                                Dashboard /
                            </Link>
                        </li>
                        <li className="font-medium text-primary">Category Management</li>
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
                            {categories.length !== 0 && categories.map((cat, ind) =>
                            (
                                <tr key={ind}>

                                    <td className="border-b border-[#eee] py-5 px-2 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {ind}
                                        </h5>
                                    </td>

                                    <td className="border-b border-[#eee] py-5 px-2 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {cat?.name}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <button
                                                onClick={() => {
                                                    setUpdate(true);
                                                    setCategoryName(cat?.name)
                                                    setCategoryId(cat?._id)
                                                    setCategoryDbImage(cat?.image)
                                                    setShowCreate(true);
                                                }}
                                                className="h-9 w-9 flex justify-center items-center border border-[#3c50e0] rounded-md hover:text-[#3c50e0] transition-all duration-150 ease-in-out"
                                            >
                                                <EditRoundedIcon />
                                            </button>
                                            <button className="h-9 w-9 flex justify-center items-center border border-[#dc3545] rounded-md hover:text-[#dc3545] transition-all duration-150 ease-in-out" onClick={() => {
                                                handleDelete(cat?._id)
                                            }}>
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

            {showCreate && (
                <div className="fixed top-0 left-0 EditModelZindex flex justify-center items-center w-full h-full backdrop-blur-md">
                    <div className="shadow-md p-4 w-[50%] rounded-md dark:border-strokedark dark:bg-boxdark border-stroke bg-white overflow-y-auto max-h-full">
                        <div className="flex justify-between items-center">
                            <h2 className="text-[800] text-3xl ">{update ? "Update Category" : "Add Category"}</h2>
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
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    placeholder='category name'
                                    id="category-name "
                                    value={categoryName}

                                    onChange={(e) => {
                                        setCategoryName(e.target.value)
                                    }}
                                />
                            </div>
                        </div>

                        {
                            categoryDbImage && (
                                <div className="mt-4">
                                    <div className="flex flex-col justify-start items-start gap-3">
                                        <label className="text-lg text-black dark:text-white">

                                            Attached Category Image
                                        </label>
                                        <img
                                            id="category-db-image"
                                            alt="category-db-image "

                                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            src={categoryDbImage}
                                        />

                                    </div>
                                </div>
                            )
                        }

                        <div className="mt-3">
                            <div className="flex flex-col justify-start items-start gap-3">
                                <label className="text-lg text-black dark:text-white">
                                    {update ? "Change Category Image" : "Category Image"}                </label>
                                <input
                                    type="file"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    placeholder='category image'
                                    id="category-image"
                                    onChange={(e:any) => {
                                        setCategoryImage(e.target.files[0])
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

export default CategoryTable