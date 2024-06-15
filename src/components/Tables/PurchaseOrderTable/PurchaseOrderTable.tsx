import React, { useEffect, useState } from 'react'
import { createPurchaseOrders, deletePurchaseOrders, updatePurchaseOrders } from '../../../api-calls/apicalls';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import html2pdf from 'html2pdf.js';
import emailjs from '@emailjs/browser';
import './PurchaseOrderTable.css';

function PurchaseOrderTable({ orderAllData }: any) {
  const [showCreate, setShowCreate] = useState(false);
  const [update, setUpdate] = useState(false)
  const [purchaseOrders, setPurchaseOrders] = useState<any[]>(orderAllData)
  const [pONo, setPoNo] = useState(0)
  const [companyName, setCompanyName] = useState("")
  const [companyLogo, setCompanyLogo] = useState("")
  const [dbCompanyLogo, setDbCompanyLogo] = useState("")
  const [companyAddress, setCompanyAddress] = useState("")
  const [companyPhoneNo, setCompanyPhoneNo] = useState("")
  const [companyEmail, setCompanyEmail] = useState("")
  const [date, setDate] = useState("")
  const [billingName, setBillingName] = useState("")
  const [billingPhoneNo, setBillingPhoneNo] = useState("")
  const [billingEmail, setBillingEmail] = useState("")
  const [billingAddress, setBillingAddress] = useState("")
  const [gratuity, setGratuity] = useState<any>(0)
  const [shippingCharges, setShippingCharges] = useState<any>(0)
  const [convenienceFee, setConvenienceFee] = useState<any>(0)
  const [deliveryCharges, setDeliveryCharges] = useState<any>(0)
  const [courierCharges, setCourierCharges] = useState<any>(0)
  const [deduction, setDeduction] = useState<any>(0)
  const [retention, setRetention] = useState<any>(0)
  const [roundOff, setRoundOff] = useState<any>(0)
  const [gst, setGst] = useState<any>(0)
  const [notes, setNotes] = useState("")
  const [termsAndCond, setTermsAndCond] = useState("")
  const [details, setDetails] = useState([])
  const [detailsCnt, setDetailsCnt] = useState<any[]>([])
  const [showPdf, setShowPdf] = useState(false)
  const [receiverEmail, setReceiverEmail] = useState("")
  const [receiverName, setReceiverName] = useState("")
  const [pOId, setPoId] = useState("")
  const [dbDetails, setDbDetails] = useState([])

  const navigate = useNavigate();

  useEffect(() => emailjs.init('7tEQNlrYa74GKcgSa'), []);

  const toDataUrl = async function (url: any) {
    //Convert to base64
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = () => {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    });
  };

  const handleGeneratePDF = async (imageUrl: any) => {
    let imageInput: any = document.getElementById('logo');

    let urlBase64 = await toDataUrl(imageUrl);

    imageInput.src = urlBase64
    const input: any = document.getElementById('content');
    // console.log("vvv", input.offsetHeight)
    html2pdf()
      .set({
        margin: [0, 0, 0, 0],
        filename: `Purchase-Order-${pONo}`,
        image: {
          type: 'jpeg',
          quality: 0.98,
        },
        html2canvas: {
          dpi: 192,
          letterRendering: true,
        },
        jsPDF: {
          orientation: 'portrait',
          unit: 'cm',
          format: [input.offsetHeight / 40, input.offsetWidth / 40],
        },
      })
      .from(input)
      .save()
      .toPdf()
      .output('datauristring')
      .then(async function (pdfAsString: any) {
        await handleSend(pdfAsString);
      });
  };

  const handleSend = async (pdf: any) => {
    // console.log("pdf", pdf)
    const serviceId = 'service_twmn4of';
    const customerTemplateId = 'template_f9yyskj';
    try {
      await emailjs.send(serviceId, customerTemplateId, {
        to_name: receiverName,
        to_email: receiverEmail,
        message: 'hi, your order details',
        content: pdf,
      });
    } catch (error) {
      console.log(error);
    } finally {
      alert('email send successfully');
      handlePdfModalClose();
      window.location.reload();
    }
  };


  const handleCreateModalClose = () => {
    setShowCreate(false);
    window.location.reload()
  };

  const handlePdfModalClose = () => {
    setShowPdf(false)
    window.location.reload()
  }

  const handleCreate = async () => {




    let tempAddData = {
      purchase_order_no: pONo,
      purchase_order_date: date,

      company_name: companyName,
      company_address: companyAddress,
      company_phone_no: companyPhoneNo,
      company_email: companyEmail,
      billing_name: billingName,
      billing_phone_no: billingPhoneNo,
      billing_email: billingEmail,
      billing_address: billingAddress,
      gratuity: gratuity,
      shipping_charges: shippingCharges,
      convenience_fee: convenienceFee,
      courier_charges: courierCharges,
      deduction: deduction,
      delivery_charges: deliveryCharges,
      retention: retention,
      round_off: roundOff,
      notes: notes,
      terms_condition: termsAndCond,
      details: details

    }

    let addData = new FormData()

    addData.append("data", JSON.stringify(tempAddData))

    addData.append("logo", companyLogo)

    const createdData = await createPurchaseOrders(addData)

    let gst = parseFloat('0');
    details.forEach((det: any, index: number) => {
      gst = gst + parseFloat(det.gst)
    })
    setGst(gst)

    // alert(gst)
    // if (createdData.success == true) {
    //   alert("purchase order created")
    //   setShowCreate(false)
    //   setShowPdf(true)
    //   setCompanyLogo(createdData?.insertedData?.company_logo)
    // }
    if (
      createdData?.success === "no" &&
      createdData?.message === "jwt expired"
    ) {
      return navigate("/");
    } else if (createdData?.success === "no") {
      alert("system error try again leter");
    } else if (createdData?.success === "yes") {
      alert("purchase order created successfully")
      // handleClose()
      // window.location.reload();
      setShowCreate(false)
      setShowPdf(true)
      setCompanyLogo(createdData?.insertedData?.company_logo)
    }

  }

  const handleDetails = async (operation: any, e: any, ind: any) => {
    let tempDetails: any = details

    if (!tempDetails[ind]) {
      tempDetails[ind] = {
        "description": "",
        "quantity": "",
        "rate": "",
        "discount": "",
        "gst": ""
      }
    }

    tempDetails[ind][operation] = e.target.value



    setDetails([...tempDetails])


  }

  const handleUpdate = async () => {
    let tempUpdateData = {
      purchase_order_id: pOId,
      purchase_order_no: pONo,
      purchase_order_date: date,
      company_name: companyName,
      company_address: companyAddress,
      company_phone_no: companyPhoneNo,
      company_email: companyEmail,
      billing_name: billingName,
      billing_phone_no: billingPhoneNo,
      billing_email: billingEmail,
      billing_address: billingAddress,
      gratuity: gratuity,
      shipping_charges: shippingCharges,
      convenience_fee: convenienceFee,
      courier_charges: courierCharges,
      deduction: deduction,
      delivery_charges: deliveryCharges,
      retention: retention,
      round_off: roundOff,
      notes: notes,
      terms_condition: termsAndCond,
      details: dbDetails.concat(details)
    }


    let updateData = new FormData()

    updateData.append("data", JSON.stringify(tempUpdateData))

    if (companyLogo !== "") {
      updateData.append("logo", companyLogo)
    }

    const updatedData = await updatePurchaseOrders(updateData)

    let tempDet = dbDetails.concat(details)
    let gst = parseFloat('0');
    tempDet.forEach((det: any, index: number) => {
      gst = gst + parseFloat(det.gst)
    })
    setGst(gst)
    // if (updatedData.success == true) {
    //   alert("invoice updated")
    //   setDetails(dbDetails.concat(details))
    //   setShowCreate(false)
    //   setShowPdf(true)

    // }

    if (
      updatedData?.success === "no" &&
      updatedData?.message === "jwt expired"
    ) {
      return navigate("/");
    } else if (updatedData?.success === "no") {
      alert("system error try again leter");
    } else if (updatedData?.success === "yes") {
      alert("purchase order updated successfully")
      // window.location.reload();
      setDetails(dbDetails.concat(details))
      setShowCreate(false)
      setShowPdf(true)
      // setUpdate(false)
    }
  }

  const handleDelete = async (id: any) => {
    let deleteData = {
      poId: id
    }



    const deletedData = await deletePurchaseOrders(deleteData)

    //  if(deletedData){
    //   alert("invoice deleted")
    //  window.location.reload()
    //  }

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

      alert("purchase order deleted successfully")
      window.location.reload();
    }


  }

  const handleDbDetails = async (operation: any, operation2: any, e: any, ind: any) => {

    let tempDbDetails = dbDetails

    document.getElementById(`${operation}-${ind}`).value = e.target.value
    tempDbDetails[ind][operation2] = e.target.value



    setDbDetails([...tempDbDetails])


  }

  function getNet() {

    return gst + parseFloat(convenienceFee) + parseFloat(gratuity) + parseFloat(roundOff) + parseFloat(shippingCharges) + parseFloat(deliveryCharges) + parseFloat(courierCharges) + parseFloat(deduction) + parseFloat(retention)
  }


  useEffect(() => {
    dbDetails.forEach((db:any, ind) => {
      document.getElementById(`db-desc-${ind}`).value = db?.quantity
      document.getElementById(`db-qty-${ind}`).value = db?.quantity
      document.getElementById(`db-disc-${ind}`).value = db?.discount
      document.getElementById(`db-rate-${ind}`).value = db?.rate
      document.getElementById(`db-gst-${ind}`).value = db?.gst
    })
  }, [dbDetails])


  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Purchase Order Editor
        </h2>

        <nav className="flex justify-center items-center  gap-5 w-[40%]">
          <button
            onClick={() => {
              setUpdate(false);
              setShowCreate(true);
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
            <li className="font-medium text-primary">Invoice Management</li>
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
              {purchaseOrders &&
                purchaseOrders.length !== 0 &&
                purchaseOrders.map((po, ind) => (
                  <tr key={ind}>
                    <td className="border-b border-[#eee] py-5 px-2 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {ind + 1}
                      </h5>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-2 pl-0 dark:border-strokedark xl:pl-3">
                      <h5 className="font-medium text-black dark:text-white">
                        {po?.purchase_order_no}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          onClick={() => {
                            setUpdate(true)
                            setShowCreate(true)
                            setPoId(po?._id)
                            setCompanyAddress(po?.company_address)
                            setCompanyName(po?.company_name)
                            setCompanyEmail(po?.company_email)
                            setCompanyPhoneNo(po?.company_phone_no)
                            setBillingAddress(po?.billing_address)
                            setBillingName(po?.billing_name)
                            setBillingEmail(po?.billing_email)
                            setBillingPhoneNo(po?.billing_phone_no)
                            setNotes(po?.notes)
                            setTermsAndCond(po?.terms_condition)
                            setDbCompanyLogo(po?.company_logo)
                            setDbDetails(po?.details)
                            setConvenienceFee(po?.convenience_fee)
                            setGratuity(po?.gratuity)
                            setShippingCharges(po?.shipping_charges)
                            setCourierCharges(po?.courier_charges)
                            setDeliveryCharges(po?.delivery_charges)
                            setRetention(po?.retention)
                            setRoundOff(po?.round_off)
                            setDeduction(po?.deduction)
                            setDetailsCnt([])
                          }}
                          className="h-9 w-9 flex justify-center items-center border border-[#3c50e0] rounded-md hover:text-[#3c50e0] transition-all duration-150 ease-in-out"
                        >
                          <EditRoundedIcon />
                        </button>
                        <button
                          className="h-9 w-9 flex justify-center items-center border border-[#dc3545] rounded-md hover:text-[#dc3545] transition-all duration-150 ease-in-out"
                          onClick={() => {
                            handleDelete(po?._id);
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

      {showCreate && (
        <div className="fixed top-0 left-0 EditModelZindex flex justify-center items-center w-full h-full backdrop-blur-md">
          <div className="shadow-md p-4 w-[50%] rounded-md dark:border-strokedark dark:bg-boxdark border-stroke bg-white overflow-y-auto max-h-full">
            <div className="flex justify-between items-center">
              <h2 className="text-[800] text-3xl ">
                {update ? 'Update Users' : 'Add Users'}
              </h2>
              <button
                onClick={() => {
                  handleCreateModalClose();
                }}
                className="hover:text-[#dc3545] transition-all duration-200 ease-in-out"
              >
                <CloseRoundedIcon className="text-6xl" />
              </button>
            </div>

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  Company Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="company-name "
                  placeholder="Enter Company Name..."
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                  }}
                />
              </div>
            </div>

            {dbCompanyLogo && dbCompanyLogo !== "" &&
              <div className="mt-3">
                <div className="flex flex-col justify-start items-start gap-3">
                  <label className="text-lg text-black dark:text-white">
                    Attached Company Logo
                  </label>
                  <img
                    className="h-50 w-50 form-control"
                    id="db-company-logo "
                    alt="attached-logo"
                    src={dbCompanyLogo}
                  />
                </div>
              </div>}

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  {update ? "Change Company Logo" : "Company Logo"}
                </label>
                <input
                  type="file"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="company-logo "
                  onChange={(e: any) => {
                    setCompanyLogo(e.target.files[0])
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  Company Address
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="company-address  "
                  placeholder="Enter Company Address..."
                  value={companyAddress}
                  onChange={(e) => {
                    setCompanyAddress(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  Company Phone No
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={companyPhoneNo}
                  placeholder="Enter Company Phone Number..."
                  id="company-phone-no  "
                  onChange={(e) => {
                    setCompanyPhoneNo(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  Company Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="company-email  "
                  placeholder="Enter Company Email...."
                  value={companyEmail}
                  onChange={(e) => {
                    setCompanyEmail(e.target.value);
                  }}
                />
              </div>
            </div>


            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  Purchase Order No
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="purchase-order-no"
                  value={pONo}
                  onChange={(e: any) => {
                    setPoNo(e.target.value)
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  Date
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="purchase-order-date"
                  placeholder="Enter Date...."
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  Billing Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="billing-name"
                  value={billingName}
                  onChange={(e) => {
                    setBillingName(e.target.value)
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  Billing Address
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="billing-address"
                  value={billingAddress}
                  onChange={(e: any) => {
                    setBillingAddress(e.target.value)
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  Billing Phone NO
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="billing_phone_no"

                  value={billingPhoneNo}
                  onChange={(e) => {
                    setBillingPhoneNo(e.target.value)
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  Billing Email
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id=" billing_email"
                  value={billingEmail}
                  onChange={(e) => {
                    setBillingEmail(e.target.value)
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  gratuity
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="gratuity"
                  value={gratuity}
                  onChange={(e: any) => {
                    setGratuity(e.target.value)
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  shipping charges
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="shipping_charges"

                  value={shippingCharges}
                  onChange={(e: any) => {
                    setShippingCharges(e.target.value)
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  convenience fee
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="convenience_fee"

                  value={convenienceFee}
                  onChange={(e: any) => {
                    setConvenienceFee(e.target.value)
                  }}
                />
              </div>
            </div>


            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  courier charges
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="courier_charges"

                  value={courierCharges}
                  onChange={(e: any) => {
                    setCourierCharges(e.target.value)
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  Deduction
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="deduction"

                  value={deduction}
                  onChange={(e: any) => {
                    setDeduction(e.target.value)
                  }}
                />
              </div>
            </div>


            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  Deduction
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="deduction"

                  value={deduction}
                  onChange={(e: any) => {
                    setDeduction(e.target.value)
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  Delivery Charges
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="delivery_charges"

                  value={deliveryCharges}
                  onChange={(e: any) => {
                    setDeliveryCharges(e.target.value)
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  Retention
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="retention"

                  value={retention}
                  onChange={(e: any) => {
                    setRetention(e.target.value)
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  Round Off
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="round_off"

                  value={roundOff}
                  onChange={(e: any) => {
                    setRoundOff(e.target.value)
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  Notes
                </label>
                <textarea

                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"

                  id="notes"

                  value={notes}
                  onChange={(e: any) => {
                    setNotes(e.target.value)
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  Terms and Condition
                </label>
                <textarea

                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"

                  id="terms-and-condition"

                  value={termsAndCond}
                  onChange={(e) => {
                    setTermsAndCond(e.target.value)
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex justify-between">
                <label className="pb-1">{update ? "Attached Details" : ""}</label>
              </div>
            </div>

            {dbDetails.length !== 0 &&
              dbDetails.map((_, ind) => (
                <>

                  <div className="flex mt-2">
                    <input
                      type="text"
                      id={`db-desc-${ind}`}
                      className="w-35 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="desc"
                      onChange={(e) => {
                        handleDbDetails("db-desc", "description", e, ind)
                      }}
                    />
                    <input
                      type="number"
                      id={`db-qty-${ind}`}
                      className="ms-2 w-35  rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="qty"
                      onChange={(e) => {
                        handleDbDetails("db-qty", "quantity", e, ind)
                      }}
                    />
                    <input
                      type="number"
                      id={`db-disc-${ind}`}
                      className="ms-2 w-35  rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="discount"
                      onChange={(e) => {
                        handleDbDetails("db-disc", "discount", e, ind)
                      }}
                    />
                    <input
                      type="number"
                      id={`db-rate-${ind}`}
                      className="ms-2 w-35  rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="rate"
                      onChange={(e) => {
                        handleDbDetails("db-rate", "rate", e, ind)
                      }}
                    />
                    <input
                      type="number"
                      id={`db-gst-${ind}`}
                      className="ms-2 w-35 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="gst"
                      onChange={(e) => {
                        handleDbDetails("db-gst", "gst", e, ind)
                      }}
                    />
                  </div>
                </>
              ))}

            <div className="mt-5">
              <div className="flex justify-between">
                <label className="pb-1">Add Details</label>
                <button
                  className="flex w-[25%] justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  onClick={() => {
                    const tempDetailsCnt: any = detailsCnt;
                    tempDetailsCnt.push(detailsCnt.length + 1);
                    setDetailsCnt([...tempDetailsCnt]);
                  }}
                >
                  Add details <AddIcon />
                </button>
              </div>
            </div>

            {detailsCnt.length !== 0 &&
              detailsCnt.map((_, ind) => (
                <>
                  <div className="grid grid-cols-5 gap-2 my-4">
                    <input
                      type="text"
                      id={`desc-${ind}`}
                      className="w-35 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="desc"
                      onChange={(e) => {
                        handleDetails("description", e, ind)
                      }}
                    />
                    <input
                      type="number"
                      id={`qty-${ind}`}
                      className="w-35  rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="qty"
                      onChange={(e) => {
                        handleDetails("quantity", e, ind)
                      }}
                    />
                    <input
                      type="number"
                      id={`disc-${ind}`}
                      className="w-35  rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="discount"
                      onChange={(e) => {
                        handleDetails("discount", e, ind)
                      }}
                    />
                    <input
                      type="number"
                      id={`rate-${ind}`}
                      className="w-35  rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="rate"
                      onChange={(e) => {
                        handleDetails("rate", e, ind)
                      }}
                    />
                    <input
                      type="number"
                      id={`gst-${ind}`}
                      className=" w-35 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="gst"
                      onChange={(e) => {
                        handleDetails("gst", e, ind)
                      }}
                    />
                  </div>
                </>
              ))}

            <div className="flex justify-end items-center gap-4 my-4">
              <button
                onClick={() => {
                  handleCreateModalClose();
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


      {showPdf && (
        <div className="fixed top-0 left-0 EditModelZindex flex justify-center items-center w-full h-full backdrop-blur-md">
          <div className="shadow-md p-4 w-[50%] rounded-md dark:border-strokedark dark:bg-boxdark border-stroke bg-white overflow-y-auto max-h-full">
            <div className="flex justify-between items-center">
              <h2 className="text-[800] text-3xl ">Send Invoice As Pdf</h2>
              <button
                onClick={() => {
                  handlePdfModalClose();
                }}
                className="hover:text-[#dc3545] transition-all duration-200 ease-in-out"
              >
                <CloseRoundedIcon className="text-6xl" />
              </button>
            </div>

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  Receiver Name:
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="receiver-name"
                  onChange={(e) => {
                    setReceiverName(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="mt-3 mb-5">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  Receiver Email:
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="receiver-email"
                  onChange={(e) => {
                    setReceiverEmail(e.target.value);
                  }}
                />
              </div>
            </div>

            <div id="content">
              <div className="flex justify-between m-5">
                <div style={{
                  display: "inline-flex",
                  flexDirection: "column"
                }}>
                  <p className="text-bold">{companyName}</p>
                  <p>{companyAddress}</p>
                  <p>{companyPhoneNo}</p>
                  <p>{companyEmail}</p>
                </div>
                <div className="Purchase_order_logo_container flex justify-end">
                  <img src={dbCompanyLogo ? dbCompanyLogo : companyLogo} alt="logo" id="logo" />
                </div>
              </div>
              <div className="flex justify-between m-5">
                <div style={{
                  display: "inline-flex",
                  flexDirection: "column"
                }}>
                  <p className="mb-4">Bill to :</p>
                  <p>{billingName}</p>
                  <p>{billingAddress}</p>
                  <p>{billingEmail}</p>
                  <p>{billingPhoneNo}</p>
                </div>
                <div style={{
                  display: "inline-flex",
                  flexDirection: "column"
                }}>
                  <div >
                    <p>PO#&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{pONo}</span></p>
                    <p>Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{date}</span></p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-5 ms-3 me-3">
                <table className="w-full pdf_table">
                  <thead>
                    <tr style={{ background: "#D3D3D3" }}>
                      <th className="pdf_th text-bold">QTY</th>
                      <th className="pdf_th text-bold">RATE</th>
                      <th className="pdf_th text-bold">DISCOUNT</th>
                      <th className="pdf_th text-bold">GST</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.length !== 0 &&
                      details.map((d: any, _) => (
                        <tr >
                          <th className='pdf_th'>{d?.quantity}</th>
                          <th className='pdf_th'>{d?.rate}</th>
                          <th className='pdf_th'>{d?.discount}</th>
                          <th className='pdf_th'>{d?.gst}</th>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-5 ms-3 me-3 mb-3">
                <table className="w-full pdf_table">
                  <tbody >
                    {/* <tr >
                      <th className='text-bold pdf_th' >TOTAL</th>
                      <th className='pdf_th'>00</th>
                    </tr> */}
                    <tr>
                      <th className='text-bold pdf_th' >GST</th>
                      <th className='pdf_th'>{gst}</th>
                    </tr>
                    <tr>
                      <th className='text-bold pdf_th'>gratuity</th>
                      <th className='pdf_th'>{gratuity}</th>
                    </tr>
                    <tr>
                      <th className='text-bold pdf_th'> shipping charges</th>
                      <th className='pdf_th'>{shippingCharges}</th>
                    </tr>
                    <tr>
                      <th className='text-bold pdf_th'> convenience fee</th>
                      <th className='pdf_th'>{convenienceFee}</th>
                    </tr>
                    <tr>
                      <th className='text-bold pdf_th'> courier charges</th>
                      <th className='pdf_th'>{courierCharges}</th>
                    </tr>
                    <tr>
                      <th className='text-bold pdf_th'> retention</th>
                      <th className='pdf_th'>{retention}</th>
                    </tr>
                    <tr>
                      <th className='text-bold pdf_th'> round off</th>
                      <th className='pdf_th'>{roundOff}</th>
                    </tr>
                    <tr>
                      <th className='text-bold pdf_th'>deduction</th>
                      <th className='pdf_th'>{deduction}</th>
                    </tr>
                    <tr>
                      <th className='text-bold pdf_th'>delivery charges</th>
                      <th className='pdf_th'>{deliveryCharges}</th>
                    </tr>
                    <tr>
                      <th className='text-bold pdf_th'>Net Amount</th>
                      <th className='pdf_th'>{getNet()}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="m-5">
                <p className="text-bold">Notes</p>
                <p>{notes}</p>
              </div>
              <div className="m-5">
                <p className="text-bold">Terms And Condition</p>
                <p>{termsAndCond}</p>
              </div>
            </div>

            <div className="flex justify-end items-center gap-4 my-4">
              <button
                onClick={() => {
                  handlePdfModalClose();
                }}
                className="w-[15%] py-3 bg-[#dc3545] rounded-lg text-white hover:bg-opacity-90"
              >
                Cancel
              </button>
              <button
                className="flex w-50 justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                onClick={async () => {
                  await handleGeneratePDF(companyLogo);
                }}
              >
                Download & Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PurchaseOrderTable