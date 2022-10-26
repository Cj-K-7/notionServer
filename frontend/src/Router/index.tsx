import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import CanvasPage from "./Pages/Canvas";
import ErrorPage from "./Pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/canvas",
    element: <CanvasPage />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
