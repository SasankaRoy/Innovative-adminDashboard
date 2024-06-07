import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChatCard from '../../components/Chat/ChatCard';

import DefaultLayout from '../../layout/DefaultLayout';
import { useNavigate } from 'react-router-dom';
import {
  fetchInvoices,
  fetchMcqTemplates,
  fetchPurchaseOrders,
  fetchQuizTemplates,
  fetchUsers,
} from '../../api-calls/apicalls';
import TableOne from '../../components/Tables/TableOne';

const ECommerce: React.FC = () => {
  const [mcqTemplates, setMcqTemplates] = useState<any[] | undefined>(
    undefined,
  );
  const [invoices, setInvoices] = useState<any[] | undefined>(undefined);
  const [quizTemplates, setQuizTemplates] = useState<any[] | undefined>(
    undefined,
  );
  const [users, setUsers] = useState<any[] | undefined>(undefined);
  const [activeUsers, setActiveUsers] = useState<any[] | undefined>(undefined);
  const [userList,setUserList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // setWindowWidth(window.innerWidth);
    // window.addEventListener("resize", updateWindowWidth);

    const fetcher = async () => {

      let mcqTemplatesData: any = await fetchMcqTemplates();
      if (
        mcqTemplatesData?.message === 'jwt expired' ||
        mcqTemplatesData?.message === 'jwt is not present'
      ) {
        return navigate('/');
      } else {
        setMcqTemplates([...mcqTemplatesData]);
      }

      let quizTemplatesData: any = await fetchQuizTemplates();
      if (
        quizTemplatesData?.message === 'jwt expired' ||
        quizTemplatesData?.message === 'jwt is not present'
      ) {
        return navigate('/');
      } else {
        setQuizTemplates([...quizTemplatesData]);
      }

      let invoicesData: any = await fetchInvoices();
      if (
        invoicesData?.message === 'jwt expired' ||
        invoicesData?.message === 'jwt is not present'
      ) {
        return navigate('/');
      } else {
        setInvoices([...invoicesData]);
      }

      let usersData: any = await fetchUsers();
      if (
        usersData?.message === 'jwt expired' ||
        usersData?.message === 'jwt is not present'
      ) {
        return navigate('/');
      } else {
        setUsers([...usersData]);
      }

      let purchaseOrdersData: any = await fetchPurchaseOrders();
      if (
        purchaseOrdersData?.message === 'jwt expired' ||
        purchaseOrdersData?.message === 'jwt is not present'
      ) {
        return navigate('/');
      } else {
        setActiveUsers([...purchaseOrdersData]);
      }
      const userList = await fetchUsers();

      if (usersData?.message === "jwt expired"){
        return navigate('/');
      }
      setUserList([...userList])
      
    };


    fetcher();

    // return () => {
    //   window.removeEventListener("resize", updateWindowWidth);
    // };
  }, []);

  return (
    <>
      <head>
        <title>Innovation - Home</title>
      </head>
      <DefaultLayout>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardDataStats
            title="Total views"
            total={users?.length}
            rate="0.43%"
            levelUp
          >
            <h2 className="text-black dark:text-white text-2xl font-[500]">
              No of user
            </h2>
          </CardDataStats>
          <CardDataStats
            title="Total Profit"
            total={activeUsers?.length}
            rate="4.35%"
            levelUp
          >
            <h2 className="text-black dark:text-white text-2xl font-[500]">
              No of active user
            </h2>
          </CardDataStats>
          <CardDataStats
            title="Total Product"
            total={`${mcqTemplates?.length + quizTemplates?.length}`}
            rate="2.59%"
            levelUp
          >
            <h2 className="text-black dark:text-white text-2xl font-[500]">
              No of exam
            </h2>
          </CardDataStats>
          <CardDataStats
            title="Total Users"
            total={`${invoices?.length}`}
            rate="0.95%"
            levelDown
          >
            <h2 className="text-black dark:text-white text-2xl font-[500]">
              Total Invoice Send
            </h2>
          </CardDataStats>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          {/* <ChartOne /> */}
          {/* <ChartTwo /> */}
          {/* <ChartThree /> */}
          {/* <MapOne /> */}
          <div className="col-span-12 xl:col-span-8">
            <TableOne title="User's" userList={userList}/>
          </div>
          <ChatCard />
        </div>
      </DefaultLayout>
    </>
  );
};

export default ECommerce;
