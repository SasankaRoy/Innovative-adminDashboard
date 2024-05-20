import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import TableThree from '../components/Tables/TableThree';

const McqTemplateEditor = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="MCQs Template Editor" />

      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </DefaultLayout>
  );
};
export default McqTemplateEditor;
