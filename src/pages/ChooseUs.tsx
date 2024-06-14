import { ChooseUsTable } from '../components/Tables/chooseUs/ChooseUsTable';
import DefaultLayout from '../layout/DefaultLayout';

export const ChooseUs = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10">
        <ChooseUsTable pageName="Chosse Us" pagetitle="Choose Us List" />
      </div>
    </DefaultLayout>
  );
};
