import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import App, {loader as rootloader} from './App.jsx';
import NewDeal from './pages/NewDeal.jsx'
import ErrorPage from './pages/Error.jsx'
import LoginForm, {loader as loginloader} from './pages/LoginForm.jsx';
import RegisterForm from './pages/RegisterForm.jsx';
import MyDeals from './pages/MyDeals.jsx';
import MyDeal, {loader as mydealloader} from './pages/MyDeal.jsx';
import HomePage from './pages/HomePage.jsx';
import CreateDealFromLink from './pages/CreateDealFromLink.jsx';
import CreateDealSetFromLink, {loader as tournamentLoader} from './pages/CreateDealSetFromLink.jsx';
import Profile from './pages/Profile.jsx';

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
        path: "/link_create",
        element: <CreateDealFromLink/>
      },
      {
        path: "/mydeals",
        element: <MyDeals/>
      },
      {
        path: "batch_create",
        element: <CreateDealSetFromLink/>,
        loader: tournamentLoader,
      },
      {
        path: "mydeals/:dealId",
        element: <MyDeal/>,
        loader: mydealloader,
      },
      {
        path: "/profile",
        element: <Profile/>,
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

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
     <RouterProvider router={router} />
     </ChakraProvider>
  </React.StrictMode>,
)
