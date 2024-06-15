import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { fetchTestimonials } from '../api-calls/apicalls';
import TestimonialTable from '../components/Tables/testimonial/TestimonialTable';



function TestimonialManagement() {
    const [testimonials, setTestimonials] = useState<any[]|undefined>(undefined);

    const navigate = useNavigate();
  
    useEffect(() => {
      const fetcher = async () => {
        let testiData = await fetchTestimonials();
        // console.log("27", usersData)
        if (testiData?.message === "jwt expired") {
          return navigate("/");
        } else {
          setTestimonials([...testiData]);
        }
      };
  
      fetcher();
  
    }, [])
  
    if(testimonials)
      {
    return (
      <DefaultLayout>
        {/* <Breadcrumb pageName="Category Management" /> */}
  
        <div className="flex flex-col gap-10">
          <TestimonialTable pagetitle="Testimonial" allTestimonialsData={testimonials} />
        </div>
      </DefaultLayout>
    );}
}

export default TestimonialManagement