import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import CreateUserPage from "./pages/CreateUserPage.jsx";
import ListDataPage from "./pages/ListDataPage.jsx";
import ListUsersPage from "./pages/ListUsersPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import OntologiesPage from "./pages/OntologiesPage.jsx";
import OrganismPage from "./pages/OrganismPage.jsx";
import PublicationPage from "./pages/PublicationPage.jsx";
import FastaPage from "./pages/FastaPage.jsx";
import GFFPage from "./pages/GffPage.jsx";
import AdditionalPage from "./pages/AdditionalPage.jsx";
import SimilarityPage from "./pages/SimilarityPage.jsx";
import AdditionalAnnotationPage from "./pages/AdditionalAnnotationPage.jsx";
import AdditionalSequencePage from "./pages/AdditionalSequencePage.jsx";
import AdditionalPublicationPage from "./pages/AdditionalPublicationPage.jsx";
import AdditionalDBXREFPage from "./pages/AdditionalDBXREFPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { FormsProvider } from "./FormsContext.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./AuthContext.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/history",
        element: <HistoryPage />,
      },
      {
        path: "/create-user",
        element: <CreateUserPage />,
      },
      {
        path: "/organisms",
        element: <ListDataPage />,
      },
      {
        path: "/upload",
        element: (
          <FormsProvider>
            <UploadPage />
          </FormsProvider>
        ),
        children: [
          {
            path: "/upload/ontologies",
            element: <OntologiesPage />,
          },
          {
            path: "/upload/organism",
            element: <OrganismPage />,
          },
          {
            path: "/upload/publication",
            element: <PublicationPage />,
          },
          {
            path: "/upload/fasta",
            element: <FastaPage />,
          },
          {
            path: "/upload/gff",
            element: <GFFPage />,
          },
          {
            path: "/upload/additional",
            element: <AdditionalPage />,
            children: [
              {
                index: true,
                path: "/upload/additional/annotation",
                element: <AdditionalAnnotationPage />,
              },
              {
                path: "/upload/additional/sequence",
                element: <AdditionalSequencePage />,
              },
              {
                path: "/upload/additional/publication",
                element: <AdditionalPublicationPage />,
              },
              {
                path: "/upload/additional/dbxref",
                element: <AdditionalDBXREFPage />,
              },
            ],
          },
          {
            path: "/upload/similarity",
            element: <SimilarityPage />,
          },
        ],
      },
      {
        path: "/users",
        element: <ListUsersPage />,
      },
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </NextUIProvider>
);
