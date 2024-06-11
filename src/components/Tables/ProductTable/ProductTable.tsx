import { useEffect, useRef, useState } from 'react';
import AddIcon from "@mui/icons-material/Add";
import { createProducts, fetchCategories, deleteProducts, fetchMcqTemplates, fetchQuizTemplates, fetchFileTemplates, updateProducts } from "../../../api-calls/apicalls";
import { Link, useNavigate } from 'react-router-dom';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';


function ProductTable({ allProductData, allCategories, allFiles, allQuizzes, allMcqs }: any) {
    const [productName, setProductName] = useState("");
    const [productImage, setProductImage] = useState("");
    const [dbProductImage, setDbProductImage] = useState("");
    const [realPrice, setRealPrice] = useState<any>();
    const [discountedPrice, setDiscountedPrice] = useState<any>(0);
    const [star, setStar] = useState<any>(0);
    const [update, setUpdate] = useState(false)
    const [showCreate, setShowCreate] = useState(false);
    const [showProductCatDropdown, setShowProductCatDropdown] = useState(false);
    const [categories, setCategories] = useState<any>(allCategories);
    const [selectedCat, setSelectedCat] = useState<any>([]);
    const [products, setProducts] = useState<any[]>(allProductData);
    const [productId, setProductId] = useState("")

    const [quizTemplates, setQuizTemplates] = useState<any>(allQuizzes);
    const [selectedQuizTemplates, setSelectedQuizTemplates] = useState<any>([]);


    const [mcqTemplates, setMcqTemplates] = useState<any>(allMcqs);
    const [selectedMcqTemplates, setSelectedMcqTemplates] = useState<any>([]);

    const [fileTemplates, setFileTemplates] = useState<any>(allFiles);
    const [selectedFileTemplates, setSelectedFileTemplates] = useState<any>([]);


    const [showFileTempDropdown, setShowFileTempDropdown] = useState(false);
    const [showQuizTempDropdown, setShowQuizTempDropdown] = useState(false);
    const [showMcqTempDropdown, setShowMcqTempDropdown] = useState(false);


    const fileTempInputRef = useRef(null);
    const quizTempInputRef = useRef(null);
    const mcqTempInputRef = useRef(null);

    const navigate = useNavigate();

    const handleFileTempInputClick = () => {
        setShowFileTempDropdown(!showFileTempDropdown);
    };

    const handleQuizTempInputClick = () => {
        setShowQuizTempDropdown(!showQuizTempDropdown);
    };

    const handleMcqTempInputClick = () => {
        setShowMcqTempDropdown(!showMcqTempDropdown);
    };

    const productCatInputRef = useRef(null);

    const handleInputClick = () => {
        setShowProductCatDropdown(!showProductCatDropdown);
    };

    const handleOutsideClick = (e: any) => {
        if (productCatInputRef.current && !productCatInputRef.current.contains(e.target)) {
            setShowProductCatDropdown(false);
        }
        if (fileTempInputRef.current && !fileTempInputRef.current.contains(e.target)) {
            setShowFileTempDropdown(false);
        }

        if (quizTempInputRef.current && !quizTempInputRef.current.contains(e.target)) {
            setShowQuizTempDropdown(false)
        }

        if (mcqTempInputRef.current && !mcqTempInputRef.current.contains(e.target)) {
            setShowMcqTempDropdown(false)
        }
    };

    const handleClose = () => {
        
        window.location.reload()

    };

    const handleCreate = async () => {
        let fileTemplatesIds: any[] = []
        let mcqTemplatesIds: any[] = []
        let quizTemplatesIds: any[] = []

        selectedFileTemplates.forEach((file: any) => {
            fileTemplatesIds.push(file?._id)
        })

        selectedMcqTemplates.forEach((mcq: any) => {
            mcqTemplatesIds.push(mcq?._id)
        })

        selectedQuizTemplates.forEach((quiz: any) => {
            quizTemplatesIds.push(quiz?._id)
        })
        const addData = new FormData()
        addData.append("name", productName)
        addData.append("product", productImage)
        addData.append("category", selectedCat?._id)
        addData.append("real_price", realPrice)
        addData.append("discounted_price", discountedPrice)
        addData.append("star", star)

        addData.append("file_templates", JSON.stringify(fileTemplatesIds))
        addData.append("mcq_templates", JSON.stringify(mcqTemplatesIds))
        addData.append("quiz_templates", JSON.stringify(quizTemplatesIds))

        const createdData = await createProducts(addData)
        if (
            createdData?.success === "no" &&
            createdData?.message === "jwt expired"
        ) {
            return navigate("/");
        } else if (createdData?.success === "no") {
            alert("system error try again leter");
        } else if (createdData?.success === "yes") {
            alert("products created successfully")
            handleClose()
            window.location.reload();
        }
    }

    const handleUpdate = async () => {
        let fileTemplatesIds: any = []
        let mcqTemplatesIds: any = []
        let quizTemplatesIds: any = []

        selectedFileTemplates.forEach((file: any) => {
            fileTemplatesIds.push(file?._id)
        })

        selectedMcqTemplates.forEach((mcq: any) => {
            mcqTemplatesIds.push(mcq?._id)
        })

        selectedQuizTemplates.forEach((quiz: any) => {
            quizTemplatesIds.push(quiz?._id)
        })

        const updateData = new FormData()
        updateData.append("product_id", productId)
        updateData.append("name", productName)
        updateData.append("product", productImage)
        updateData.append("category", selectedCat?._id)
        updateData.append("real_price", realPrice)
        updateData.append("discounted_price", discountedPrice)
        updateData.append("star", star.toString())

        updateData.append("file_templates", JSON.stringify(fileTemplatesIds))
        updateData.append("mcq_templates", JSON.stringify(mcqTemplatesIds))
        updateData.append("quiz_templates", JSON.stringify(quizTemplatesIds))

        const updatedData: any = await updateProducts(updateData)
        if (
            updatedData?.success == "no" &&
            updatedData?.message === "jwt expired"
        ) {
            return navigate("/");
        } else if (updatedData?.success == "no") {
            alert("system error try again leter");
        } else if (updatedData?.success == "yes") {
            alert("product updated successfully")
            window.location.reload();
        }
    }

    const handleDelete = async (id: any) => {
        // console.log("dell")
        const deleteData = { product_id: id }
        const deletedData = await deleteProducts(deleteData)
        if (
            deletedData?.success == "no" &&
            deletedData?.message === "jwt expired"
        ) {
            return navigate("/");
        } else if (deletedData?.success == "no") {
            alert("system error try again leter");
        } else if (deletedData?.success == "yes") {
            // let tempTemplates = templates
            // tempTemplates.forEach((temp, ind) => {
            //   if (temp?._id == id) {
            //     tempTemplates.splice(ind, 1)
            //   }
            // })
            // setTemplates([...tempTemplates])

            alert("product deleted successfully")
            window.location.reload();
        }
    }

    useEffect(() => {
        if (update == true && showCreate == true) {

            document.getElementById("product-category").value = selectedCat?.name
        }
    }, [showCreate])


    return (
        <>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    Product Editor
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
                        <li className="font-medium text-primary">Product Management</li>
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
                                    Product Name
                                </th>
                                <th className="py-4 px-4 font-bold text-black dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length !== 0 && products.map((prod, ind) =>
                            (
                                <tr key={ind}>

                                    <td className="border-b border-[#eee] py-5 px-2 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {ind}
                                        </h5>
                                    </td>

                                    <td className="border-b border-[#eee] py-5 px-2 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {prod?.name}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <button
                                                onClick={() => {
                                                    setUpdate(true);
                                                    setProductId(prod?._id)
                                                    setProductName(prod?.name)
                                                    setDbProductImage(prod?.image)
                                                    setSelectedCat(prod?.category)
                                                    setRealPrice(prod?.real_price)
                                                    setDiscountedPrice(prod?.discounted_price)
                                                    setStar(prod?.star)
                                                    setSelectedFileTemplates(prod?.file_templates)
                                                    setSelectedMcqTemplates(prod?.mcq_templates)
                                                    setSelectedQuizTemplates(prod?.quiz_templates)
                                                    setShowCreate(true);
                                                }}
                                                className="h-9 w-9 flex justify-center items-center border border-[#3c50e0] rounded-md hover:text-[#3c50e0] transition-all duration-150 ease-in-out"
                                            >
                                                <EditRoundedIcon />
                                            </button>
                                            <button className="h-9 w-9 flex justify-center items-center border border-[#dc3545] rounded-md hover:text-[#dc3545] transition-all duration-150 ease-in-out" onClick={() => {
                                                handleDelete(prod?._id)
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
                            <h2 className="text-[800] text-3xl ">{update ? "Update Products" : "Add Products"}</h2>
                            <button
                                onClick={() => {
                                    handleClose()
                                }}
                                className="hover:text-[#dc3545] transition-all duration-200 ease-in-out"
                            >
                                <CloseRoundedIcon className="text-6xl" />
                            </button>
                        </div>



                        <div className="mt-4">
                            <div className="flex flex-col justify-start items-start gap-3">
                                <label className="text-lg text-black dark:text-white">
                                    Product Name
                                </label>
                            </div>

                            <input
                                type="text"
                                id="product-name "
                                value={productName}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                onChange={(e) => {
                                    setProductName(e.target.value)
                                }}
                            />

                        </div>

                        <div className=" mt-4">
                            <div className="flex flex-col justify-start items-start gap-3">
                                <label
                                    className="text-lg text-black dark:text-white"


                                >
                                    select product category
                                </label>
                            </div>
                            <div className="dropdown" ref={productCatInputRef}>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    placeholder="Select Product Category"
                                    onClick={handleInputClick}
                                    id="product-category"

                                />
                                {showProductCatDropdown && (
                                    <ul className="dropdown-menu show w-100" aria-labelledby="dropdownMenuButton">
                                        {categories && categories.map((cat: any, _: any) => (
                                            <li><a className="dropdown-item" href="#" onClick={(e) => {
                                                setSelectedCat(cat)
                                                document.getElementById("product-category").value = cat?.name
                                                setShowProductCatDropdown(false)
                                            }}>{cat?.name}</a></li>
                                        ))

                                        }
                                    </ul>
                                )}

                            </div>
                        </div>

                        {
                            dbProductImage && (
                                <div className=" mt-4">
                                    <div className="flex flex-col justify-start items-start gap-3">
                                        <label
                                            className="text-lg text-black dark:text-white"

                                        >
                                            Attached Product Image
                                        </label>
                                    </div>
                                    <img

                                        alt="db-product-image"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        src={dbProductImage}
                                    />

                                </div>
                            )
                        }

                        <div className="mt-4">
                            <div className="flex flex-col justify-start items-start gap-3">
                                <label
                                    className="text-lg text-black dark:text-white"
                                >
                                    {update ? "Change Product Image" : "Product Image"}
                                </label>
                            </div>
                            <input
                                type="file"
                                id="product-image"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                onChange={(e: any) => {
                                    setProductImage(e.target.files[0])
                                }}
                            />

                        </div>

                        <div className="mt-4">
                            <div className="flex flex-col justify-start items-start gap-3">
                                <label
                                    className="text-lg text-black dark:text-white"

                                >
                                    select file templates
                                </label>
                            </div>
                            <div className="dropdown" ref={fileTempInputRef}>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    placeholder="Select File Templates"
                                    onClick={handleFileTempInputClick}
                                    readOnly
                                />
                                {showFileTempDropdown && (
                                    <ul className="dropdown-menu show w-100" aria-labelledby="dropdownMenuButton">
                                        {fileTemplates && fileTemplates.map((file: any, _: any) => (
                                            <li><a className="dropdown-item" href="#" onClick={(e: any) => {

                                                let tempSelectedFileTemp: any = selectedFileTemplates
                                                for (let temp of tempSelectedFileTemp) {
                                                    if (temp?.template_name == file?.template_name) {
                                                        alert("already selected")
                                                        setShowFileTempDropdown(false)
                                                        return;
                                                    }
                                                }
                                                tempSelectedFileTemp.push(file)
                                                setSelectedFileTemplates([...tempSelectedFileTemp])
                                                setShowFileTempDropdown(false)
                                            }}>{file?.template_name}</a></li>
                                        ))

                                        }

                                    </ul>
                                )}

                            </div>
                        </div>

                        <div className="mt-4">
                            {selectedFileTemplates && selectedFileTemplates.map((file: any, ind: any) => (
                                <div className="ms-3" style={{ width: "15%" }}>
                                    <div className="flex justify-end"><CloseRounded style={{ cursor: "pointer", color: "red" }} onClick={() => {
                                        let tempSelectedFileTemp = selectedFileTemplates
                                        tempSelectedFileTemp.splice(ind, 1)
                                        setSelectedFileTemplates([...tempSelectedFileTemp])
                                    }} /></div>
                                    <div className="flex justify-center">
                                        {file?.template_name}
                                    </div>

                                </div>
                            ))}
                        </div>

                        <div className="mt-4">
                            <div className="flex flex-col justify-start items-start gap-3">
                                <label className="text-lg text-black dark:text-white">
                                    select quiz templates
                                </label>
                            </div>
                            <div className="dropdown" ref={quizTempInputRef}>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    placeholder="Select Quiz Templates"
                                    onClick={handleQuizTempInputClick}
                                    readOnly
                                />
                                {showQuizTempDropdown && (
                                    <ul className="dropdown-menu show w-100" aria-labelledby="dropdownMenuButton">
                                        {quizTemplates && quizTemplates.map((quiz: any, _: any) => (
                                            <li><a className="dropdown-item" href="#" onClick={(e: any) => {

                                                let tempSelectedQuizTemp: any = selectedQuizTemplates


                                                for (let temp of tempSelectedQuizTemp) {
                                                    if (temp?.paper_name == quiz?.paper_name) {

                                                        alert("already selected")
                                                        setShowQuizTempDropdown(false)
                                                        return;
                                                    }
                                                }

                                                tempSelectedQuizTemp.push(quiz)
                                                setSelectedQuizTemplates([...tempSelectedQuizTemp])
                                                setShowQuizTempDropdown(false)
                                            }}>{quiz?.paper_name}</a></li>
                                        ))

                                        }

                                    </ul>
                                )}

                            </div>
                        </div>

                        <div className="flex mt-3">
                            {selectedQuizTemplates && selectedQuizTemplates.map((quiz: any, ind: number) => (
                                <div className="ms-3" style={{ width: "15%" }}>
                                    <div className="flex justify-end"><CloseRounded style={{ cursor: "pointer", color: "red" }} onClick={() => {
                                        let tempSelectedQuizTemp = selectedQuizTemplates
                                        tempSelectedQuizTemp.splice(ind, 1)
                                        setSelectedQuizTemplates([...tempSelectedQuizTemp])
                                    }} /></div>
                                    <div className="flex justify-center">
                                        {quiz?.paper_name}
                                    </div>

                                </div>
                            ))}

                        </div>

                        <div className="mt-4">
                            <div className="flex flex-col justify-start items-start gap-3">
                                <label
                                    className="text-lg text-black dark:text-white"
                                >
                                    select mcq templates
                                </label>
                            </div>
                            <div className="dropdown" ref={mcqTempInputRef}>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    placeholder="Select Mcq Templates"
                                    onClick={handleMcqTempInputClick}
                                    readOnly
                                />
                                {showMcqTempDropdown && (
                                    <ul className="dropdown-menu show w-100" aria-labelledby="dropdownMenuButton">
                                        {mcqTemplates && mcqTemplates.map((mcq: any, _: any) => (
                                            <li><a className="dropdown-item" href="#" onClick={(e: any) => {

                                                let tempSelectedMcqTemp = selectedMcqTemplates


                                                for (let temp of tempSelectedMcqTemp) {
                                                    if (temp?.paper_name == mcq?.paper_name) {

                                                        alert("already selected")
                                                        setShowMcqTempDropdown(false)
                                                        return;
                                                    }
                                                }

                                                tempSelectedMcqTemp.push(mcq)
                                                setSelectedMcqTemplates([...tempSelectedMcqTemp])
                                                setShowMcqTempDropdown(false)
                                            }}>{mcq?.paper_name}</a></li>
                                        ))

                                        }

                                    </ul>
                                )}

                            </div>
                        </div>

                        <div className="flex mt-3">
                            {selectedMcqTemplates && selectedMcqTemplates.map((mcq: any, ind: any) => (
                                <div className="ms-3" style={{ width: "15%" }}>
                                    <div className="flex justify-end"><CloseRounded style={{ cursor: "pointer", color: "red" }} onClick={() => {
                                        let tempSelectedMcqTemp = selectedMcqTemplates
                                        tempSelectedMcqTemp.splice(ind, 1)
                                        setSelectedMcqTemplates([...tempSelectedMcqTemp])
                                    }} /></div>
                                    <div className="flex justify-center">
                                        {mcq?.paper_name}
                                    </div>

                                </div>
                            ))}

                        </div>

                        <div className="mt-4">
                            <div className="flex flex-col justify-start items-start gap-3">
                                <label
                                    className="text-lg text-black dark:text-white"
                                >
                                    Real Price
                                </label>
                            </div>
                            <input
                                type="number"
                                id="real_price"
                                value={realPrice}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                onChange={(e: any) => {
                                    if (e.target.value < 0) {
                                        alert("you can not set it below 0")
                                        return;
                                    }
                                    setRealPrice(e.target.value)
                                }}
                            />

                        </div>

                        <div className="mt-4">
                            <div className="flex flex-col justify-start items-start gap-3">
                                <label
                                    className="text-lg text-black dark:text-white"
                                   
                                >
                                    Discounted Price
                                </label>
                            </div>
                            <input
                                type="number"
                                id="discounted_price"
                                value={discountedPrice}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                onChange={(e: any) => {
                                    if (e.target.value < 0) {
                                        alert("you can not set it below 0")
                                        return;
                                    }
                                    setDiscountedPrice(e.target.value)
                                }}
                            />

                        </div>

                        <div className=" mt-4">
                            <div className="flex flex-col justify-start items-start gap-3">
                                <label
                                    className="text-lg text-black dark:text-white"
                                  
                                >
                                    Product Star
                                </label>
                            </div>
                            <input
                                type="number"
                                id="product-star"
                                value={star}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                onChange={(e: any) => {
                                    if (e.target.value < 0) {
                                        alert("you can not set it below 0")
                                        return;
                                    }
                                    setStar(e.target.value)
                                }}
                            />
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

export default ProductTable