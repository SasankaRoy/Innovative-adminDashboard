import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { useState, useEffect, useRef } from 'react';
import Watermark from './Watermark';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { verifyToken } from '../../api-calls/apicalls';
import generatePDF from 'react-to-pdf';
import banner from '../../assets/banner.png';
import 'react-pdf/dist/Page/TextLayer.css';
import './viewFileTemplate.css';
import html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';

function PdfDetails() {
  const [numPages, setNumPages] = useState<any>(null);
  const [pdfUrl, setPdfUrl] = useState(undefined);
  const location = useLocation();
  const { template, clickedPdf } = location.state;
  const navigate = useNavigate();
  const downloadRef = useRef(null);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
    const tempDoc = document.querySelectorAll('.react-pdf__Document');
    tempDoc.forEach((t: any) => {
      t.style.display = 'flex';
      t.style.justifyContent = 'center';
    });
  }

  function removeTextLayerOffset() {
    const textLayers = document.querySelectorAll(
      '.react-pdf__Page__textContent',
    );
    textLayers.forEach((layer: any) => {
      const { style } = layer;
      style.top = '0';
      style.left = '0';
      style.transform = '';
      style.display = 'none';
    });

    const tempCanvas = document.querySelectorAll('.react-pdf__Page__canvas');
    tempCanvas.forEach((t: any) => {
      // t.style.border = '1px solid #999595';
      t.style.width = '100%'
      t.style.margin = '0 auto';
    });
  }

  const handleGeneratePDF = async () => {
 
   
    const input: any = document.getElementById('content');
    
    const pageInput:any=document.getElementById(`after-break-${0}`);

    let afterBreak:any=[]
    for(let i=0;i<numPages;i++){
       afterBreak.push(`#after-break-${i}`)
    }
    
html2pdf()
  .set({
    pagebreak: {
      mode: ['css', 'legacy'],
      after: [...afterBreak],
    },
    margin: [0, 0, 0, 0],
    filename: `${clickedPdf?.file_name}`,
    html2canvas: { scale: 4, useCORS: true, dpi: 192, letterRendering: true },
    jsPDF: { unit: "cm", format: [pageInput.offsetHeight/37, pageInput.offsetWidth/37], orientation: "portrait" },
  })
  .from(input)
  .save()


                      


  
};

  useEffect(() => {
    console.log("000",clickedPdf)
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
    const verifier = async () => {
      const verifiedTokenData = await verifyToken();
      if (verifiedTokenData?.message === 'jwt expired') {
        return navigate('/');
      } else {
        return;
      }
    };

    verifier();

    template?.template_pdfs?.forEach((pdf: any) => {
      if (pdf._id === clickedPdf._id) {
        // console.log("url",pdf.url)
        setPdfUrl(pdf?.url);
      }
    });

    // const container = document.querySelector(".pdf-container");
    // const handleContextMenu = (event: any) => {
    //   event.preventDefault();
    // };
    // if (container) {
    //   container.addEventListener("contextmenu", handleContextMenu);
    // }
    // return () => {
    //   if (container) {
    //     container.removeEventListener("contextmenu", handleContextMenu);
    //   }
    // };
  }, []);

  if (pdfUrl) {
    return (
      <div className="flex flex-col h-screen">
        <div className="flex justify-center items-center h-screen">
          <div className="w-full p-5 h-screen overflow-y-auto">
            <div
              className="flex justify-center items-center h-1/2 bg-cover"
              style={{
                backgroundImage: `url(${banner})`,
                backgroundSize: 'cover',
              }}
            >
              <h1 className="text-3xl text-white">{clickedPdf?.file_name}</h1>
            </div>

            <div className="mt-5">
              <div className="flex justify-end">
                {clickedPdf?.pdf_downloadable ? (
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() =>
                      handleGeneratePDF()

                    }
                  >
                    Download PDF
                  </button>
                  
                ) : (
                  ''
                )}
              </div>
              <div className="pdf-container mt-5 mb-5 h-screen">
                <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                  <div id="content">
                 
                    {Array.from({ length: numPages }, (_, index) => (
                     <div  id={`after-break-${index}`} className='mt-3'>
                      <Page
                     
                        pageNumber={index + 1}
                        onLoadSuccess={removeTextLayerOffset}
                      >
                         
                        {clickedPdf?.top_left_logo ? (
                          <div className="flex justify-start">
                            <img
                              className="View_file_template_pdf_logo"
                              src={logo}
                              alt="logo"
                            />
                          </div>
                        ) : (
                          ''
                        )}
                        {clickedPdf?.watermark ? <Watermark /> : ''}
                        {clickedPdf?.bottom_right_page_no ? (
                          <div className="flex justify-end">
                            <p className="View_file_template_pdf_page_no">
                              Page {index + 1} of {numPages}
                            </p>
                          </div>
                        ) : (
                          ''
                        )}
                        
                      </Page>
                       </div>
                    ))}
                  </div>
                </Document>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PdfDetails;
