import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import InvoiceFile from '../components/Tables/InvoiceTable';

export const InvoiceManagement = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Invoice Management" />

      <div className="flex flex-col gap-10">
        <InvoiceFile pagetitle='Invoice' />
      </div>
    </DefaultLayout>
  );
};
