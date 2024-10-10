import { lazy } from "react";
import { Outlet } from "react-router-dom";
import BookDemo from "../../pages/Auth/bookdemo/bookDemo";
import ForgotPassword from "../../pages/Auth/forgotPassword";
import NotFound from "../../pages/Auth/notFound/notFound";
import Register from "../../pages/Auth/register/Register";
import LandingPage from "../../pages/landingPage";
import Payment from "../../pages/payment";
import ServiceUnavailable from "../../pages/service-unavailable";
import StripePayment from "../../pages/User/stripePayment";

const Login = lazy(() => import("../../pages/Auth/login"));

const authRoutes = [
  {
    path: "/",
    element: (
      <div>
        <Outlet />
      </div>
    ),
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/forgot",
        element: <ForgotPassword />,
      },
      { path: "/stripepayment", element: <StripePayment /> },
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/bookdemo",
        element: <BookDemo />,
      },
    
      {
        path:"/service-unavailable",
        element:<ServiceUnavailable/>
      },
      {
        path: "*",
        element: <NotFound/>
      },
    ],
  },
];

export default authRoutes;
