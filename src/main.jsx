import { createRoot } from "react-dom/client";
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

import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { isAuthenticated } from "./services/authService.js";

const router = createBrowserRouter([
  {
    path: "/login",
    element: isAuthenticated() ? <Navigate to={"/admin/history"} /> : <LoginPage />,
  },
  {
    path: "/admin",
    element: <ProtectedRoute isStaffRequired={true} />,
    children: [
      {
        path: "history",
        element: <HistoryPage />,
      },
      {
        path: "create-user",
        element: <CreateUserPage />,
      },
      {
        path: "upload",
        element: (
          <FormsProvider>
            <UploadPage />
          </FormsProvider>
        ),
        children: [
          {
            path: "ontologies",
            element: <OntologiesPage />,
          },
          {
            path: "organism",
            element: <OrganismPage />,
          },
          {
            path: "publication",
            element: <PublicationPage />,
          },
          {
            path: "fasta",
            element: <FastaPage />,
          },
          {
            path: "gff",
            element: <GFFPage />,
          },
          {
            path: "additional",
            element: <AdditionalPage />,
            children: [
              {
                index: true,
                path: "annotation",
                element: <AdditionalAnnotationPage />,
              },
              {
                path: "sequence",
                element: <AdditionalSequencePage />,
              },
              {
                path: "publication",
                element: <AdditionalPublicationPage />,
              },
              {
                path: "dbxref",
                element: <AdditionalDBXREFPage />,
              },
            ],
          },
          {
            path: "similarity",
            element: <SimilarityPage />,
          },
        ],
      },
      {
        path: "users",
        element: <ListUsersPage />,
      },
    ]
  },
  {
    path: "/",
    element: <ProtectedRoute isStaffRequired={false} />,
    children: [
      {
        path: "/organisms",
        element: <ListDataPage />,
      },
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <RouterProvider router={router} />
  </NextUIProvider>
);
