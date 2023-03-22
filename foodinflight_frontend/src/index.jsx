import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css';
import IndexPage from './pages/IndexPage';
import AboutPage from './pages/AboutPage';
import CategoryPage from './pages/CategoryPage';
import UserAgreementPage from './pages/UserAgreementPage';
import ProductPage from './pages/ProductPage';
import ContactsPage from './pages/ContactsPage';
import ShippingPage from './pages/ShippingPage';
import FeedbackPage from './pages/FeedBackPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
  },

  {
    path: '/about',
    element: <AboutPage />,
  },

  {
    path: '/:category/:product',
    element: <ProductPage />,
  },

  {
    path: '/:category',
    element: <CategoryPage/>,
  },

  {
    path: '/user-agreement',
    element: <UserAgreementPage/>
  },

  {
    path: '/contacts',
    element: <ContactsPage /> ,
  },

  {
    path: '/shipping',
    element: <ShippingPage />,
  },

  {
    path: '/feedback',
    element: <FeedbackPage />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
);

