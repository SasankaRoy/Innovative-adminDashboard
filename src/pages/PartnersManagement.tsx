import React from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb'
import TableThree from '../components/Tables/TableThree'

export const PartnersManagement = () => {
  return (
    <DefaultLayout>
        <Breadcrumb pageName='Partners Management' />
        <div className='flex flex-col gap-10'>
            <TableThree pagetitle='Partner'/>
        </div>
    </DefaultLayout>
  )
}
