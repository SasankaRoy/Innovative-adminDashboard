import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import banner from '../../assets/banner.png';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';
import DownloadIcon from '@mui/icons-material/Download';
import { verifyToken } from '../../api-calls/apicalls';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';

function ViewFileTemplate() {
  const location = useLocation();
  const { templateData } = location.state;
  const navigate = useNavigate();

  // const handleDownloadZip = (clickedZip: any) => {
  //   templateData?.template_zips?.forEach((zip: any) => {
  //     if (zip._id === clickedZip._id) {
  //       saveAs(zip?.url, `${zip?.file_name}`);
  //     }
  //   });
  // };

  useEffect(() => {
    const verifier = async () => {
      const verifiedTokenData = await verifyToken();
      if (verifiedTokenData?.message === 'jwt expired') {
        return navigate('/');
      } else {
        return;
      }
    };
    verifier();
  }, []);

  return (
    <div className="flex">
      <div className="h-screen w-full">
        <div
          style={{ backgroundImage: `url(${banner})` }}
          className="bg-cover w-full h-[50%] rounded-xl"
        >
          <div className="flex justify-center items-center h-full">
            <div className="text-white text-4xl capitalize tracking-wide font-[600]">
              {templateData?.template_name}
            </div>
          </div>
        </div>
        <div className="flex justify-center self-end bg-[#3a3a3a]">
          <div className="flex flex-col justify-start gap-3 w-[85%] py-3 px-4 ">
            <p className="text-white font-[500] text-xl">
              {templateData?.template_desc}
            </p>
          </div>
        </div>

        {/* <div className="grid grid-cols-3 gap-5 my-3 w-[95%] mx-auto">
          <div className="mt-4 px-6 py-8 downloadsAndlinks bg-[#eff2f7] rounded-lg">
            <h5 className="flex justify-center font-bold capitalize text-3xl text-black">
              Pdfs
            </h5>
            <div className="flex flex-col gap-3 justify-start items-start w-full">
              {templateData && templateData?.template_pdfs?.length !== 0 ? (
                templateData.template_pdfs.map((pdf: any) => (
                  <div className="w-full flex justify-between items-center hover:bg-opacity-95 transition-all duration-200 ease-in-out">
                    <h3 className="text-sm capitalize font-medium text-black">
                      {pdf?.file_name}
                    </h3>
                    <Link
                      to="/pdfDetails"
                      state={{ template: templateData, clickedPdf: pdf }}
                      className="font-semibold w-[20%] bg-[#3c50e0] text-white hover:text-[#3c50e0] hover:bg-white transition-all duration-200 ease-in-out text-sm flex justify-center items-center capitalize py-2 rounded-md shadow-md"
                    >
                      details
                    </Link>
                  </div>
                ))
              ) : (
                <p>no data</p>
              )}
            </div>
          </div>

          <div className="mt-4 px-6 py-8   downloadsAndlinks bg-[#eff2f7] rounded-lg">
            <h5 className="flex justify-center font-bold capitalize text-3xl text-black">
              Zips
            </h5>
            <div className="flex flex-col justify-start items-start gap-3">
              {templateData && templateData?.template_zips?.length !== 0 ? (
                templateData.template_zips.map((zip: any) => (
                  <div className="flex justify-between items-center w-full">
                    <h3 className="text-sm capitalize font-medium text-black">
                      {zip?.file_name}
                    </h3>
                    <div className="bg-[#3c50e0] text-white cursor-pointer hover:bg-white hover:text-[#3c50e0] transition-all duration-200 ease-in-out w-[10%] flex justify-center items-center py-2 rounded-lg shadow-md">
                      <DownloadIcon
                        onClick={() => {
                          handleDownloadZip(zip);
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p>no data</p>
              )}
            </div>
          </div>

          <div className="mt-4 px-6 py-8  downloadsAndlinks bg-[#eff2f7] rounded-lg">
            <h5 className="flex justify-center font-bold capitalize text-3xl text-black">
              Links
            </h5>
            <div className="flex flex-col justify-start items-center gap-4">
              {templateData && templateData?.template_links?.length !== 0 ? (
                templateData.template_links.map((link: any) => (
                  <div className="w-full flex justify-between items-center">
                    <h3 className="text-sm capitalize font-medium text-black">
                      {link?.link_preview_name}
                    </h3>
                    <Link
                      to={`${link?.link_url}`}
                      className="cursor-pointer font-[600] text-sm w-[20%] py-2 text-white flex justify-center items-center rounded-lg shadow-md bg-[#3c50e0]  hover:bg-white hover:text-[#3c50e0] transition-all duration-200 ease-in-out delay-150"
                    >
                      Visit
                    </Link>
                  </div>
                ))
              ) : (
                <p>no data</p>
              )}
            </div>
          </div>
        </div> */}

        <div className=" w-[85%] mx-auto my-4 p-2">
          <div className="my-4">
            <h2 className="text-3xl font-[600] text-black  my-2">Pdf's</h2>
            <AccordionCustomIcon
              templateData={templateData}
              Data={templateData.template_pdfs}
            />
          </div>

          <div className="my-4">
            <h2 className="text-3xl font-[600] text-black my-2">
              Dowload Zip's
            </h2>
            <AccordionCustomIcon
              templateData={templateData}
              Data={templateData.template_zips}
            />
          </div>

          {/* <div className="my-4">
            <h2 className="text-3xl font-[600] text-black my-2">
              Web Links
            </h2>
            <AccordionCustomIcon
              templateData={templateData}
              Data={templateData.template_links}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ViewFileTemplate;

function Icon({ id, open }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? 'rotate-180' : ''} h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export function AccordionCustomIcon({ templateData, Data }: any) {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);

  const handleDownloadZip = (clickedZip: any) => {
    templateData?.template_zips?.forEach((zip: any) => {
      if (zip._id === clickedZip._id) {
        saveAs(zip?.url, `${zip?.file_name}`);
      }
    });
  };

  return (
    <>
      {Data.map((cur: any, id: any) => (
        // @ts-ignore
        <Accordion
          key={id}
          open={open === id + 1}
          icon={<Icon id={id + 1} open={open} />}
        >
          <AccordionHeader
            // @ts-ignore
            onClick={() => handleOpen(id + 1)}
          >
            <h2 className="text-black text-xl font-[500] capitalize">
              {cur.file_name.split('.')[0]}
            </h2>
          </AccordionHeader>
          <AccordionBody className="px-4">
            {cur.file_name.split('.')[1] === 'zip' && (
              <div className="bg-[#3c50e0] text-white cursor-pointer hover:bg-white hover:text-[#3c50e0] transition-all duration-200 ease-in-out w-[10%] flex justify-center items-center py-2 rounded-lg shadow-md">
                <DownloadIcon
                  onClick={() => {
                    handleDownloadZip(cur);
                  }}
                />
              </div>
            )}

            {cur.file_name.split('.')[1] === 'pdf' && (
              <Link
                to="/pdfDetails"
                state={{ template: templateData, clickedPdf: cur }}
                className="text-lg font-[600] text-blue-800"
              >
                View & download
              </Link>
            )}
          </AccordionBody>
        </Accordion>
      ))}

      {/* <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          How to use Material Tailwind?
        </AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at.
          We&apos;re constantly growing. We&apos;re constantly making mistakes.
          We&apos;re constantly trying to express ourselves and actualize our
          dreams.
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          What can I do with Material Tailwind?
        </AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at.
          We&apos;re constantly growing. We&apos;re constantly making mistakes.
          We&apos;re constantly trying to express ourselves and actualize our
          dreams.
        </AccordionBody>
      </Accordion> */}
    </>
  );
}
