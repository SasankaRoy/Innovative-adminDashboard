import Breadcrumb from "../components/Breadcrumbs/Breadcrumb"
import TableThree from "../components/Tables/McqTable"
import DefaultLayout from "../layout/DefaultLayout"


export const TrainingModuleManagement = () => {
  return (
    <DefaultLayout>
        <Breadcrumb pageName="Training Module Management" />
        <div className='flex flex-col gap-10'>
            <TableThree pagetitle='Training'/>
        </div>
    </DefaultLayout>
  )
}
