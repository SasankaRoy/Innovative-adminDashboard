import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import banner from '../../assets/banner.png';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';
import DownloadIcon from '@mui/icons-material/Download';
import { verifyToken } from '../../api-calls/apicalls';

function ViewFileTemplate() {
  const location = useLocation();
  const { templateData } = location.state;
  const navigate = useNavigate();

  const handleDownloadZip = (clickedZip: any) => {
    templateData?.template_zips?.forEach((zip: any) => {
      if (zip._id === clickedZip._id) {
        saveAs(zip?.url, `${zip?.file_name}`);
      }
    });
  };

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
      <div className="p-4 h-screen w-full">
        <div
          style={{ backgroundImage: `url(${banner})` }}
          className="bg-cover w-full h-[58%] rounded-xl"
        >
          <div className="flex justify-center items-center h-1/2">
            <div className="text-white text-3xl capitalize tracking-wide font-[500]">
              {templateData?.template_name}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex justify-center">
              {templateData?.template_desc}
            </div>
          </div>
        </div>
        <h2 className="text-center my-5 text-4xl font-semibold text-black">
           Downloads & Links 
        </h2>
        <div className="grid grid-cols-3 gap-5 my-3 w-[95%] mx-auto">

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
        </div>
      </div>
    </div>
  );
}

export default ViewFileTemplate;
