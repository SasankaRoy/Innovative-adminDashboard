import Breadcrumb from "../components/Breadcrumbs/Breadcrumb"
import TableThree from "../components/Tables/McqTable"
import DefaultLayout from "../layout/DefaultLayout"


const QuizeTemplateEditor = () => {
  return (
    <DefaultLayout>
    <Breadcrumb pageName="Quzie Template Editor" />

    <div className="flex flex-col gap-10">
      <TableThree pagetitle='Quzie Template' />
    </div>
  </DefaultLayout>
  )
}

export default QuizeTemplateEditor