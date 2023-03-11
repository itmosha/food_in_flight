import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import IndexPage from './pages/IndexPage';
import AboutPage from './pages/AboutPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import ProductPage from './pages/ProductPage';

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
        path: 'product/:product',
        element: <ProductPage />,
    },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider>
        <RouterProvider router={router} />
    </ChakraProvider>
);
