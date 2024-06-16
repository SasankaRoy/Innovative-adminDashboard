import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { fetchAboutUs } from '../api-calls/apicalls';
import AboutUsTable from '../components/Tables/aboutUs/AboutUsTable';


function AboutUsManagement() {
  

    const [aboutUs, setAboutUs] = useState<any[]|undefined>(undefined);

    const navigate = useNavigate();
  
    useEffect(() => {
      const fetcher = async () => {
        let ausData = await fetchAboutUs();
        // console.log("27", usersData)
        if (ausData?.message === "jwt expired") {
          return navigate("/");
        } else {
          setAboutUs([...ausData]);
        }
      };
  
      fetcher();
  
    }, [])
  
    if(aboutUs)
      {
    return (
      <DefaultLayout>
        {/* <Breadcrumb pageName="Category Management" /> */}
  
        <div className="flex flex-col gap-10">
          <AboutUsTable pagetitle="AboutUs" aboutUsData={aboutUs} />
        </div>
      </DefaultLayout>
    );}
  
}

export default AboutUsManagement