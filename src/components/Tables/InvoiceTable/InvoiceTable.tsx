import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import {
  createInvoices,
  updateInvoices,
  deleteInvoices,
} from '../../../api-calls/apicalls';
import { Link, useNavigate } from 'react-router-dom';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import html2pdf from 'html2pdf.js';
import emailjs from '@emailjs/browser';
import './InvoiceTable.css';

const InvoiceTable = ({ invoiceAllData }: any) => {
  const [showCreate, setShowCreate] = useState(false);
  const [detailsCnt, setDetailsCnt] = useState<any[]>([]);
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyPhoneNo, setCompanyPhoneNo] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [date, setDate] = useState('');
  const [billingAdd, setBillingAdd] = useState('');
  const [shippingAdd, setShippingAdd] = useState('');
  const [details, setDetails] = useState([]);
  const [showPdf, setShowPdf] = useState(false);
  const [receiverEmail, setReceiverEmail] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [tax, setTax] = useState<any>();
  const [update, setUpdate] = useState(false);
  const [invoices, setInvoices] = useState<any[]>(invoiceAllData);
  const [invoiceId, setInvoiceId] = useState('');
  const [dbDetails, setDbDetails] = useState([]);

  const navigate = useNavigate();

  useEffect(() => emailjs.init('7tEQNlrYa74GKcgSa'), []);

  const handleGeneratePDF = async () => {
    const input: any = document.getElementById('content');
    // console.log("vvv", input.offsetHeight)
    html2pdf()
      .from(input)
      .set({
        margin: [0, 0, 0, 0],
        filename: `Invoice-${receiverName}-${invoiceNo}`,
        html2canvas: {
          dpi: 192,
          letterRendering: true,
        },
        jsPDF: {
          orientation: 'portrait',
          unit: 'cm',
          format: [input.offsetHeight / 35, input.offsetWidth / 40],
        },
      })
      .save()
      .toPdf()
      .output('datauristring')
      .then(async function (pdfAsString: any) {
        await handleSend(pdfAsString);
      });
  };

  const handleCreateModalClose = () => {
    setShowCreate(false);
    window.location.reload();
  };

  const handlePdfModalClose = () => {
    setShowPdf(false);
  };

  const handleCreate = async () => {
    let addData = {
      company_name: companyName,
      company_address: companyAddress,
      company_phone_no: companyPhoneNo,
      company_email: companyEmail,
      invoice_no: invoiceNo,
      invoice_date: date,
      shipping_address: shippingAdd,
      billing_address: billingAdd,
      tax: tax.toString(),
      details: details,
    };

    const createdData = await createInvoices(addData);

    // if (createdData) {
    //   alert("invoice created")
    //   setShowCreate(false)
    //   setShowPdf(true)
    // }

    if (
      createdData?.success == 'no' &&
      createdData?.message === 'jwt expired'
    ) {
      return navigate('/');
    } else if (createdData?.success == 'no') {
      alert('system error try again leter');
    } else if (createdData?.success == 'yes') {
      setShowCreate(false);
      setShowPdf(true);
      alert('file template created successfully');
      // window.location.reload();
    }
  };

  const handleUpdate = async () => {
    let updateData = {
      invoice_id: invoiceId,
      company_name: companyName,
      company_address: companyAddress,
      company_phone_no: companyPhoneNo,
      company_email: companyEmail,
      invoice_no: invoiceNo,
      invoice_date: date,
      shipping_address: shippingAdd,
      billing_address: billingAdd,
      tax: tax.toString(),
      details: dbDetails.concat(details),
    };

    const updatedData = await updateInvoices(updateData);

    // if (updatedData) {
    //   alert("invoice updated")
    //   setDetails(dbDetails.concat(details))
    //   setShowCreate(false)
    //   setShowPdf(true)
    // }
    if (
      updatedData?.success == 'no' &&
      updatedData?.message === 'jwt expired'
    ) {
      return navigate('/');
    } else if (updatedData?.success == 'no') {
      alert('system error try again leter');
    } else if (updatedData?.success == 'yes') {
      setDetails(dbDetails.concat(details));
      setShowCreate(false);
      setShowPdf(true);
      alert('invoice updated successfully');
      // window.location.reload();
    }
  };

  const handleDelete = async (id: any) => {
    let deleteData = {
      invoiceDocId: id,
    };

    const deletedData = await deleteInvoices(deleteData);
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

      alert('invoice deleted successfully');
      window.location.reload();
    }
  };

  const handleSend = async (pdf: any) => {
    // console.log("pdf", pdf)
    const serviceId = 'service_twmn4of';
    const customerTemplateId = 'template_0ngm4wm';
    try {
      await emailjs.send(serviceId, customerTemplateId, {
        to_name: receiverName,
        to_email: receiverEmail,
        message: 'hi',
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

  const handleDetails = async (operation: any, e: any, ind: any) => {
    let tempDetails = details;

    if (!tempDetails[ind]) {
      tempDetails[ind] = {
        quantity: 0,
        description: '',
        unit_price: 0,
        total: 0,
      };
    }

    tempDetails[ind][operation] = e.target.value;

    setDetails([...tempDetails]);
  };

  const handleDbDetails = async (
    operation: any,
    operation2: any,
    e: any,
    ind: any,
  ) => {
    let tempDbDetails = dbDetails;

    document.getElementById(`${operation}-${ind}`).value = e.target.value;
    tempDbDetails[ind][operation2] = e.target.value;

    setDbDetails([...tempDbDetails]);
  };

  const getSubTotal = () => {
    let subTotal = 0;
    details.forEach((d: any) => {
      subTotal = subTotal + parseInt(d?.total);
    });
    return subTotal;
  };

  const getGrandTotal = () => {
    return getSubTotal() + parseInt(tax);
  };

  useEffect(() => {
    const setter = async () => {
      let invoicesData = invoices;
      if (invoicesData?.length == 0) {
        setInvoiceNo('23999');
      }
      invoicesData.forEach((inv: any, ind: number) => {
        if (ind === invoicesData.length - 1) {
          setInvoiceNo(invoicesData[ind]?.invoice_no);
        }
      });
      setInvoices([...invoicesData]);
    };

    setter();
  }, []);

  useEffect(() => {
    dbDetails.forEach((db: any, ind: number) => {
      document.getElementById(`db-qty-${ind}`).value = db?.quantity;
      document.getElementById(`db-desc-${ind}`).value = db?.description;
      document.getElementById(`db-unit-price-${ind}`).value = db?.unit_price;
      document.getElementById(`db-total-${ind}`).value = db?.total;
    });
  }, [dbDetails]);

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Invoice Editor
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
              {invoices &&
                invoices.length !== 0 &&
                invoices.map((invoice, ind) => (
                  <tr key={ind}>
                    <td className="border-b border-[#eee] py-5 px-2 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {ind + 1}
                      </h5>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-2 pl-0 dark:border-strokedark xl:pl-3">
                      <h5 className="font-medium text-black dark:text-white">
                        {invoice?.invoice_no}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          onClick={() => {
                            setUpdate(true);
                            setShowCreate(true);
                            setInvoiceId(invoice?._id);
                            setCompanyName(invoice?.company_name);
                            setCompanyAddress(invoice?.company_address);
                            setBillingAdd(invoice?.billing_address);
                            setShippingAdd(invoice?.shipping_address);
                            setCompanyEmail(invoice?.company_email);
                            setTax(invoice?.tax);
                            setCompanyPhoneNo(invoice?.company_phone_no);
                            setDate(invoice?.invoice_date);
                            setInvoiceNo(invoice?.invoice_no);
                            setDbDetails(invoice?.details);
                            setDetailsCnt([]);
                          }}
                          className="h-9 w-9 flex justify-center items-center border border-[#3c50e0] rounded-md hover:text-[#3c50e0] transition-all duration-150 ease-in-out"
                        >
                          <EditRoundedIcon />
                        </button>
                        <button
                          className="h-9 w-9 flex justify-center items-center border border-[#dc3545] rounded-md hover:text-[#dc3545] transition-all duration-150 ease-in-out"
                          onClick={() => {
                            handleDelete(invoice?._id);
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
                  Invoice No.
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="invoice-no "
                  value={parseInt(invoiceNo) + 1}
                  placeholder="Enter Invoice Number...."
                  // onChange={(e) => {
                  // setInvoiceNo(e.target.value);
                  // }}
                  disabled={true}
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
                  id="invoice-date  "
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
                  Billing Address
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="billing-address "
                  placeholder="Enter Billing Address...."
                  value={billingAdd}
                  onChange={(e) => {
                    setBillingAdd(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  Shipping Address
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  id="shipping-address "
                  placeholder="Enter Shipping Address...."
                  value={shippingAdd}
                  onChange={(e) => {
                    setShippingAdd(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex flex-col justify-start items-start gap-3">
                <label className="text-lg text-black dark:text-white">
                  Tax
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={tax}
                  placeholder="Enter Tax Amount...."
                  id="tax"
                  onChange={(e) => {
                    setTax(e.target.value);
                  }}
                />
              </div>
            </div>

            {dbDetails.length !== 0 &&
              dbDetails.map((_, ind) => (
                <>
                  <div className="mt-4">
                    <div className="flex justify-between">
                      <label className="pb-1">Attached Details</label>
                    </div>
                  </div>
                  <div className="flex mt-2">
                    <input
                      type="number"
                      id={`db-qty-${ind}`}
                      className="w-25 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="qty"
                      onChange={(e) => {
                        handleDbDetails('db-qty', 'quantity', e, ind);
                      }}
                    />
                    <input
                      type="text"
                      id={`db-desc-${ind}`}
                      className="ms-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="description"
                      onChange={(e) => {
                        handleDbDetails('db-desc', 'description', e, ind);
                      }}
                    />
                    <input
                      type="number"
                      id={`db-unit-price-${ind}`}
                      className="ms-2 w-35 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="unit price"
                      onChange={(e) => {
                        handleDbDetails('db-unit-price', 'unit_price', e, ind);
                      }}
                    />
                    <input
                      type="number"
                      id={`db-total-${ind}`}
                      className="ms-2 w-35 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="total"
                      onChange={(e) => {
                        handleDbDetails('db-total', 'total', e, ind);
                      }}
                    />
                  </div>
                </>
              ))}

            <div className="mt-4">
              <div className="flex justify-between">
                <label className="pb-1">Add Details</label>
                <button
                  className="flex w-[25%] justify-center rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  onClick={() => {
                    const tempDetailsCnt = detailsCnt;
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
                  <div className="grid grid-cols-4 gap-3 my-4">
                    <div>
                      <input
                        type="number"
                        id={`qty-${ind}`}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="Enter Quantity..."
                        onChange={(e) => {
                          handleDetails('quantity', e, ind);
                        }}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        id={`desc-${ind}`}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="Enter Description..."
                        onChange={(e) => {
                          handleDetails('description', e, ind);
                        }}
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        id={`unit-price-${ind}`}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary "
                        placeholder="Enter Unit Price..."
                        onChange={(e) => {
                          handleDetails('unit_price', e, ind);
                        }}
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        id={`total-${ind}`}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="Enter Total Amount..."
                        onChange={(e) => {
                          handleDetails('total', e, ind);
                        }}
                      />
                    </div>
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
              <div className="flex justify-between ms-3 me-3">
                <div className="flex flex-col">
                  <p className="m-0 font-bold">{companyName}</p>
                  <p className="m-0">Address</p>
                  <p className="m-0">{companyAddress}</p>
                  <p className="m-0">{companyPhoneNo}</p>
                  <p className="m-0">{companyEmail}</p>
                </div>
                <div className="w-50 mt-4 me-2 flex justify-center">
                  <p
                    className="font-bold"
                    style={{
                      fontSize: '55px',
                    }}
                  >
                    INVOICE
                  </p>
                </div>
              </div>
              <hr
                className="mt-3 ms-3 me-3"
                style={{
                  border: '1px solid black',
                  fontWeight: 'bold',
                  opacity: 1,
                }}
              />
              <div className="flex justify-end ms-3 me-3">
                <p>
                  Invoice No. <span>{invoiceNo}</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;Date:{' '}
                  <span>{date}</span>{' '}
                </p>
              </div>

              <div
                className="flex justify-start ms-3 me-3 mt-3"
                style={{ background: '#D3D3D3' }}
              >
                <p className="mb-2">Bill To</p>
                <p className="mb-2 invoice_ship_to">Ship To</p>
              </div>

              <hr
                className="me-3 ms-3 mt-0"
                style={{
                  border: '1px solid black',
                  fontWeight: 'bold',
                  opacity: 1,
                }}
              />

              <div className="flex justify-start mt-2 ms-3 me-3">
                <div className="flex flex-col">
                  <p className="m-0">{companyName}</p>
                  <p className="m-0">Address</p>

                  <p className="m-0">{billingAdd}</p>
                </div>
                <div className="flex flex-col invoice_ship_to_desc">
                  <p className="m-0">{companyName}</p>
                  <p className="m-0">Address</p>

                  <p className="m-0">{shippingAdd}</p>
                </div>
              </div>

              <div className="flex justify-center mt-5 ms-3 me-3">
                <table className="w-full pdf_table">
                  <thead>
                    <tr style={{ background: '#D3D3D3' }}>
                      <th className="pdf_th text-bold">QTY</th>
                      <th className="pdf_th text-bold">DESCRIPTION</th>
                      <th className="pdf_th text-bold">UNIT PRICE</th>
                      <th className="pdf_th text-bold">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.length !== 0 &&
                      details.map((d: any, _) => (
                        <tr>
                          <th className="pdf_th">{d?.quantity}</th>
                          <th className="pdf_th">{d?.description}</th>
                          <th className="pdf_th">{d?.unit_price}</th>
                          <th className="pdf_th">{d?.total}</th>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between mt-3 ms-3 me-3 mb-3">
                <div className=" w-50 flex  justify-center">
                  <p className="invoice_thank_you mt-3">Thank You</p>
                </div>
                <table className="w-50 pdf_table">
                  <tbody>
                    <tr>
                      <th className="text-bold pdf_th">SUBTOTAL</th>
                      <th className="pdf_th">{getSubTotal()}</th>
                    </tr>
                    <tr>
                      <th className="text-bold pdf_th">TAX</th>
                      <th className="pdf_th">{tax}</th>
                    </tr>
                    <tr>
                      <th className="text-bold pdf_th">GRAND TOTAL</th>
                      <th className="pdf_th">{getGrandTotal()}</th>
                    </tr>
                  </tbody>
                </table>
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
                  await handleGeneratePDF();
                }}
              >
                Download & Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InvoiceTable;
