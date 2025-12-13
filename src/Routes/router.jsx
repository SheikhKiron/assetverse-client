import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Register/Login";

import RegisterHR from "../Pages/Register/RegisterHR";
import RegisterEmployee from "../Pages/Register/RegisterEmployee";
import Dashboard from "../Layouts/Dashboard";
import AssetList from "../Pages/HRDashboard/AssetList";
import AddAsset from "../Pages/HRDashboard/AddAsset";
import AllRequests from "../Pages/HRDashboard/AllRequests";
import EmployeeList from "../Pages/HRDashboard/EmployeeList";
import UpgradePackage from "../Pages/HRDashboard/UpgradePackage";
import MyAssets from "../Pages/EmployeeDashboard/MyAssets";
import RequestAsset from "../Pages/EmployeeDashboard/RequestAsset";
import MyTeam from "../Pages/EmployeeDashboard/MyTeam";
import Profile from "../Pages/EmployeeDashboard/Profile";
import PrivateRouter from './PrivateRouter';
import EditAsset from "../Pages/HRDashboard/EditAsset";
import HrRoute from "./HrRoute";
import Error from "../Pages/Error/Error";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    errorElement:<Error></Error>,
    children: [
      { index: true, Component: Home },
      { path: '/login', Component: Login },
      { path: '/register', Component: RegisterHR },
      { path: '/register-employee', Component: RegisterEmployee },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRouter>
        <Dashboard></Dashboard>
      </PrivateRouter>
    ),
    children: [
      { path: 'assets', element: <AssetList /> },
      { path: 'add-asset', element: <AddAsset /> },
      { path: 'requests', element: <AllRequests /> },
      {
        path: 'employees',
        element: (
          <HrRoute>
            <EmployeeList />
          </HrRoute>
        ),
      },
      { path: 'upgrade', element: <UpgradePackage /> },

      { path: 'my-assets', element: <MyAssets /> },
      { path: 'request-asset', element: <RequestAsset /> },
      { path: 'my-team', element: <MyTeam /> },

      { path: 'profile', element: <Profile /> },
      { path: 'edit-asset/:id', element: <EditAsset /> },
    ],
  },
]);
