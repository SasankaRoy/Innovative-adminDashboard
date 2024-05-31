import React, { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import banner from "../../assets/banner.png";
import { Link } from "react-router-dom";
import { saveAs } from 'file-saver';
import DownloadIcon from '@mui/icons-material/Download';
import { verifyToken } from '../../api-calls/apicalls';

function ViewFileTemplate() {
    const location = useLocation();
    const { templateData } = location.state;
    const navigate = useNavigate();

    const handleDownloadZip = (clickedZip:any) => {
        templateData?.template_zips?.forEach((zip:any) => {
            if (zip._id === clickedZip._id) {
                saveAs(zip?.url, `${zip?.file_name}`);
            }
        });
    };

    useEffect(() => {
        const verifier = async () => {
            const verifiedTokenData = await verifyToken();
            if (verifiedTokenData?.message === "jwt expired") {
                return navigate("/");
            } else {
                return;
            }
        };
        verifier();
    }, []);

    return (
        <div className="flex">
            <div className="p-4 h-screen w-full">
                <div style={{ backgroundImage: `url(${banner})` }} className="bg-cover w-full h-screen">
                    <div className='flex justify-center items-center h-1/2'>
                        <div className='text-white text-3xl'>{templateData?.template_name}</div>
                    </div>
                    <div className='flex justify-center'>
                        <div className='flex justify-center'>{templateData?.template_desc}</div>
                    </div>
                </div>
                <div className='mt-4'>
                    <h5 className='flex justify-center font-bold'>Pdfs</h5>
                    {templateData && templateData?.template_pdfs?.length !== 0 ?
                        templateData.template_pdfs.map((pdf:any) => (
                            <div className='mt-3 flex justify-center'>
                                {pdf?.file_name}
                                <Link to="/pdfDetails" state={{ template: templateData, clickedPdf: pdf }} className='ms-3 font-semibold  underline'>details</Link>
                            </div>
                        )) : <p>no data</p>
                    }
                </div>
                <hr />
                <div className='mt-5'>
                    <h5 className='flex justify-center font-bold'>Zips</h5>
                  
                    {templateData && templateData?.template_zips?.length !== 0 ?
                        templateData.template_zips.map((zip:any) => (
                            <div className='mt-3 flex justify-center'>
                                {zip?.file_name}
                                <DownloadIcon className='ms-3 cursor-pointer' onClick={() => { handleDownloadZip(zip) }} />
                            </div>
                        )) : <p>no data</p>
                    }
                </div>
                <hr />
                <div className='mt-5'>
                    <h5 className='flex justify-center font-bold'>Links</h5>
                    {templateData && templateData?.template_links?.length !== 0 ?
                        templateData.template_links.map((link:any) => (
                            <div className='mt-3 flex justify-center'>
                                {link?.link_preview_name}
                                <a href={`${link?.link_url}`} className='ms-3 cursor-pointer'>{link?.link_url}</a>
                            </div>
                        )) : <p>no data</p>
                    }
                </div>
            </div>
        </div>
    );
}

export default ViewFileTemplate;