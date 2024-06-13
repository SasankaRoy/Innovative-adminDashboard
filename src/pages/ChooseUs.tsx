// import Breadcrumb from "../components/Breadcrumbs/Breadcrumb"
// import TableThree from "../components/Tables/McqTable"
import { ChooseUsTable } from "../components/Tables/chooseUs/ChooseUsTable"
import DefaultLayout from "../layout/DefaultLayout"


export const ChooseUs = () => {
  return (
    <DefaultLayout>
        {/* <Breadcrumb pageName="Chosse Us" /> */}
        <div className='flex flex-col gap-10'>
            {/* <TableThree pagetitle='Choose Us'/> */}
            <ChooseUsTable pageName="Chosse Us" pagetitle="Choose Us List"  />
        </div>
    </DefaultLayout>
  )
}
