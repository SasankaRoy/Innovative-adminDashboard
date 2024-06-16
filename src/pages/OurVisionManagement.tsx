import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { fetchOurVision } from '../api-calls/apicalls';
import OurVisionTable from '../components/Tables/ourVision/OurVisionTable';

function OurVisionManagement() {
  
    const [ourVision, setOurVision] = useState<any[]|undefined>(undefined);

    const navigate = useNavigate();
  
    useEffect(() => {
      const fetcher = async () => {
        let ovData = await fetchOurVision();
        // console.log("27", usersData)
        if (ovData?.message === "jwt expired") {
          return navigate("/");
        } else {
          setOurVision([...ovData]);
        }
      };
  
      fetcher();
  
    }, [])
  
    if(ourVision)
      {
    return (
      <DefaultLayout>
        {/* <Breadcrumb pageName="Category Management" /> */}
  
        <div className="flex flex-col gap-10">
          <OurVisionTable pagetitle="OurVision" ourVisionData={ourVision} />
        </div>
      </DefaultLayout>
    );}
}

export default OurVisionManagement