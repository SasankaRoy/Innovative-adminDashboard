import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

import { TrainingModulesTable } from '../components/Tables/trainingModules/TrainingModulesTable';
import DefaultLayout from '../layout/DefaultLayout';

export const TrainingModuleManagement = () => {
  return (
    <DefaultLayout>
      {/* <Breadcrumb pageName="Training Module Management" /> */}
      <div className="flex flex-col gap-10">
        <TrainingModulesTable pagetitle = 'Modules List' pageName="Training Module Management" />
      </div>
    </DefaultLayout>
  );
};
