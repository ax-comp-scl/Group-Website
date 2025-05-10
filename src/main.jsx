import { createRoot } from 'react-dom/client'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { FormsProvider } from './FormsContext.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import { queryClient } from './lib/react-query.js'
import AdditionalAnnotationPage from './pages/AdditionalAnnotationPage.jsx'
import AdditionalDBXREFPage from './pages/AdditionalDBXREFPage.jsx'
import AdditionalPage from './pages/AdditionalPage.jsx'
import AdditionalPublicationPage from './pages/AdditionalPublicationPage.jsx'
import AdditionalSequencePage from './pages/AdditionalSequencePage.jsx'
import CreateUserPage from './pages/CreateUserPage.jsx'
import FastaPage from './pages/FastaPage.jsx'
import GFFPage from './pages/GffPage.jsx'
import HistoryPage from './pages/HistoryPage.jsx'
import ListDataPage from './pages/ListDataPage.jsx'
import ListUsersPage from './pages/ListUsersPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import OntologiesPage from './pages/OntologiesPage.jsx'
import OrganismPage from './pages/OrganismPage.jsx'
import PublicationPage from './pages/PublicationPage.jsx'
import SimilarityPage from './pages/SimilarityPage.jsx'
import UploadPage from './pages/UploadPage.jsx'

import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import ContactAdm from './pages/ContactAdm.jsx'
import { isAuthenticated } from './services/authService.js'

const router = createBrowserRouter([
  {
    path: '/login',
    element: isAuthenticated() ? (
      <Navigate to={'/admin/history'} />
    ) : (
      <LoginPage />
    ),
  },
  {
    path: '/contact',
    element: <ContactAdm />,
  },
  {
    path: '/admin',
    element: <ProtectedRoute isStaffRequired={true} />,
    children: [
      {
        path: 'history',
        element: <HistoryPage />,
      },
      {
        path: 'create-user',
        element: <CreateUserPage />,
      },
      {
        path: 'upload',
        element: (
          <FormsProvider>
            <UploadPage />
          </FormsProvider>
        ),
        children: [
          {
            path: 'ontologies',
            element: <OntologiesPage />,
          },
          {
            path: 'organism',
            element: <OrganismPage />,
          },
          {
            path: 'publication',
            element: <PublicationPage />,
          },
          {
            path: 'fasta',
            element: <FastaPage />,
          },
          {
            path: 'gff',
            element: <GFFPage />,
          },
          {
            path: 'additional',
            element: <AdditionalPage />,
            children: [
              {
                index: true,
                path: 'annotation',
                element: <AdditionalAnnotationPage />,
              },
              {
                path: 'sequence',
                element: <AdditionalSequencePage />,
              },
              {
                path: 'publication',
                element: <AdditionalPublicationPage />,
              },
              {
                path: 'dbxref',
                element: <AdditionalDBXREFPage />,
              },
            ],
          },
          {
            path: 'similarity',
            element: <SimilarityPage />,
          },
        ],
      },
      {
        path: 'users',
        element: <ListUsersPage />,
      },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute isStaffRequired={false} />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" />,
      },
      {
        path: '/organisms',
        element: <ListDataPage />,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NextUIProvider>
      <RouterProvider router={router} />
      <Toaster />
    </NextUIProvider>
  </QueryClientProvider>
)
