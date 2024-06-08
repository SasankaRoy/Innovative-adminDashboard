import React, { useState,useEffect } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import InvoiceFile from '../components/Tables/InvoiceTable/InvoiceTable';
import { useNavigate } from 'react-router-dom';
import { fetchInvoices } from '../api-calls/apicalls';

export const InvoiceManagement = () => {
  const [invoices,setInvoices]=useState<any[]|undefined>(undefined)
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetcher = async () => {
      let invoicesData = await fetchInvoices();
      // console.log("27", usersData)
      if (invoicesData?.message === "jwt expired") {
        return navigate("/");
      } else {
        setInvoices([...invoicesData]);
      }
    };

    fetcher();

  }, [])

  if(invoices){
  return (
    <DefaultLayout>
      

      <div className="flex flex-col gap-10">
        <InvoiceFile invoiceAllData={invoices} />
      </div>
    </DefaultLayout>
  )}
};
