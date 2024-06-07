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

        
        <div className=" w-[85%] mx-auto my-4 p-2">
          {templateData && templateData?.template_pdfs?.length !== 0 && (
            <div className="my-4">
              <AccordionPDF
                templateData={templateData}
                pdfData={templateData.template_pdfs}
              />
            </div>
          )}

          {templateData && templateData?.template_zips?.length !== 0 && (
            <div className="my-4">
              <AccordionZip
                templateData={templateData}
                zipData={templateData.template_zips}
              />
            </div>
          )}

          {templateData && templateData?.template_links?.length !== 0 && (
            <div className="my-4">
              <AccordionWebLink linkData={templateData.template_links} />
            </div>
          )}
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

export function AccordionPDF({ templateData, pdfData }: any) {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);

  return (
    <>
      {pdfData.map((cur: any, id: any) => (
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
            <h2 className="text-[#1155cc] font-[Bitter] text-lg font-[500] capitalize">
              {cur.pdf_title}
            </h2>
          </AccordionHeader>
          <AccordionBody className="px-4">
            <Link
              to="/pdfDetails"
              state={{ template: templateData, clickedPdf: cur }}
              className="text-base font-[600] text-black underline underline-offset-4 hover:text-blue-500 transition-all duration-150 ease-out"
            >
              {cur.file_name.split('.')[0]}
            </Link>
          </AccordionBody>
        </Accordion>
      ))}
    </>
  );
}

export const AccordionZip = ({ templateData, zipData }: any) => {
  console.log(zipData);
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
      {zipData.map((cur: any, id: any) => (
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
            <h2 className="text-[#1155cc] font-[Bitter] text-lg font-[500] capitalize">
              {cur.zip_title}
            </h2>
          </AccordionHeader>
          <AccordionBody className="px-4">
            <p
              onClick={() => handleDownloadZip(cur)}
              className="text-base font-[600] text-black cursor-pointer underline underline-offset-4 hover:text-blue-500 transition-all duration-150 ease-out"
            >
              {cur.file_name.split('.')[0]}
            </p>
          </AccordionBody>
        </Accordion>
      ))}
    </>
  );
};

export const AccordionWebLink = ({ linkData }: any) => {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);
  return (
    <>
      {linkData.map((cur: any, id: any) => (
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
            <h2 className="text-[#1155cc] font-[Bitter] text-lg font-[500] capitalize">
              {cur.link_preview_name}
            </h2>
          </AccordionHeader>
          <AccordionBody className="px-4">
            <Link
              to={cur.link_url}
              className="text-base font-[600] text-black underline underline-offset-4 hover:text-blue-500 transition-all duration-150 ease-out"
            >
              {cur.link_url}
            </Link>
          </AccordionBody>
        </Accordion>
      ))}
    </>
  );
};
