import { useEffect, useState } from 'react';
import { Router, Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/Home';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import UserManagement from './pages/userManagement';
import McqTemplateEditor from './pages/McqTemplateEditor';
import QuizeTemplateEditor from './pages/QuizeTemplateEditor';
import GalleryManagement from './pages/GalleryManagement';
import ProductManagement from './pages/ProductManagement';
import { CategoryManagement } from './pages/CategoryManagement';
import { TrainingModuleManagement } from './pages/TrainingModuleManagement';
import { ChooseUs } from './pages/ChooseUs';
import { PartnersManagement } from './pages/PartnersManagement';
import { ServiceManagement } from './pages/ServiceManagement';
import Login from './pages/Authentication/Login';
import ViewMcqTemplate from './components/viewMcqTemplate/viewMcqTemplate';
import ViewQuizTemplate from './components/viewQuizTemplate/viewQuizTemplate';
import FileTemplateEditor from './pages/FileUploadTemplateEditor';
import ViewFileTemplate from './components/viewFileTemplate/viewFileTemplate';
import PdfDetails from './components/viewFileTemplate/pdfDetails';
import { InvoiceManagement } from './pages/InvoiceManagement';
import PurchaseOrderManagement from './pages/PurchaseOrderManagement';
import AboutUsManagement from './pages/AboutUsManagement';
import OurVisionManagement from './pages/OurVisionManagement';
import OurMissionTable from './components/Tables/ourMssion/OurMissionTable';
import OurMissionManagement from './pages/OurMssionManagement';
import TestimonialManagement from './pages/TestimonialManagement';
import Emailus from './pages/Emailus';
import { Callus } from './pages/Callus';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="login" />
              <Login />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Innovative - Home" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/user-management"
          element={
            <>
              <PageTitle title="User-Management | Innovative" />
              <UserManagement />
            </>
          }
        />
        <Route
          path="/file-template-editor"
          element={
            <>
              <PageTitle title="File Template Editor | Innovative" />
              <FileTemplateEditor />
            </>
          }
        />
        <Route
          path="/view-file-template"
          element={
            <>
              <PageTitle title="View File Template" />
              <ViewFileTemplate />
            </>
          }
        />
        <Route
          path="/purchase-order-management"
          element={
            <>
              <PageTitle title="Purchase Order Template" />
              <PurchaseOrderManagement />
            </>
          }
        />
        <Route
          path="/pdfDetails"
          element={
            <>
              <PageTitle title="Pdf Details" />
              <PdfDetails />
            </>
          }
        />
        <Route
          path="/about-us"
          element={
            <>
              <PageTitle title="About Us Management" />
              <AboutUsManagement />
            </>
          }
        />

        <Route
          path="/our-mission"
          element={
            <>
              <PageTitle title="Our Mission Management" />
              <OurMissionManagement />
            </>
          }
        />

<Route
          path="/testimonial"
          element={
            <>
              <PageTitle title="Testimonial Management" />
              <TestimonialManagement />
            </>
          }
        />

<Route
          path="/our-vision"
          element={
            <>
              <PageTitle title="Our Vision Management" />
              <OurVisionManagement />
            </>
          }
        />
        <Route
          path="/mcq-template-editor"
          element={
            <>
              <PageTitle title="MCQ Template Editor | Innovative" />
              <McqTemplateEditor />
            </>
          }
        />
        <Route
          path="/view-mcq-template"
          element={
            <>
              <PageTitle title="View Mcq Template" />
              <ViewMcqTemplate />
            </>
          }
        />
        <Route
          path="/view-quiz-template"
          element={
            <>
              <PageTitle title="View Quiz Template" />
              <ViewQuizTemplate />
            </>
          }
        />
        <Route
          path="/quiz-template-editor"
          element={
            <>
              <PageTitle title="Quzie Template Editor | Innovative" />
              <QuizeTemplateEditor />
            </>
          }
        />
        <Route
          path="/invoice-management"
          element={
            <>
              <PageTitle title="Invoice Management | Innovative" />
              <InvoiceManagement />
            </>
          }
        />
        <Route
          path="/gallery-management"
          element={
            <>
              <PageTitle title="Gallery Management | Innovative" />
              <GalleryManagement />
            </>
          }
        />
        <Route
          path="/product-management"
          element={
            <>
              <PageTitle title="Product Management | Innovative" />
              <ProductManagement />
            </>
          }
        />
        <Route
          path="/category-management"
          element={
            <>
              <PageTitle title="Category Management | Innovative" />
              <CategoryManagement />
            </>
          }
        />
        <Route
          path="/training-module-management"
          element={
            <>
              <PageTitle title="Training Module Management | Innovative" />
              <TrainingModuleManagement />
            </>
          }
        />
        <Route
          path="/choose-us"
          element={
            <>
              <PageTitle title="Choose Us Management | Innovative" />
              <ChooseUs />
            </>
          }
        />
        <Route
          path="/partner-management"
          element={
            <>
              <PageTitle title="Partners Management | Innovative" />
              <PartnersManagement />
            </>
          }
        />
        <Route
          path="/service-management"
          element={
            <>
              <PageTitle title="Service Management | Innovative" />
              <ServiceManagement />
            </>
          }
        />
        <Route
          path="/email-us"
          element={
            <>
              <PageTitle title="Email Management | Innovative" />
              <Emailus />
            </>
          }
        />
        <Route
          path="/call-us"
          element={
            <>
              <PageTitle title="Call Management | Innovative" />
              <Callus />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />

        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
