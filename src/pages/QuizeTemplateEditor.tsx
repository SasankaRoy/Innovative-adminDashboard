import { useEffect, useState } from "react"
import QuizTable from "../components/Tables/QuizTable"
import DefaultLayout from "../layout/DefaultLayout"
import { useNavigate } from "react-router-dom"
import { fetchQuizTemplates } from "../api-calls/apicalls"


const QuizeTemplateEditor = () => {
  const [quizTemplates, setQuizTemplates] = useState<any[]|undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    // setWindowWidth(window.innerWidth);
    // window.addEventListener("resize", updateWindowWidth);

    const fetcher = async () => {
      let quizTemplatesData : any = await fetchQuizTemplates();
      if (quizTemplatesData?.message === "jwt expired"||quizTemplatesData?.message ==="jwt is not present") {
        return navigate("/");
      } else {
        // console.log("kool",mcqTemplatesData)
       
      setQuizTemplates([...quizTemplatesData]);
    }
      
    }

    
    fetcher();

    // return () => {
    //   window.removeEventListener("resize", updateWindowWidth);
    // };
  }, []);

  if(quizTemplates)
  {
  return (
    <DefaultLayout>
    {/* <Breadcrumb pageName="Quzie Template Editor" /> */}

    <div className="flex flex-col gap-10">
      <QuizTable pagetitle='Quzie Template' quizAllData={quizTemplates}/>
    </div>
  </DefaultLayout>
  )}
}

export default QuizeTemplateEditor