// import EditProfile from "../../components/EditProfile/editProfile";
// import AddRoles from "../../pages/manageRoles/addRoles/addRoles";
// import Dashboard from "../../pages/Admin/dashboard";
// import MAangeChatbot from "../../pages/Admin/manageChatBot";
// import CreateChatBot from "../../pages/Admin/manageChatBot/createChatBot";
// import ManageClients from "../../pages/Admin/manageClient";
// import ManageCMS from "../../pages/Admin/manageCms";
// import ManageDemo from "../../pages/Admin/manageDemo";
// import ManageSubscription from "../../pages/Admin/manageSubscription";
// import EditSubscription from "../../pages/Admin/manageSubscription/editSubscription";
// import ManageRoles from "../../pages/manageRoles";
// import EditRoles from "../../pages/manageRoles/editRoles";
// import ManageSubAdmin from "../../pages/manageSubAdmin";
// import EditSubAdmin from "../../pages/manageSubAdmin/editSubAdmin";
// import Payment from "../../pages/payment";
// import RootLayout from "../nav/rootLayout";

import { lazy } from "react";
import ChatBotPreview from "../../components/chatbotpreview";
import ManageClientConfiguration from "../../pages/Admin/manageClient/manageConfiguration";
import ReceivedClients from "../../pages/Admin/manageClient/receivedJSON";
import NotFound from "../../pages/Auth/notFound/notFound";
import ServiceUnavailable from "../../pages/service-unavailable";

// const delayRouting =async (path)=>{
//   const [module] = await Promise.all([
//     import(path),
//     new Promise((resolve) => setTimeout(resolve, 300))
//   ]);
//   return module;
//  }
const delayedImport = async (path, delayTime = 300) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const module = await import(path);
      resolve(module);
    }, delayTime);
  });
};


const RootLayout = lazy(()=>import ('../nav/rootLayout'))
const Dashboard = lazy(() =>
  import("../../pages/Admin/dashboard")
);

  const ManageSubAdmin = lazy(() =>
  Promise.all([
  import("../../pages/manageSubAdmin"),
  new Promise((resolve) => setTimeout(resolve, 1500))
]).then(([module])=>module)
);
const ManageClients = lazy(() =>
Promise.all([
  import("../../pages/Admin/manageClient"),
  new Promise((resolve) => setTimeout(resolve, 1500))
]).then(([module])=>module)
  )
;
const MAangeChatbot = lazy(() =>
Promise.all([
  import("../../pages/Admin/manageChatBot"),
  new Promise((resolve) => setTimeout(resolve, 1500))
]).then(([module])=>module)
  )
;
const ManageSubscription = lazy(() =>
Promise.all([
  import("../../pages/Admin/manageSubscription"),
  new Promise((resolve) => setTimeout(resolve, 1500))
]).then(([module])=>module)
  )
;
const ManageRoles = lazy(() =>
Promise.all([
  import("../../pages/manageRoles"),
  new Promise((resolve) => setTimeout(resolve, 1500))
]).then(([module])=>module)
  )
;
const ManageCMS = lazy(() =>
Promise.all([
  import("../../pages/Admin/manageCms"),
  new Promise((resolve) => setTimeout(resolve, 1500))
]).then(([module])=>module)
  )
;
const ManageDemo = lazy(() =>
Promise.all([
  import("../../pages/Admin/manageDemo"),
  new Promise((resolve) => setTimeout(resolve, 1500))
]).then(([module])=>module)
  )
;
const CreateChatBot = lazy(() =>
Promise.all([
  import("../../pages/Admin/manageChatBot/createChatBot"),
  new Promise((resolve) => setTimeout(resolve, 1500))
]).then(([module])=>module)
  )
;
const AddRoles = lazy(() =>
Promise.all([
  import("../../pages/manageRoles/addRoles/addRoles"),
  new Promise((resolve) => setTimeout(resolve, 1500))
]).then(([module])=>module)
  )
;
const EditProfile = lazy(() =>
Promise.all([
  import("../../components/EditProfile/editProfile"),
  new Promise((resolve) => setTimeout(resolve, 1500))
]).then(([module])=>module)
  )
;
const EditRoles = lazy(() =>
Promise.all([
  import("../../pages/manageRoles/editRoles"),
  new Promise((resolve) => setTimeout(resolve, 1500))
]).then(([module])=>module)
  )
;
const EditSubAdmin = lazy(() =>
Promise.all([
  import("../../pages/manageSubAdmin/editSubAdmin"),
  new Promise((resolve) => setTimeout(resolve, 1500))
]).then(([module])=>module)
  )
;
const EditSubscription = lazy(() =>
Promise.all([
  import("../../pages/Admin//manageSubscription/editSubscription"),
  new Promise((resolve) => setTimeout(resolve, 1500))
]).then(([module])=>module)
  )
;
const Payment = lazy(() =>
Promise.all([
  import("../../pages/payment"),
  new Promise((resolve) => setTimeout(resolve, 1500))
]).then(([module])=>module)
  )
;


const AdminRoutes = [
  {
    path: "/dashboard",
    element: <RootLayout />,
    children: [
      {index:true, element: <Dashboard /> },
      { path: "subadmin", element: <ManageSubAdmin /> },
      { path: "client", element: <ManageClients /> },
      { path: "chatbot", element: <MAangeChatbot /> },
      { path: "subscription", element: <ManageSubscription /> },
      { path: "roles", element: <ManageRoles /> },
      { path: "cms", element: <ManageCMS /> },
      { path: "demo", element: <ManageDemo /> },
      { path: "flowpage", element: <CreateChatBot /> },
      { path: "addrole", element: <AddRoles /> },
      { path: "editroles", element: <EditRoles /> },
      { path: "editProfile", element: <EditProfile /> },
      { path: "editsubadmin", element: <EditSubAdmin /> },
      { path: "editsubscription", element: <EditSubscription /> },
      { path: "receivedclient", element: <ReceivedClients /> },
      { path: "manageclientconfig", element: <ManageClientConfiguration /> },
    ],
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {path:'/chatbotpreview',element:<ChatBotPreview/>},
  {
    path:'/*',
    element:<NotFound/>
  },
  {
    path:"/service-unavailable",
    element:<ServiceUnavailable/>
  }
];

export default AdminRoutes;
