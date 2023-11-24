import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainPage, {loader as rootloader} from './pages/MainPage.jsx'
import NewDeal from './pages/NewDeal.jsx'
import AllDeals, {loader as dealsloader} from './pages/AllDeals.jsx'
import ErrorPage from './pages/Error.jsx'
import LoginForm, {loader as loginloader} from './pages/LoginForm.jsx';
import RegisterForm from './pages/RegisterForm.jsx';
import MyDeals, {loader as mydealsloader} from './pages/MyDeals.jsx';
import Deal, {loader as dealloader} from './pages/Deal.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>,
    errorElement: <ErrorPage />,
    loader: rootloader,
    children: [
      {
        path: "/create",
        element: <NewDeal/>,
      },
      {
        path: "/deals",
        element: <AllDeals/>,
        loader: dealsloader,
      },
      {
        path: "/mydeals",
        element: <MyDeals/>,
        loader: mydealsloader,
      },
      {
        path: "deals/:dealId",
        element: <Deal/>,
        loader: dealloader,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginForm/>,
    loader: loginloader,
  },
  {
    path: "/register",
    element: <RegisterForm/>,
    loader: loginloader,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
