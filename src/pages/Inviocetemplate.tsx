import DefaultLayout from '../layout/DefaultLayout';
import Logo from '../assets/logo.png';

export const Inviocetemplate = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-10 bg-[#24303f]/10 dark:bg-[#24303f] p-6">
        <div className="w-full flex justify-between items-center">
          <div>
            <h2 className="text-black font-[500] text-2xl dark:text-white my-1">
              Innovative Quality Tech Solutions Limited
            </h2>
            <p className="text-black dark:text-white font-[500] text-[16px] my-1">
              506-50 Absolute Avenue
            </p>
            <p className="text-black dark:text-white font-[500] text-[16px] my-1">
              Mississauga ON L4Z 0A8
            </p>
            <p className="text-black dark:text-white font-[500] text-[16px] my-1">
              +1 6476672641
            </p>
            <p className="text-black dark:text-white font-[500] text-[16px] my-1">
              sales@innovativequalitytechsolutions.com
            </p>
            <p className="text-black dark:text-white font-[500] text-[16px] my-1">
              www.innovativequalitytechsolutions.com
            </p>
            <p className="text-black dark:text-white font-[500] text-[16px] my-1">
              GST/HST Registration No.: 791776420
            </p>
          </div>
          <div className="h-44 w-44">
            <img src={Logo} className="object-fill " alt="company-logo" />
          </div>
        </div>
        <div className="w-[90%]">
          <h3 className="text-2xl text-blue-900 dark:text-white font-[600] uppercase tracking-wider">
            INVOICE
          </h3>
          <div className="w-full my-2 flex justify-between items-center">
            <div>
              <h4 className="text-lg  font-[500] uppercase">BILL TO</h4>
              <p className="text-base text-black dark:text-white font-[400]">
                Mikki Connolly
              </p>
              <p className="text-base text-black dark:text-white font-[400]">
                Gulan Die Casting Ltd
              </p>
              <p className="text-base text-black dark:text-white font-[400]">
                1919 Sismet Road
              </p>
              <p className="text-base text-black dark:text-white font-[400]">
                Mississauga ON L4W 1W8
              </p>
            </div>
            <div>
              <div className="flex justify-between items-center gap-20 my-1">
                <span className="text-sm font-[500] uppercase">INVOICE </span>
                <h3 className="text-black text-base font-[500] dark:text-white">
                  24003
                </h3>
              </div>
              <div className="flex justify-between items-center gap-20 my-1">
                <span className="text-sm font-[500] uppercase">DATA </span>
                <h3 className="text-black text-base font-[500] dark:text-white">
                  14/05/2024
                </h3>
              </div>
              <div className="flex justify-between items-center gap-20 my-1">
                <span className="text-sm font-[500] uppercase">TERMS </span>
                <h3 className="text-black text-base font-[500] dark:text-white">
                  Due on receipt
                </h3>
              </div>
              <div className="flex justify-between items-center gap-20 my-1">
                <span className="text-sm font-[500] uppercase">DUE DATE </span>
                <h3 className="text-black text-base font-[500] dark:text-white">
                  17/05/2024
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="dark:bg-white/10 bg-[#24303f]/10 p-3 flex justify-between items-center">
          <div className="flex-1 text-center">
            <span>DATE</span>
          </div>
          <div className="flex-1 text-center">
            <span>ACTIVITY</span>
          </div>
          <div className="flex-1 text-center">
            <span>DESCRIPTION</span>
          </div>
          <div className="flex-1 text-center">
            <span>QTY</span>
          </div>
          <div className="flex-1 text-center">
            <span>RATE</span>
          </div>
          <div className="flex-1 text-center">
            <span>AMOUNT</span>
          </div>
        </div>
        <div className="px-3 py-5 flex justify-between items-center border-b border-dashed">
          <div className="flex-1"></div>
          <div className="flex-1 flex justify-center items-center">
            <h3 className="text-black dark:text-white">
              Manufacturing Inspection Services
            </h3>
          </div>
          <div className="flex-1">
            <p className="text-black dark:text-white">
              Performed Inspection of High-pressure aluminum die-cast parts
              using mechanical instruments and a CMM, and provided support for
              ISO 9001 and IATF 16949 documentation.
            </p>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <span className="text-black dark:text-white">1</span>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <span className="text-black dark:text-white">2,596.00</span>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <span className="text-black dark:text-white">2,596.00</span>
          </div>
        </div>

        <div className="flex flex-col justify-end items-end">
          <div className="w-[50%] border-b border-dashed p-3 flex flex-col justify-start items-start gap-2">
            <div className="flex justify-between items-center w-full">
              <span>SUBTOTAL </span>
              <h3>2,596.00</h3>
            </div>
            <div className="flex justify-between items-center w-full">
              <span>HST (ON) @ 13% </span>
              <h3>337.48</h3>
            </div>
            <div className="flex justify-between items-center w-full">
              <span>TOTAL</span>
              <h3>2,933.48</h3>
            </div>
            <div className="flex justify-between items-center w-full">
              <span>PAYMENT</span>
              <h3>2,933.48</h3>
            </div>
          </div>
          <div className="w-[50%] p-3 flex flex-col justify-start items-start gap-2">
            <div className="flex justify-between items-center w-full">
              <span>BALANCE DUE </span>
              <h3 className="font-[600] text-xl">$0.00</h3>
            </div>
            <h3 className="text-2xl text-green-500 font-[600] uppercase self-end">
              PAID
            </h3>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
