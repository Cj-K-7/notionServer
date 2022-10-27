import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import CanvasPage from "./Pages/Canvas";
import ErrorPage from "./Pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
