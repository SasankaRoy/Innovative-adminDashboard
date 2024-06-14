
import DefaultLayout from '../layout/DefaultLayout'
// import Breadcrumb from '../components/Breadcrumbs/Breadcrumb'

import { PartnerTable } from '../components/Tables/PartnerTable/PartnerTable'

export const PartnersManagement = () => {
  return (
    <DefaultLayout>
        {/* <Breadcrumb pageName='Partners Management' /> */}
        <div className='flex flex-col gap-10'>
            {/* <TableThree pagetitle='Partner'/> */}
            <PartnerTable pagetitle='Partner' pageName='Partners Management'/>
        </div>
    </DefaultLayout>
  )
}
