import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import { EmailTable } from '../components/Tables/EmailTable/EmailTable';

const Emailus = () => {
  return (
    <>
      <DefaultLayout>
        <div className="flex flex-col gap-10">
            <EmailTable pageName='Email Management' pagetitle='Email' />
        </div>
      </DefaultLayout>
    </>
  );
};

export default Emailus;
