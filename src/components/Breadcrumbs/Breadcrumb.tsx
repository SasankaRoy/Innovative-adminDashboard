import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
// import { CreateModel } from '../../common/CreateModel/CreateModel';
import { UpdateModel } from '../../common/UpdateModel/UpdateMcqModel';
import { UpdateInvoiceManagement } from '../../common/UpdateModel/UpdateInvoiceManagementModel';
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  const [isCreateModel, setIsCreateModel] = useState(false);

  

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {pageName}
        </h2>

        <nav className="flex justify-center items-center  gap-5 w-[40%]">
          <button onClick={()=>setIsCreateModel(true)} className="flex w-[25%] justify-center rounded-lg bg-primary py-2 font-medium text-gray hover:bg-opacity-90">
            <AddIcon />
            Create
          </button>
          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium" to="/">
                Dashboard /
              </Link>
            </li>
            <li className="font-medium text-primary">{pageName}</li>
          </ol>
        </nav>
      </div>

      {
        isCreateModel && pageName.split(' ')[0] === 'User' &&(
          <UpdateModel setIsCreateModel={setIsCreateModel} pagetitle={pageName.split(' ')[0]} />
        )
      }
       {
        isCreateModel && pageName.split(' ')[0] === 'Mcq' &&(
          <UpdateModel setIsCreateModel={setIsCreateModel} pagetitle={pageName.split(' ')[0]} />
        )
      }
       {
        isCreateModel && pageName.split(' ')[0] === 'Invoice' &&(
          <UpdateInvoiceManagement setIsCreateModel={setIsCreateModel} pagetitle={pageName.split(' ')[0]} />
        )
      }
    </>
  );
};

export default Breadcrumb;
