import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddIcon from '@mui/icons-material/Add';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  createFileTemplates,
  deleteFileTemplates,
  updateFileTemplates,
} from '../../api-calls/apicalls';
import banner from '../../assets/banner.png';

function FileTable({ fileAllData }: any) {
  const [templates, setTemplates] = useState<any[]>(fileAllData);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [templateName, setTemplateName] = useState<string>('');
  // const [templateCategory, setTemplateCategory] = useState("");
  const [templateDesc, setTemplateDesc] = useState<string>('');
  const [templateImage, setTemplateImage] = useState();
  const [templatePdfs, setTemplatePdfs] = useState<any[]>([]);
  const [templateZips, setTemplateZips] = useState<any[]>([]);
  const [links, setLinks] = useState<any[]>([]);
  const [pdfsCnt, setPdfsCnt] = useState<any[]>([]);
  const [zipsCnt, setZipsCnt] = useState<any[]>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const [dbPdfs, setDbPdfs] = useState<any[]>([]);
  const [dbZips, setDbZips] = useState<any[]>([]);
  const [dbLinks, setDbLinks] = useState<any[]>([]);
  const [templateId, setTemplateId] = useState<string>('');
  const [dbImage, setDbImage] = useState<string>('');

  const navigate = useNavigate();

  const handleClose = () => {
    window.location.reload();
  };

  const imageFileHandler = (e: any) => {
    let selectedImage = e.target.files[0];

    if (selectedImage.type !== 'image/png') {
      alert('please select image');
      document.getElementById('add-image').value = '';
      return;
    }
    setTemplateImage(selectedImage);
  };

  const pdfFilesHandler = (e: any, ind: any) => {
    let selectedPdf = e.target.files[0];
    let tempTemplatePdfs = templatePdfs;

    if (selectedPdf.type !== 'application/pdf') {
      alert('please select pdfs');
      document.getElementById(`add-pdfs-${ind}`).value = '';
      tempTemplatePdfs.splice(1, ind);
      return;
    } else {
      tempTemplatePdfs[ind] = selectedPdf;
    }

    // console.log("temppdfs",tempTemplatePdfs)
    setTemplatePdfs([...tempTemplatePdfs]);
  };

  const zipFilesHandler = (e: any, ind: any) => {
    let selectedZip = e.target.files[0];
    let tempTemplateZips = templateZips;

    if (selectedZip.type !== 'application/x-zip-compressed') {
      alert('please select zips');
      document.getElementById(`add-zips-${ind}`).value = '';
      tempTemplateZips.splice(1, ind);
      return;
    } else {
      tempTemplateZips[ind] = selectedZip;
    }

    setTemplateZips([...tempTemplateZips]);
  };

  const handleLinks = () => {
    const tempLinks = links;
    tempLinks.push(links.length + 1);
    setLinks([...tempLinks]);
  };

  const handlePdfsInputCnt = () => {
    const tempPdfs = pdfsCnt;
    tempPdfs.push(pdfsCnt.length + 1);
    setPdfsCnt([...tempPdfs]);
  };

  const handleZipsInputCnt = () => {
    const tempZips = zipsCnt;
    tempZips.push(zipsCnt.length + 1);
    setZipsCnt([...tempZips]);
  };

  const handleSubBtns = (id: any) => {
    if (document.getElementById(`${id}`).value == 'off') {
      document.getElementById(`${id}`).value = 'on';
    } else {
      document.getElementById(`${id}`).value = 'off';
    }
  };

  const handleCreate = async () => {
    let addData = new FormData();

    addData.append('template_name', templateName);
    addData.append('template_desc', templateDesc);
    addData.append('files', banner);
    console.log('template pdfs', templatePdfs);

    templatePdfs.forEach((pdf, index) => {
      addData.append('files', pdf);
      addData.append(
        'pdf_title',
        document.getElementById(`pdf-title-${index}`).value,
      );
      addData.append(
        'watermark',
        document.getElementById(`flexSwitch-pdf-wm-${index}`).value == 'off'
          ? false
          : true,
      );
      addData.append(
        'top_left_logo',
        document.getElementById(`flexSwitch-pdf-lb-${index}`).value == 'off'
          ? false
          : true,
      );
      addData.append(
        'bottom_right_page_no',
        document.getElementById(`flexSwitch-pdf-pn-${index}`).value == 'off'
          ? false
          : true,
      );
      addData.append(
        'pdf_downloadable',
        document.getElementById(`flexSwitch-pdf-do-${index}`).value == 'off'
          ? false
          : true,
      );
    });

    templateZips.forEach((zip, index) => {
      addData.append('files', zip);
      addData.append(
        'zip_title',
        document.getElementById(`zip-title-${index}`).value,
      );
      addData.append(
        'zip_downloadable',
        document.getElementById(`flexSwitch-zip-do-${index}`).value == 'off'
          ? false
          : true,
      );
    });

    links.forEach((data, ind) => {
      addData.append(
        'link_preview_name',
        document.getElementById(`link-name-${ind}`).value,
      );
      addData.append(
        'link_url',
        document.getElementById(`link-url-${ind}`).value,
      );
    });

    let createdData = await createFileTemplates(addData);

    // let tempCreatedData = [];
    // tempCreatedData.push(createdData);
    // setTemplates([...templates, ...tempCreatedData]);
    // if (createdData) {
    // handleClose();
    // window.location.reload()
    // }

    if (
      createdData?.success == 'no' &&
      createdData?.message === 'jwt expired'
    ) {
      return navigate('/');
    } else if (createdData?.success == 'no') {
      alert('system error try again leter');
    } else if (createdData?.success == 'yes') {
      alert('file template created successfully');
      window.location.reload();
    }
  };

  const handleUpdate = async () => {
    let tempdbPdfs = dbPdfs;
    let tempDbZips = dbZips;
    let tempDbLinks = dbLinks;

    let updateData = new FormData();

    updateData.append('templateId', templateId);
    updateData.append('template_name', templateName);
    updateData.append('template_desc', templateDesc);

    tempdbPdfs.length > 0 &&
      tempdbPdfs.forEach((temp, tInd) => {
        updateData.append('db_pdf_id', temp?._id);
        updateData.append('db_pdf_url', temp?.url);
        updateData.append('db_pdf_file_name', temp?.file_name);
        updateData.append(
          'db_pdf_watermark',
          document.getElementById(`flexSwitch-db-pdf-wm-${tInd}`).value == 'off'
            ? false
            : true,
        );
        updateData.append(
          'db_pdf_top_left_logo',
          document.getElementById(`flexSwitch-db-pdf-lb-${tInd}`).value == 'off'
            ? false
            : true,
        );
        updateData.append(
          'db_pdf_bottom_right_page_no',
          document.getElementById(`flexSwitch-db-pdf-pn-${tInd}`).value == 'off'
            ? false
            : true,
        );
        updateData.append(
          'db_pdf_pdf_downloadable',
          document.getElementById(`flexSwitch-db-pdf-do-${tInd}`).value == 'off'
            ? false
            : true,
        );
      });

    tempDbZips.length > 0 &&
      tempDbZips.forEach((temp, tInd) => {
        updateData.append('db_zip_id', temp?._id);
        updateData.append('db_zip_url', temp?.url);
        updateData.append('db_zip_file_name', temp?.file_name);
        updateData.append(
          'db_zip_zip_downloadable',
          document.getElementById(`flexSwitch-db-zip-do-${tInd}`).value == 'off'
            ? false
            : true,
        );
      });

    tempDbLinks.length > 0 &&
      tempDbLinks.forEach((temp, tInd) => {
        updateData.append('db_link_id', temp?._id);
        updateData.append(
          'db_link_preview_name',
          document.getElementById(`db-link-name-${tInd}`).value,
        );
        updateData.append(
          'db_link_url',
          document.getElementById(`db-link-url-${tInd}`).value,
        );
      });

    // updateData.append("files", templateImage);

    templatePdfs.forEach((pdf, index) => {
      updateData.append('files', pdf);
      updateData.append(
        'pdf_title',
        document.getElementById(`pdf-title-${index}`).value,
      );
      updateData.append(
        'watermark',
        document.getElementById(`flexSwitch-pdf-wm-${index}`).value == 'off'
          ? false
          : true,
      );
      updateData.append(
        'top_left_logo',
        document.getElementById(`flexSwitch-pdf-lb-${index}`).value == 'off'
          ? false
          : true,
      );
      updateData.append(
        'bottom_right_page_no',
        document.getElementById(`flexSwitch-pdf-pn-${index}`).value == 'off'
          ? false
          : true,
      );
      updateData.append(
        'pdf_downloadable',
        document.getElementById(`flexSwitch-pdf-do-${index}`).value == 'off'
          ? false
          : true,
      );
    });

    templateZips.forEach((zip, index) => {
      updateData.append('files', zip);
      updateData.append(
        'zip_title',
        document.getElementById(`zip-title-${index}`).value,
      );
      updateData.append(
        'zip_downloadable',
        document.getElementById(`flexSwitch-zip-do-${index}`).value == 'off'
          ? false
          : true,
      );
    });

    links.forEach((data, ind) => {
      updateData.append(
        'link_preview_name',
        document.getElementById(`link-name-${ind}`).value,
      );
      updateData.append(
        'link_url',
        document.getElementById(`link-url-${ind}`).value,
      );
    });

    let updatedData = await updateFileTemplates(updateData);

    if (
      updatedData?.success == 'no' &&
      updatedData?.message === 'jwt expired'
    ) {
      return navigate('/');
    } else if (updatedData?.success == 'no') {
      alert('system error try again leter');
    } else if (updatedData?.success == 'yes') {
      alert('file template updated successfully');
      window.location.reload();
    }
  };

  const handleDelete = async (id: any) => {
    const deleteData = { templateId: id };
    const deletedData = await deleteFileTemplates(deleteData);
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

      alert('faq deleted successfully');
      window.location.reload();
    }
  };

  useEffect(() => {
    if (templatePdfs.length !== 0) {
      const index = templatePdfs.length - 1;

      document.getElementById(`flexSwitch-pdf-wm-${index}`).value = 'off';
      document.getElementById(`flexSwitch-pdf-lb-${index}`).value = 'off';
      document.getElementById(`flexSwitch-pdf-pn-${index}`).value = 'off';
      document.getElementById(`flexSwitch-pdf-do-${index}`).value = 'off';
    }
  }, [templatePdfs]);

  useEffect(() => {
    if (templateZips.length !== 0) {
      const index = templateZips.length - 1;
      document.getElementById(`flexSwitch-zip-do-${index}`).value = 'off';
    }
  }, [templateZips]);

  useEffect(() => {
    if (dbPdfs.length !== 0) {
      dbPdfs.forEach((dp: any, index: number) => {
        dp?.watermark == false
          ? (document.getElementById(`flexSwitch-db-pdf-wm-${index}`).value =
              'off')
          : (document.getElementById(`flexSwitch-db-pdf-wm-${index}`).value =
              'on');

        dp?.watermark == false
          ? (document.getElementById(`flexSwitch-db-pdf-wm-${index}`).checked =
              false)
          : (document.getElementById(`flexSwitch-db-pdf-wm-${index}`).checked =
              true);

        dp?.top_left_logo == false
          ? (document.getElementById(`flexSwitch-db-pdf-lb-${index}`).value =
              'off')
          : (document.getElementById(`flexSwitch-db-pdf-lb-${index}`).value =
              'on');

        dp?.top_left_logo == false
          ? (document.getElementById(`flexSwitch-db-pdf-lb-${index}`).checked =
              false)
          : (document.getElementById(`flexSwitch-db-pdf-lb-${index}`).checked =
              true);

        dp?.bottom_right_page_no == false
          ? (document.getElementById(`flexSwitch-db-pdf-pn-${index}`).value =
              'off')
          : (document.getElementById(`flexSwitch-db-pdf-pn-${index}`).value =
              'on');

        dp?.bottom_right_page_no == false
          ? (document.getElementById(`flexSwitch-db-pdf-pn-${index}`).checked =
              false)
          : (document.getElementById(`flexSwitch-db-pdf-pn-${index}`).checked =
              true);

        dp?.pdf_downloadable == false
          ? (document.getElementById(`flexSwitch-db-pdf-do-${index}`).value =
              'off')
          : (document.getElementById(`flexSwitch-db-pdf-do-${index}`).value =
              'on');

        dp?.pdf_downloadable == false
          ? (document.getElementById(`flexSwitch-db-pdf-do-${index}`).checked =
              false)
          : (document.getElementById(`flexSwitch-db-pdf-do-${index}`).checked =
              true);
      });
    }
  }, [dbPdfs]);

  useEffect(() => {
    if (dbZips.length !== 0) {
      dbZips.forEach((dz: any, index: number) => {
        // console.log("dzz", dbZips);

        dz?.zip_downloadable == false
          ? (document.getElementById(`flexSwitch-db-zip-do-${index}`).value =
              'off')
          : (document.getElementById(`flexSwitch-db-zip-do-${index}`).value =
              'on');

        dz?.zip_downloadable == false
          ? (document.getElementById(`flexSwitch-db-zip-do-${index}`).checked =
              false)
          : (document.getElementById(`flexSwitch-db-zip-do-${index}`).checked =
              true);
      });
    }
  }, [dbZips]);

  useEffect(() => {
    if (dbLinks.length !== 0) {
      dbLinks.forEach((dl: any, ind: number) => {
        document.getElementById(`db-link-name-${ind}`).value =
          dl?.link_preview_name;
        document.getElementById(`db-link-url-${ind}`).value = dl?.link_url;
      });
    }
  }, [dbLinks]);

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          File Template Editor
        </h2>

        <nav className="flex justify-center items-center  gap-5 w-[40%]">
          <button
            onClick={() => {
              setUpdate(false);
              setDbImage('');
              setDbLinks([]);
              setDbPdfs([]);
              setDbZips([]);
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
              File Template Management
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
                <th className="min-w-[150px] py-4 px-4 font-bold text-black dark:text-white">
                  Template Name
                </th>
                <th className="min-w-[120px] py-4 px-4 font-bold text-black dark:text-white">
                  Preview
                </th>
                <th className="py-4 px-4 font-bold text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {templates.map((temp, index) => (
                <tr key={index}>
                  <td className="border-b border-[#eee] py-5 px-2 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {index + 1}
                    </h5>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium capitalize text-black dark:text-white">
                      {temp.template_name}
                    </h5>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <Link
                      to="/view-file-template"
                      state={{ templateData: temp }}
                      className="text-blue-500 font-bold text-center tracking"
                    >
                      View
                    </Link>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        onClick={() => {
                          setUpdate(true);
                          setTemplateName(temp?.template_name);
                          setTemplateDesc(temp?.template_desc);
                          setDbPdfs(temp?.template_pdfs);
                          setDbZips(temp?.template_zips);
                          setTemplateId(temp?._id);
                          setDbImage(temp?.template_image);
                          setDbLinks(temp?.template_links);
                          setShowModal(true);
                        }}
                        className="h-9 w-9 flex justify-center items-center border border-[#3c50e0] rounded-md hover:text-[#3c50e0] transition-all duration-150 ease-in-out"
                      >
                        <EditRoundedIcon />
                      </button>
                      <button
                        className="h-9 w-9 flex justify-center items-center border border-[#dc3545] rounded-md hover:text-[#dc3545] transition-all duration-150 ease-in-out"
                        onClick={() => {
                          handleDelete(temp?._id);
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
                {update ? 'Update Template' : 'Add Template'}
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

            <div className="grid grid-cols-1 gap-y-8">
              <div>
                <label className="block pb-1 text-sm font-medium text-gray-700">
                  Template Name
                </label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Template Name"
                  value={templateName}
                  onChange={(e) => {
                    for (let temp of templates) {
                      if (e.target.value === temp?.template_name) {
                        alert('template name already taken');
                        return;
                      }
                    }
                    setTemplateName(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="block pb-1 text-sm font-medium text-gray-700">
                  Template Description
                </label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Template Description"
                  value={templateDesc}
                  onChange={(e) => {
                    setTemplateDesc(e.target.value);
                  }}
                />
              </div>
              {dbPdfs.length !== 0 && (
                <div>
                  <label className="block pb-1 text-sm font-medium text-gray-700">
                    Already Attached Pdfs
                  </label>
                  {dbPdfs.map((dp, ind) => (
                    <div className="flex items-center justify-center my-2 gap-4">
                      <div className="w-[30%]">
                        <h2 className="text-black font-semibold capitalize line-clamp-1">
                          {dp?.file_name} :
                        </h2>
                      </div>
                      <div className="w-[70%] flex justify-start items-center flex-wrap gap-3">
                        <div className="flex justify-center items-center gap-2">
                          <input
                            type="checkbox"
                            role="switch"
                            id={`flexSwitch-db-pdf-wm-${ind}`}
                            onChange={() => {
                              handleSubBtns(`flexSwitch-db-pdf-wm-${ind}`);
                            }}
                          />
                          <label
                            htmlFor={`flexSwitch-db-pdf-wm-${ind}`}
                            className="text-black font-[600] cursor-pointer"
                          >
                            Watermark
                          </label>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                          <input
                            type="checkbox"
                            role="switch"
                            id={`flexSwitch-db-pdf-lb-${ind}`}
                            onChange={() => {
                              handleSubBtns(`flexSwitch-db-pdf-lb-${ind}`);
                            }}
                          />
                          <label
                            htmlFor={`flexSwitch-db-pdf-lb-${ind}`}
                            className="text-black font-[600] cursor-pointer"
                          >
                            Top Left Logo
                          </label>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                          <input
                            type="checkbox"
                            role="switch"
                            id={`flexSwitch-db-pdf-pn-${ind}`}
                            onChange={() => {
                              handleSubBtns(`flexSwitch-db-pdf-pn-${ind}`);
                            }}
                          />
                          <label
                            htmlFor={`flexSwitch-db-pdf-pn-${ind}`}
                            className="text-black font-[600] cursor-pointer"
                          >
                            Bottom Right Page No
                          </label>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                          <input
                            type="checkbox"
                            role="switch"
                            id={`flexSwitch-db-pdf-do-${ind}`}
                            onChange={() => {
                              handleSubBtns(`flexSwitch-db-pdf-do-${ind}`);
                            }}
                          />
                          <label
                            htmlFor={`flexSwitch-db-pdf-do-${ind}`}
                            className="text-black font-[600] cursor-pointer"
                          >
                            Download Option
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div>
                <div className="flex justify-between items-center">
                  <label className="block pb-1 text-sm font-medium text-gray-700">
                    Template Pdfs
                  </label>
                  <button
                    className="btn flex w-[20%]  text-sm capitalize justify-center items-center gap-2 rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    onClick={() => {
                      handlePdfsInputCnt();
                    }}
                  >
                    Add Pdfs <AddIcon />
                  </button>
                </div>
                {pdfsCnt.length !== 0 &&
                  pdfsCnt.map((data, ind) => (
                    <>
                      <div className="flex mt-2 space-x-2">
                        <input
                          type="text"
                          id={`pdf-title-${ind}`}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Pdf Title"
                        />
                        <input
                          type="file"
                          id={`add-pdfs-${ind}`}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Template Pdfs"
                          onChange={(e) => {
                            pdfFilesHandler(e, ind);
                          }}
                        />
                      </div>
                      {templatePdfs[ind] && (
                        <div className="flex items-center space-x-2">
                          <span>{templatePdfs[ind]?.name}</span>
                          <div>
                            <input
                              type="checkbox"
                              role="switch"
                              id={`flexSwitch-pdf-wm-${ind}`}
                              onChange={() => {
                                handleSubBtns(`flexSwitch-pdf-wm-${ind}`);
                              }}
                            />
                            <label htmlFor={`flexSwitch-pdf-wm-${ind}`}>
                              Watermark
                            </label>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              role="switch"
                              id={`flexSwitch-pdf-lb-${ind}`}
                              onChange={() => {
                                handleSubBtns(`flexSwitch-pdf-lb-${ind}`);
                              }}
                            />
                            <label htmlFor={`flexSwitch-pdf-lb-${ind}`}>
                              Top Left Logo
                            </label>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              role="switch"
                              id={`flexSwitch-pdf-pn-${ind}`}
                              onChange={() => {
                                handleSubBtns(`flexSwitch-pdf-pn-${ind}`);
                              }}
                            />
                            <label htmlFor={`flexSwitch-pdf-pn-${ind}`}>
                              Bottom Right Page No
                            </label>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              role="switch"
                              id={`flexSwitch-pdf-do-${ind}`}
                              onChange={() => {
                                handleSubBtns(`flexSwitch-pdf-do-${ind}`);
                              }}
                            />
                            <label htmlFor={`flexSwitch-pdf-do-${ind}`}>
                              Download Option
                            </label>
                          </div>
                        </div>
                      )}
                    </>
                  ))}
              </div>
              {dbZips.length !== 0 && (
                <div>
                  <label className="block pb-1 text-sm font-medium text-gray-700">
                    Already Attached Zips
                  </label>
                  {dbZips.map((dz, ind) => (
                    <div className="flex items-center space-x-2">
                      <span>{dz?.file_name}</span>
                      <div>
                        <input
                          type="checkbox"
                          role="switch"
                          id={`flexSwitch-db-zip-do-${ind}`}
                          onChange={() => {
                            handleSubBtns(`flexSwitch-db-zip-do-${ind}`);
                          }}
                        />
                        <label htmlFor={`flexSwitch-db-zip-do-${ind}`}>
                          Download Option
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div>
                <div className="flex justify-between items-center">
                  <label className="block pb-1 text-sm font-medium text-gray-700">
                    Template Zips
                  </label>
                  <button
                    className="btn flex w-[20%]  text-sm capitalize justify-center items-center gap-2 rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    onClick={() => {
                      handleZipsInputCnt();
                    }}
                  >
                    add zips <AddIcon />
                  </button>
                </div>
                {zipsCnt.length !== 0 &&
                  zipsCnt.map((data, ind) => (
                    <>
                      <div className="flex mt-2 space-x-2">
                        <input
                          type="text"
                          id={`zip-title-${ind}`}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Zip Title"
                        />
                        <input
                          type="file"
                          id={`add-zips-${ind}`}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Template Zips"
                          onChange={(e) => {
                            zipFilesHandler(e, ind);
                          }}
                        />
                      </div>
                      {templateZips[ind] && (
                        <div className="flex items-center space-x-2">
                          <span>{templateZips[ind]?.name}</span>
                          <div>
                            <input
                              type="checkbox"
                              role="switch"
                              id={`flexSwitch-zip-do-${ind}`}
                              onChange={() => {
                                handleSubBtns(`flexSwitch-zip-do-${ind}`);
                              }}
                            />
                            <label htmlFor={`flexSwitch-zip-do-${ind}`}>
                              Download Option
                            </label>
                          </div>
                        </div>
                      )}
                    </>
                  ))}
              </div>
              {dbLinks.length !== 0 && (
                <div>
                  <label className="block pb-1 text-sm font-medium text-gray-700">
                    Already Attached Links
                  </label>
                  {dbLinks.map((dl, ind) => (
                    <div className="flex space-x-2">
                      <input
                        placeholder="db link preview name"
                        id={`db-link-name-${ind}`}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <input
                        placeholder="db link url"
                        id={`db-link-url-${ind}`}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  ))}
                </div>
              )}
              <div>
                <div className="flex justify-between items-center">
                  <label className="block pb-1 text-sm font-medium text-gray-700">
                    Template Links
                  </label>
                  <button
                    className="btn flex w-[20%]  text-sm capitalize justify-center items-center gap-2 rounded-lg bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    onClick={() => {
                      handleLinks();
                    }}
                  >
                    add links <AddIcon />
                  </button>
                </div>
                {links.length !== 0 &&
                  links.map((data, ind) => (
                    <div className="flex mt-2 space-x-2">
                      <input
                        type="text"
                        id={`link-name-${ind}`}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Template Links Name"
                      />
                      <input
                        type="text"
                        id={`link-url-${ind}`}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Template Links Url"
                      />
                    </div>
                  ))}
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

export default FileTable;
