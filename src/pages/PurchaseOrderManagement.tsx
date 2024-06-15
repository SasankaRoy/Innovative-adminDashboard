
import DefaultLayout from '../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPurchaseOrders } from '../api-calls/apicalls';
import PurchaseOrderTable from '../components/Tables/PurchaseOrderTable/PurchaseOrderTable';

function PurchaseOrderManagement() {
  const [orders, setOrders] = useState<any[] | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    const fetcher = async () => {
      let ordersData = await fetchPurchaseOrders();
      // console.log("27", usersData)
      if (ordersData?.message === "jwt expired" || ordersData.message === 'jwt is not present') {
        return navigate("/");
      } else {
        setOrders([...ordersData]);
      }
    };

    fetcher();

  }, [])

  if (orders) {
    return (
      <DefaultLayout>
        <div className="flex flex-col gap-10">
          <PurchaseOrderTable title='Orders' orderAllData={orders} />
        </div>
      </DefaultLayout>
    )
  }
}

export default PurchaseOrderManagement