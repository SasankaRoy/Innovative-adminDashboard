import Breadcrumb from "../components/Breadcrumbs/Breadcrumb"
import TableThree from "../components/Tables/McqTable"
import DefaultLayout from "../layout/DefaultLayout"


export const ServiceManagement = () => {
  return (
    <DefaultLayout>
        <Breadcrumb pageName="Service Management" />
        <div className="flex flex-col gap-10">
            <TableThree pagetitle='Service' />
        </div>
    </DefaultLayout>
  )
}
