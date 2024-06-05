import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package } from '../../types/package';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { CreateModel } from '../../common/CreateModel/CreateModel';
import { UpdateInvoiceManagement } from '../../common/UpdateModel/UpdateInvoiceManagementModel';
// import { CreateGalleryModel } from '../../common/CreateModel/CreateGalleryModel';
// import { CreateProductModel } from '../../common/CreateModel/CreateProductModel';
// import { CreateCategoryModel } from '../../common/CreateModel/CreateCategoryModel';
// import { CreateTrainingModel } from '../../common/CreateModel/CreateTrainingModel';

const packageData: Package[] = [
  {
    name: '1',
    price: 0.0,
    invoiceDate: `Maths aptitude test paper`,
    status: 'Paid',
  },
  {
    name: '1',
    price: 59.0,
    invoiceDate: `Maths aptitude test paper`,
    status: 'Paid',
  },
  {
    name: '3',
    price: 99.0,
    invoiceDate: `Maths aptitude test paper`,
    status: 'Unpaid',
  },
  {
    name: '4',
    price: 59.0,
    invoiceDate: `Maths aptitude test paper`,
    status: 'Pending',
  },
];

const InvoiceFile = ({ pagetitle }: any) => {
  const [isCreateModel, setIsCreateModel] = useState(false);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-bold text-black dark:text-white xl:pl-11">
                  Serial No.
                </th>
                <th className="min-w-[150px] py-4 px-4 font-bold text-black dark:text-white">
                  {pagetitle} Name
                </th>

                <th className="py-4 px-4 font-bold text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {packageData.map((packageItem, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-2 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {packageItem.name}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black font-medium dark:text-white">
                      {packageItem.invoiceDate}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        onClick={() => setIsCreateModel(true)}
                        className="h-9 w-9 flex justify-center items-center border border-[#3c50e0] rounded-md hover:text-[#3c50e0] transition-all duration-150 ease-in-out"
                      >
                        <EditRoundedIcon />
                      </button>
                      <button className="h-9 w-9 flex justify-center items-center border border-[#dc3545] rounded-md hover:text-[#dc3545] transition-all duration-150 ease-in-out">
                        <DeleteRoundedIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isCreateModel &&
      (pagetitle.split(' ')[0] === 'Invoice')&& (
        <UpdateInvoiceManagement
          setIsCreateModel={setIsCreateModel}
          pagetitle={pagetitle}
        />
      ) 

      }

      {/* {isCreateModel && pagetitle === 'Gallery' && (
        <CreateGalleryModel
          setIsCreateModel={setIsCreateModel}
          pagetitle={pagetitle}
        />
      )}
      {isCreateModel &&
      (pagetitle.split(' ')[0] === 'MCQs' ||
        pagetitle.split(' ')[0] === 'Quzie') ? (
        <CreateModel
          setIsCreateModel={setIsCreateModel}
          pagetitle={pagetitle}
        />
      ) : (
        ''
      )}
      {isCreateModel && pagetitle.split(' ')[0] === 'Product' && (
        <CreateProductModel
          setIsCreateModel={setIsCreateModel}
          pagetitle={pagetitle}
        />
      )}

      {isCreateModel && pagetitle.split(' ')[0] === 'Category' && (
        <CreateCategoryModel
          setIsCreateModel={setIsCreateModel}
          pagetitle={pagetitle}
        />
      )}
      {isCreateModel && pagetitle.split(' ')[0] === 'Training' && (
        <CreateTrainingModel
          setIsCreateModel={setIsCreateModel}
          pagetitle={pagetitle}
        />
      )} */}
    </>
  );
};

export default InvoiceFile;
