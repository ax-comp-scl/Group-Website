import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {NextUIProvider} from '@nextui-org/react'
import * as ReactDOM from 'react-dom/client'
import CreateUserPage from './pages/CreateUserPage.jsx'
import ListOrganismsPage from './pages/ListOrganismsPage.jsx'
import ListUsersPage from './pages/ListUsersPage.jsx'
import HistoryPage from './pages/HistoryPage.jsx'
import UploadPage from './pages/UploadPage.jsx'
import InitialPage from './pages/InitialPage.jsx'
import OntologiesPage from './pages/OntologiesPage.jsx'
import OrganismPage from './pages/OrganismPage.jsx'
import PublicationPage from './pages/PublicationPage.jsx'
import FastaPage from './pages/FastaPage.jsx'
import GFFPage from './pages/GffPage.jsx'
import AdditionalPage from './pages/AdditionalPage.jsx'
import SimilarityPage from './pages/SimilarityPage.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/teste",
    element: <App/>,
  },
  {
    path: "/",
    element: <InitialPage/>,
  },
  {
    path: "/create-user",
    element: <CreateUserPage/>
  },
  {
    path: "/organisms",
    element: <ListOrganismsPage />
  },
  {
    path: "/upload",
    element: <UploadPage />,
    children: [
      {
        index: true,
        path: "/upload/ontologies",
        element: <OntologiesPage/>
      },
      {
        path: "/upload/organism",
        element: <OrganismPage/>
      },
      {
        path: "/upload/publication",
        element: <PublicationPage/>
      },
      {
        path: "/upload/fasta",
        element: <FastaPage/>
      },
      {
        path: "/upload/gff",
        element: <GFFPage/>
      },
      {
        path: "/upload/additional",
        element: <AdditionalPage/>
      },
      {
        path: "/upload/similarity",
        element: <SimilarityPage/>
      },
    ]
  },
  {
    path: "/users",
    element: <ListUsersPage />
  },
  {
    path: "/history",
    element: <HistoryPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>    
  </StrictMode>,
)
