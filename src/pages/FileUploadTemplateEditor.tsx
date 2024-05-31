import DefaultLayout from '../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { fetchFileTemplates } from '../api-calls/apicalls';
import { useNavigate } from 'react-router-dom';
import FileTable from '../components/Tables/FileTable';


const FileTemplateEditor = () => {

  const [fileTemplates, setFileTemplates] = useState<any[]|undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    // setWindowWidth(window.innerWidth);
    // window.addEventListener("resize", updateWindowWidth);

    const fetcher = async () => {
      let fileTemplatesData : any = await fetchFileTemplates();
      if (fileTemplatesData?.message === "jwt expired"||fileTemplatesData?.message ==="jwt is not present") {
        return navigate("/");
      } else {
        // console.log("kool",mcqTemplatesData)
       
      setFileTemplates([...fileTemplatesData]);
    }
      
    }

    
    fetcher();

    // return () => {
    //   window.removeEventListener("resize", updateWindowWidth);
    // };
  }, []);

  if(fileTemplates)
  {return (
    <DefaultLayout>
      {/* <Breadcrumb pageName="MCQs Template Editor" /> */}

      <div className="flex flex-col gap-10">
        <FileTable pagetitle='File Template' fileAllData={fileTemplates}/>
      </div>
    </DefaultLayout>
  );}
};
export default FileTemplateEditor;
