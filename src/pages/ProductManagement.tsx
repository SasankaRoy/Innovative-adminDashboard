import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ProductTable from '../components/Tables/ProductTable/ProductTable';
import DefaultLayout from '../layout/DefaultLayout';
import { useNavigate } from 'react-router-dom';
import { fetchCategories, fetchFileTemplates, fetchMcqTemplates, fetchProducts, fetchQuizTemplates } from '../api-calls/apicalls';


const ProductManagement = () => {
  const [products, setProducts] = useState<any[]|undefined>(undefined);
  const [quizTemplates, setQuizTemplates] = useState<any[]|undefined>([]);
  const [mcqTemplates, setMcqTemplates] = useState<any|undefined>([]);
  const [fileTemplates, setFileTemplates] = useState<any|undefined>([]);
  const [categories, setCategories] = useState<any|undefined>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetcher = async () => {

      let categories:any = await fetchCategories();
      if (categories?.message === "jwt expired") {
          return navigate("/");
      } else {
          setCategories([...categories]);
      }

      let templatesData :any= await fetchFileTemplates();
      if (templatesData?.message === "jwt expired") {
          return navigate("/");
      } else {
          setFileTemplates([...templatesData]);
      }

      let quizzesData = await fetchQuizTemplates();
      if (quizzesData?.message === "jwt expired") {
          return navigate("/");
      } else {
          setQuizTemplates([...quizzesData]);
      }

      let mcqsData = await fetchMcqTemplates();
      if (mcqsData?.message === "jwt expired") {
          return navigate("/");
      } else {
          setMcqTemplates([...mcqsData]);
      }

      let productData = await fetchProducts();
      // console.log("27", usersData)
      if (productData?.message === "jwt expired") {
        return navigate("/");
      } else {
        setProducts([...productData]);
      }
    };

    fetcher();

  }, [])

  if(fileTemplates&&mcqTemplates&&quizTemplates&&products&&categories)
{  return (
    <>
      <DefaultLayout>
        {/* <Breadcrumb pageName="Product Management" /> */}
        <div className="flex flex-col gap-10">
          <ProductTable  allFiles={fileTemplates} allMcqs={mcqTemplates} allQuizzes={quizTemplates} allProductData={products} allCategories={categories}/>
        </div>
      </DefaultLayout>
    </>
  );}
};

export default ProductManagement;
