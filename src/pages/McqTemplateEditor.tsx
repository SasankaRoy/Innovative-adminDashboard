import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import McqTable from '../components/Tables/McqTable';
import { useEffect, useState } from 'react';
import { fetchMcqTemplates } from '../api-calls/apicalls';
import { useNavigate } from 'react-router-dom';


const McqTemplateEditor = () => {

  const [mcqTemplates, setMcqTemplates] = useState<any[]|undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    // setWindowWidth(window.innerWidth);
    // window.addEventListener("resize", updateWindowWidth);

    const fetcher = async () => {
      let mcqTemplatesData : any = await fetchMcqTemplates();
      if (mcqTemplatesData?.message === "jwt expired"||mcqTemplatesData?.message ==="jwt is not present") {
        return navigate("/");
      } else {
        // console.log("kool",mcqTemplatesData)
       
      setMcqTemplates([...mcqTemplatesData]);
    }
      
    }

    
    fetcher();

    // return () => {
    //   window.removeEventListener("resize", updateWindowWidth);
    // };
  }, []);

  if(mcqTemplates)
  {return (
    <DefaultLayout>
      {/* <Breadcrumb pageName="MCQs Template Editor" /> */}

      <div className="flex flex-col gap-10">
        <McqTable pagetitle='MCQs Template' mcqAllData={mcqTemplates}/>
      </div>
    </DefaultLayout>
  );}
};
export default McqTemplateEditor;
