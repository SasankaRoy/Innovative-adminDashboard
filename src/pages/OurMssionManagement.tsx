import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { fetchOurMission } from '../api-calls/apicalls';
import OurMissionTable from '../components/Tables/ourMssion/OurMissionTable';

function OurMissionManagement() {
  
    const [ourMission, setOurMission] = useState<any[]|undefined>(undefined);

    const navigate = useNavigate();
  
    useEffect(() => {
      const fetcher = async () => {
        let omData = await fetchOurMission();
        // console.log("27", usersData)
        if (omData?.message === "jwt expired") {
          return navigate("/");
        } else {
          setOurMission([...omData]);
        }
      };
  
      fetcher();
  
    }, [])
  
    if(ourMission)
      {
    return (
      <DefaultLayout>
        {/* <Breadcrumb pageName="Category Management" /> */}
  
        <div className="flex flex-col gap-10">
          <OurMissionTable pagetitle="OurMission" ourMissionData={ourMission} />
        </div>
      </DefaultLayout>
    );}
}

export default OurMissionManagement