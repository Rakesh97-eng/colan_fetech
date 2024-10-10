import EditProfile from "../../components/EditProfile/editProfile";
import NotFound from "../../pages/Auth/notFound/notFound";
import LandingPage from "../../pages/landingPage";
import ManageRoles from "../../pages/manageRoles";
import AddRoles from "../../pages/manageRoles/addRoles/addRoles";
import EditRoles from "../../pages/manageRoles/editRoles";
import ManageSubAdmin from "../../pages/manageSubAdmin";
import EditSubAdmin from "../../pages/manageSubAdmin/editSubAdmin";
import Payment from "../../pages/payment";
import ManageData from "../../pages/User/manageData";
import StripePayment from "../../pages/User/stripePayment";
import RootLayout from "../nav/rootLayout";
import MAangeChatbot from "../../pages/Admin/manageChatBot";
import CreateChatBot from "../../pages/Admin/manageChatBot/createChatBot";
// import SubscriptionForm from "../../pages/User/stripePayment/test-index";
import ManageConfig from "../../pages/User/manageConfig";
import ServiceUnavailable from "../../pages/service-unavailable";


const UserRoutes = [
  {
    path: "/dashboard",
    element: <RootLayout />,
    children: [
      { path:'subadmin', element: <ManageSubAdmin /> },
      { path: "editsubadmin", element: <EditSubAdmin /> },
      { path: "data", element: <ManageData /> },
      { path: "roles", element: <ManageRoles /> },
      { path: "editroles", element: <EditRoles /> },
      { path: "addRole", element: <AddRoles /> },
      { path: "editProfile", element: <EditProfile /> },
      // { path: "stripepayment", element: <SubscriptionForm /> },
      { path: "chatbot", element: <MAangeChatbot /> },
      { path: "flowpage", element: <CreateChatBot /> },
      { path: "manageconfig", element: <ManageConfig /> },

    ],
  },
  {
    path: "/payment",
    element: <Payment />,
  },

  {
    path:'/*',
    element:<NotFound/>
  },
  {
    path:"/service-unavailable",
    element:<ServiceUnavailable/>
  }
];

export default UserRoutes;
