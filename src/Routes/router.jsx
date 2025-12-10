import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Register/Login";

import RegisterHR from "../Pages/Register/RegisterHR";
import RegisterEmployee from "../Pages/Register/RegisterEmployee";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    children: [
      { index: true, Component: Home },
      {path:'/login',Component:Login},
      {path:'/register',Component:RegisterHR},
      {path:'/register-employee',Component:RegisterEmployee},
    ]
  },
]);
