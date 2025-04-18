// import { useEffect, useState } from 'react';
// import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

// import Loader from './common/Loader';
// import PageTitle from './components/PageTitle';
// import SignIn from './pages/Authentication/SignIn';
// import SignUp from './pages/Authentication/SignUp';
// import Calendar from './pages/Calendar';
// import Chart from './pages/Chart';
// import ECommerce from './pages/Dashboard/ECommerce';
// import FormElements from './pages/Form/FormElements';
// import FormLayout from './pages/Form/FormLayout';
// import Profile from './pages/Profile';
// import Settings from './pages/Settings';
// import Tables from './pages/Tables';
// import Alerts from './pages/UiElements/Alerts';
// import Buttons from './pages/UiElements/Buttons';
// import DefaultLayout from './layout/DefaultLayout';

// // PrivateRoute Component
// function PrivateRoute({ children }: { children: React.ReactNode }) {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const builderId = localStorage.getItem('builder-id') || false;
//     console.log("builderId", builderId)
//     if (!builderId) {
//       navigate('/auth/signin');
//     }
//   }, [navigate]);

//   return <>{children}</>;
// }
// function App() {
//   const [loading, setLoading] = useState<boolean>(true);
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 1000);
//   }, []);




//   return loading ? (
//     <Loader />
//   ) : (
//     <Routes>
//         <Route
//           path="/auth/signin"
//           element={
//             <>
//               <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <SignIn />
//             </>
//           }
//           />
//         {/* <Route
//           path="/auth/signup"
//           element={
//             <>
//               <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <SignUp />
//             </>
//           }
//           /> */}

// {/* Protected Routes */}

//         <Route
//           index
//           element={
//             <>
//             <PrivateRoute>
//             <DefaultLayout>
//               <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <ECommerce />
//               </DefaultLayout>
//             </PrivateRoute>
//             </>
//           }
//         />
//         <Route
//           path="/calendar"
//           element={
//             <>
//             <PrivateRoute>
//             <DefaultLayout>
//               <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <Calendar />
//             </DefaultLayout>
//             </PrivateRoute>
//             </>
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             <>
//               <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <Profile />
//             </>
//           }
//         />
//         <Route
//           path="/forms/form-elements"
//           element={
//             <>
//               <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <FormElements />
//             </>
//           }
//         />
//         <Route
//           path="/forms/form-layout"
//           element={
//             <>
//               <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <FormLayout />
//             </>
//           }
//         />
//         <Route
//           path="/tables"
//           element={
//             <>
//               <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <Tables />
//             </>
//           }
//         />
//         <Route
//           path="/settings"
//           element={
//             <>
//               <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <Settings />
//             </>
//           }
//         />
//         <Route
//           path="/chart"
//           element={
//             <>
//               <PrivateRoute>
//                 <DefaultLayout>
//               <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <Chart />
//                 </DefaultLayout>
//               </PrivateRoute>
//             </>
//           }
//         />
//         <Route
//           path="/ui/alerts"
//           element={
//             <>
//               <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <Alerts />
//             </>
//           }
//         />
//         <Route
//           path="/ui/buttons"
//           element={
//             <>
//               <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
//               <Buttons />
//             </>
//           }
//         />

//       </Routes>
//   );
// }

// export default App;


// import { useEffect, useState } from 'react';
// import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

// import Loader from './common/Loader';
// import PageTitle from './components/PageTitle';
// import SignIn from './pages/Authentication/SignIn';
// import SignUp from './pages/Authentication/SignUp';
// import Calendar from './pages/Calendar';
// import Chart from './pages/Chart';
// import ECommerce from './pages/Dashboard/ECommerce';
// import FormElements from './pages/Form/FormElements';
// import FormLayout from './pages/Form/FormLayout';
// import Profile from './pages/Profile';
// import Settings from './pages/Settings';
// import Tables from './pages/Tables';
// import Alerts from './pages/UiElements/Alerts';
// import Buttons from './pages/UiElements/Buttons';
// import DefaultLayout from './layout/DefaultLayout';

// // PrivateRoute Component
// // function PrivateRoute({ children }) {
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const builderId = localStorage.getItem('builder-id');
// //     console.log('Checking builderId');
// //     console.log('Checking builderId:', builderId);
// //     if (!builderId) {
// //       navigate('/auth/signin');
// //     }
// //   }, [navigate]);

// //   return <>{children}</>;
// // }

// function PrivateRoute({ children }) {
//   const storedUser = localStorage.getItem('builder-id');
//   const getUserFromLocalStorage = storedUser ? JSON.parse(storedUser) : null;

//   console.log(getUserFromLocalStorage);

//   return (
//     getUserFromLocalStorage !== null
//       ? children
//       : <Navigate to="/auth/signin" replace={true} />
//   );
// }


// function App() {
//   const [loading, setLoading] = useState(true);
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 1000);
//   }, []);



//   return loading ? (
//     <Loader />
//   ) : (
//     <Routes>
//       <Route
//         path="/auth/signin"
//         element={
//           <>
//             <PageTitle title="Signin | PROFOIQ - Dashboard" />
//             <SignIn />
//           </>
//         }
//       />
//       {/* Protected Routes */}
//       <Route
//         index
//         element={
//           <PrivateRoute>
//             <DefaultLayout>
//               <PageTitle title="PROFO IQ Dashboard" />
//               <ECommerce />
//             </DefaultLayout>
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path="/calendar"
//         element={
//           <PrivateRoute>
//             <DefaultLayout>
//               <PageTitle title="Calendar" />
//               <Calendar />
//             </DefaultLayout>
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path="/profile"
//         element={
//           <PrivateRoute>
//             <DefaultLayout>
//             <PageTitle title="Profile" />
//             <Profile />
//             </DefaultLayout>
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path="/forms/form-elements"
//         element={
//           <>
//             <PageTitle title="Form Elements" />
//             <FormElements />
//           </>
//         }
//       />
//       <Route
//         path="/forms/form-layout"
//         element={
//           <>
//             <PageTitle title="Form Layout" />
//             <FormLayout />
//           </>
//         }
//       />
//       <Route
//         path="/tables"
//         element={
//           <>
//             <PageTitle title="Tables" />
//             <Tables />
//           </>
//         }
//       />
//       <Route
//         path="/settings"
//         element={
//           <>
//             <PageTitle title="Settings" />
//             <Settings />
//           </>
//         }
//       />
//       <Route
//         path="/chart"
//         element={
//           <PrivateRoute>
//             <DefaultLayout>
//               <PageTitle title="Basic Chart" />
//               <Chart />
//             </DefaultLayout>
//           </PrivateRoute>
//         }
//       />
//       <Route
//         path="/ui/alerts"
//         element={
//           <>
//             <PageTitle title="Alerts" />
//             <Alerts />
//           </>
//         }
//       />
//       <Route
//         path="/ui/buttons"
//         element={
//           <>
//             <PageTitle title="Buttons" />
//             <Buttons />
//           </>
//         }
//       />
//     </Routes>
//   );
// }

// export default App;



import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import UnifiedInteractions from './pages/Dashboard/UnifiedInteractions';
import InteractionDetail from './pages/Dashboard/InteractionDetail';
import PropertiesInteractions from './pages/Dashboard/PropertiesInteractions';
import ProjectsInteractions from './pages/Dashboard/ProjectsInteractions';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import CallbackRequests from './pages/CallbackRequests';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';

// PrivateRoute Component
// function PrivateRoute({ children }) {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const builderId = localStorage.getItem('builder-id');
//     console.log('Checking builderId');
//     console.log('Checking builderId:', builderId);
//     if (!builderId) {
//       navigate('/auth/signin');
//     }
//   }, [navigate]);

//   return <>{children}</>;
// }

function PrivateRoute({ children }) {
  const storedUser = localStorage.getItem('builder-id');
  const getUserFromLocalStorage = storedUser ? JSON.parse(storedUser) : null;

  console.log(getUserFromLocalStorage);
  console.log(new Date("2025-02-14T12:48:25.769Z").toLocaleString())


  return (
    getUserFromLocalStorage !== null
      ? children
      : <Navigate to="/auth/signin" replace={true} />
  );
}


function App() {
  const [loading, setLoading] = useState(true);
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
    <Routes>
      <Route
        path="/auth/signin"
        element={
          <>
            <PageTitle title="Signin | PROFOIQ - Dashboard" />
            <SignIn />
          </>
        }
      />
      {/* Protected Routes */}
      <Route
        index element={
          <PrivateRoute>
            <DefaultLayout>
              <PageTitle title="PROFO IQ Dashboard" />
              <UnifiedInteractions />
            </DefaultLayout>
          </PrivateRoute>
        }
      />
        <Route
          path='dashboard'
          element={
            <PrivateRoute>
              <DefaultLayout>
                <PageTitle title="PROFO IQ Dashboard" />
                <ECommerce />
              </DefaultLayout>
            </PrivateRoute>
          }
        />
        {/* Property interaction detail routes */}
        {/* <Route path="/property-interaction/:entityId" element={<InteractionDetail />} /> */}

        {/* Project interaction detail routes */}
        {/* <Route path="/project-interaction/:entityId" element={<InteractionDetail />} /> */}
      <Route
          path='/property-interaction/:entityId' element={
          <PrivateRoute>
            <DefaultLayout>
              <PageTitle title="PROFO IQ Dashboard" />
                <InteractionDetail />
            </DefaultLayout>
          </PrivateRoute>
        }
      />
      <Route
          path='/project-interaction/:entityId' element={
          <PrivateRoute>
            <DefaultLayout>
              <PageTitle title="PROFO IQ Dashboard" />
                <InteractionDetail />
            </DefaultLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/calendar"
        element={
          <PrivateRoute>
            <DefaultLayout>
              <PageTitle title="PROFO IQ Dashboard" />
              <Calendar />
            </DefaultLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/interactions/properties"
        element={
          <PrivateRoute>
            <DefaultLayout>
              <PageTitle title="PROFO IQ Dashboard" />
              <PropertiesInteractions />
            </DefaultLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/interactions/projects"
        element={
          <PrivateRoute>
            <DefaultLayout>
              <PageTitle title="PROFO IQ Dashboard" />
              <ProjectsInteractions />
            </DefaultLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <DefaultLayout>
              <PageTitle title="Profile" />
              <Profile />
            </DefaultLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/callback"
        element={
          <PrivateRoute>
            <DefaultLayout>
              <PageTitle title="Callback Requests" />
              <CallbackRequests />
            </DefaultLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/forms/form-elements"
        element={
          <>
            <PageTitle title="Form Elements" />
            <FormElements />
          </>
        }
      />
      <Route
        path="/forms/form-layout"
        element={
          <>
            <PageTitle title="Form Layout" />
            <FormLayout />
          </>
        }
      />
      <Route
        path="/tables"
        element={
          <>
            <PageTitle title="Tables" />
            <Tables />
          </>
        }
      />
      <Route
        path="/settings"
        element={
          <>
            <PageTitle title="Settings" />
            <Settings />
          </>
        }
      />
      <Route
        path="/chart"
        element={
          <PrivateRoute>
            <DefaultLayout>
              <PageTitle title="Basic Chart" />
              <Chart />
            </DefaultLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/ui/alerts"
        element={
          <>
            <PageTitle title="Alerts" />
            <Alerts />
          </>
        }
      />
      <Route
        path="/ui/buttons"
        element={
          <>
            <PageTitle title="Buttons" />
            <Buttons />
          </>
        }
      />
    </Routes>
  );
}

export default App;
