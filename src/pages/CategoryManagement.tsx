import { useNavigate } from 'react-router-dom';
import CategoryTable from '../components/Tables/CategoryTable';
import DefaultLayout from '../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { fetchCategories } from '../api-calls/apicalls';

export const CategoryManagement = () => {
  const [categories, setCategories] = useState<any[]|undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    const fetcher = async () => {
      let categoriesData = await fetchCategories();
      // console.log("27", usersData)
      if (categoriesData?.message === "jwt expired") {
        return navigate("/");
      } else {
        setCategories([...categoriesData]);
      }
    };

    fetcher();

  }, [])

  if(categories)
    {
  return (
    <DefaultLayout>
      {/* <Breadcrumb pageName="Category Management" /> */}

      <div className="flex flex-col gap-10">
        <CategoryTable pagetitle="Category" allCategoryData={categories} />
      </div>
    </DefaultLayout>
  );}
};
