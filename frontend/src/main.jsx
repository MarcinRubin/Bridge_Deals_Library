import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App, {loader as rootloader} from './App.jsx';
import NewDeal from './pages/NewDeal.jsx'
import AllDeals, {loader as dealsloader} from './pages/AllDeals.jsx'
import ErrorPage from './pages/Error.jsx'
import LoginForm, {loader as loginloader} from './pages/LoginForm.jsx';
import RegisterForm from './pages/RegisterForm.jsx';
import MyDeals, {loader as mydealsloader} from './pages/MyDeals.jsx';
import MyDeal, {loader as mydealloader} from './components/MyDeal.jsx';
import HomePage from './pages/HomePage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    loader: rootloader,
    children: [
      {
        path: "/",
        element: <HomePage/>
      },
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
        path: "mydeals/:dealId",
        element: <MyDeal/>,
        loader: mydealloader,
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
