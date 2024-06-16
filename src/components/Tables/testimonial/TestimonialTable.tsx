import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import testi1 from "../../../assets/testi1.png";
import testi2 from "../../../assets/testi2.png";
import testi3 from "../../../assets/testi3.png";
import { createTestimonials, updateTestimonials } from '../../../api-calls/apicalls';


function TestimonialTable({allTestimonialsData}:any) {
  
  const [name, setName] = useState("");
  const [userNames, setUserNames] = useState<any[]>([]);
  const [images, setImages] = useState([testi1, testi2, testi3]);
  const [descriptions, setDescriptions] = useState<any[]>([]);
  const [professions, setProfessions] = useState<any[]>([]);
  const [update, setUpdate] = useState(false)
  const [showCreate, setShowCreate] = useState(false);
  const [testimonialId, setTestimonialId] = useState("")
  const [testimonials, setTestimonials] = useState<any[]>(allTestimonialsData)

  const navigate = useNavigate();

  const handleClose = () => {
      setShowCreate(false);

  };

  const handleCreate = async () => {

      let addData = []

      if (userNames.length == descriptions.length && descriptions.length == professions.length) {
          userNames.forEach((_, index) => {
              addData.push({
                  user_name: userNames[index],
                  description: descriptions[index],
                  profession: professions[index]

              })
          })
      }
      // console.log("rrr",addData)
      const createdData = await createTestimonials({ name: name, user_details: JSON.stringify(addData) })
      if (
          createdData?.success === "no" &&
          createdData?.message === "jwt expired"
      ) {
          return navigate("/");
      } else if (createdData?.success === "no") {
          alert("system error try again leter");
      } else if (createdData?.success === "yes") {
          alert("testimonial created successfully")
          handleClose()
          window.location.reload();
      }
  }

  const handleUpdate = async () => {

      let updateData = []

      if (userNames.length == descriptions.length && descriptions.length == professions.length) {
          userNames.forEach((_, index) => {
              updateData.push({
                  user_name: userNames[index],
                  description: descriptions[index],
                  profession: professions[index]

              })
          })
      }

      const updatedData = await updateTestimonials({ testimonial_id: testimonialId, name: name, user_details: JSON.stringify(updateData) })
      if (
          updatedData?.success === "no" &&
          updatedData?.message === "jwt expired"
      ) {
          return navigate("/");
      } else if (updatedData?.success === "no") {
          alert("system error try again leter");
      } else if (updatedData?.success === "yes") {
          alert("testimonial updated successfully")
          handleClose()
          window.location.reload();
      }
  }



  return (
   <>
         <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Testimonial Editor
        </h2>

        <nav className="flex justify-center items-center  gap-5 w-[40%]">

          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium" to="/dashboard">
                Dashboard /
              </Link>
            </li>
            <li className="font-medium text-primary">Testimonials Management</li>
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
              {testimonials.length !== 0 && testimonials.map((tm, ind) =>
              (
                <tr key={ind}>

                  <td className="border-b border-[#eee] py-5 px-2 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {ind}
                    </h5>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-2 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {tm?.name}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        onClick={() => {
                          setUpdate(true);
                          setTestimonialId(tm?._id)
                          setName(tm?.name)

                          let tempUserNames :any[]= []
                          let tempDescriptions:any[] = []
                          let tempProfessions :any[]= []

                          tm?.user_details?.forEach((ud:any) => {
                              tempUserNames.push(ud?.user_name)
                              tempDescriptions.push(ud?.description)
                              tempProfessions.push(ud?.profession)
                          })

                          setUserNames([...tempUserNames])
                          setDescriptions([...tempDescriptions])
                          setProfessions([...tempProfessions])

                          setShowCreate(true);
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


      {showCreate && (
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
            <hr className="mt-4 mb-2" />
            <div className="mt-4">
                            {
                                images.map((image, index) => (
                                    <>
                                        <div className="flex justify-center">
                                            <p className="text-bold">{`Change user number ${index + 1} information`}</p>
                                        </div>
                                        <div className="mt-4">
                                            <label
                                                className="text-lg text-black dark:text-white"
                                                
                                            >
                                                User Name
                                            </label>
                                            <input
                                                type="text"
                                                id="user-name "
                                                value={userNames[index]}
                                               className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                onChange={(e) => {
                                                    let tempUserNames = userNames
                                                    tempUserNames[index] = e.target.value
                                                    setUserNames([...tempUserNames])
                                                }}
                                            />

                                        </div>

                                        <div className="form-group mt-4">
                                            <label
                                               className="text-lg text-black dark:text-white"
                                                
                                            >
                                                Attached Testimonial Images <span className="fw-bold">(you can't change this image from here)</span>
                                            </label>
                                            <img
                                                alt="attached-testimonial-image"
                                               className="w-50 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                src={image}
                                                style={{
                                                    height: index !== 2 ? "25%" : "20%"
                                                }}
                                            />
                                        </div>

                                        <div className="form-group mt-4">
                                            <label
                                                className="text-lg text-black dark:text-white"
                                               
                                            >
                                                description
                                            </label>
                                            <textarea
                                             
                                                id="description"
                                                value={descriptions[index]}
                                              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                onChange={(e) => {
                                                    let tempDescriptions = descriptions
                                                    tempDescriptions[index] = e.target.value
                                                    setDescriptions([...tempDescriptions])
                                                }}
                                            />
                                        </div>

                                        <div className="form-group mt-4">
                                            <label
                                                className="text-lg text-black dark:text-white"
                                            >
                                                Profession
                                            </label>
                                            <input
                                                type="text"
                                                id="profession"
                                                value={professions[index]}
                                                 className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                onChange={(e) => {
                                                    let tempProfessions = professions
                                                    tempProfessions[index] = e.target.value
                                                    setProfessions([...tempProfessions])
                                                }}
                                            />
                                        </div>

                                        {index<images.length-1&&<hr className="mt-4 mb-2" />}
                                    </>
                                ))
                            }
                        </div>





            <div className="flex justify-end items-center gap-4 mt-4">
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

export default TestimonialTable