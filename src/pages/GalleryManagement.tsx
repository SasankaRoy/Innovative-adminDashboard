import { useNavigate } from 'react-router-dom';
import GalleryTable from '../components/Tables/GalleryTable';
import DefaultLayout from '../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { fetchGalleries } from '../api-calls/apicalls';

const GalleryManagement = () => {
  const [galleryFiles, setGalleryFiles] = useState<any[]|undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    const fetcher = async () => {
      let galleryData = await fetchGalleries();
      // console.log("27", usersData)
      if (galleryData?.message === "jwt expired") {
        return navigate("/");
      } else {
        setGalleryFiles([...galleryData]);
      }
    };

    fetcher();

  }, [])

  if(galleryFiles)
    {
  return (
    <DefaultLayout>
      {/* <Breadcrumb pageName="Gallery Management" /> */}

      <div className="flex flex-col gap-10">
        <GalleryTable title="Gallery" galleryAllData={galleryFiles} />
      </div>
    </DefaultLayout>
  )}
};

export default GalleryManagement;
