import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleIcon from "@mui/icons-material/People";
import ForumIcon from "@mui/icons-material/Forum";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import SettingsIcon from "@mui/icons-material/Settings";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ListIcon from '@mui/icons-material/List';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
export const UsermenuItems = [
  {
    // path: "/dashboard/subadmin",
    // name: "Dashboard",
    // icon: "",

    isNested: [
      {
        path: "/dashboard/subadmin",
        name: "Manage Sub Client",
        permissionlabel:"subclients",
        icon: <ManageAccountsIcon />,
      },
      {
        path: "/dashboard/data",
        name: "Manage Data",
        permissionlabel:"whatsappusers",
        icon: <SettingsIcon />,
      },
      {
        path: "/dashboard/chatbot",
        name: "Manage Chatbot",
        permissionlabel:"chatbots",
        child:"/dashboard/flowpage",
        icon: <ForumIcon />,
        id:"managechatbot"
      },
      {
        path: "/dashboard/manageconfig",
        name: "Manage Configuration",
        permissionlabel:"group",
        icon: <SettingsApplicationsIcon  color="white"/>,
      },
      {
        path: "/dashboard/roles",
        name: "Manage Roles And Permission",
        permissionlabel:"group",
        icon: <ForumIcon />,
      },
    ],
  },
];
export const UsermenuIconItems = [
  {
    path: "/dashboard/subadmin",
    permissionlabel:"subclients",
    icon: "",

    isNested: [
      {
        path: "/dashboard/subadmin",
        permissionlabel:"subclients",
        icon: <ManageAccountsIcon />,
      },
      {
        path: "/dashboard/data",
        permissionlabel:"whatsappusers",
        icon: <SettingsIcon />,
      },
      {
        path: "/dashboard/chatbot",    
        permissionlabel:"chatbots",
        child:"/dashboard/flowpage",
        icon: <ForumIcon/>
      },
      {
        path: "/dashboard/manageconfig",
        permissionlabel:"group",
        icon: <SettingsApplicationsIcon color="white"/>,
      },
      {
        path: "/dashboard/roles",
        permissionlabel:"group",
        icon: <ForumIcon />,
      },
    ],
  },
];

export const AdminMenuItems=[
    {
        path: "/dashboard",
        name: "Dashboard",
        id:"dashboard",
        permissionlabel:"dashboarddata",
        icon: "",
        isNested:[

            {
                path: "/dashboard/subadmin",
                name: "Manage Sub Admin",
                icon:<ManageAccountsIcon/> ,
                permissionlabel:"subadmins",
                child:"/dashboard/editsubadmin",
                id:"managesubadmin"
            
              },
              {
                path: "/dashboard/client",
                name: "Manage Clients",
                icon: <PeopleIcon/>,
                permissionlabel:"clients",
                child:"/dashboard/receivedclient",
                id:"manageclients"
              },
              {
                path: "/dashboard/chatbot",
                name: "Manage Chatbot",
                icon: <ForumIcon/>,
                child:"/dashboard/flowpage",
                permissionlabel:"chatbots",
                id:"managechatbot"
              },
              {
                path: "/dashboard/subscription",
                name: "Manage Subscription",
                icon: <CardMembershipIcon/>,
                permissionlabel:"subscriptions",
                child:"/dashboard/editsubscription",
                id:"managesubscription"
              },
              {
                path: "/dashboard/roles",
                name: "Roles and Permission",
                icon: <SettingsIcon/>,
                permissionlabel:"permission",
                child:"/dashboard/editroles",
                id:"manageroles"
              },
              {
                path: "/dashboard/cms",
                name: "Manage CMS",
                icon: <SupportAgentIcon/>,
                id:"managecms",
                permissionlabel:"managecms",
              },
              {
                path: "/dashboard/demo",
                name: "Request For Demo",
                icon:  <SettingsIcon/>,
                id:"managedemo",
                permissionlabel:"demo",
              },
        ]
      },
]
export const AdminIconMenuItems=[
    {
        path: "/dashboard",
        icon: "",
        permissionlabel:"dashboarddata",
        isNested:[

            {
                path: "/dashboard",
                permissionlabel:"dashboarddata",
                icon:<ListIcon/> ,
              },
            {
                path: "/dashboard/subadmin",
                permissionlabel:"subadmins",
                child:"/dashboard/editsubadmin",
                icon:<ManageAccountsIcon/> ,
              },
              {
                path: "/dashboard/client",
                permissionlabel:"clients",
                child:"/dashboard/receivedclient",

                icon: <PeopleIcon/>,
              },
              {
                path: "/dashboard/chatbot",    
                permissionlabel:"chatbots",
                child:"/dashboard/flowpage",
                icon: <ForumIcon/>
              },
              {
                path: "/dashboard/subscription",
                permissionlabel:"subscriptions",
                child:"/dashboard/editsubscription",
                icon: <CardMembershipIcon/>,
              },
              {
                path: "/dashboard/roles",
                permissionlabel:"permission",
                child:"/dashboard/editroles",
                icon: <SettingsIcon/>,
              },
              {
                path: "/dashboard/cms",
                permissionlabel:"managecms",
                icon: <SupportAgentIcon/>,
              },
              {
                path: "/dashboard/demo",  
                permissionlabel:"demo",
                icon:  <SettingsIcon/>,
              },
        ]
      },
]


// "contenttype": [
//   "view",
//   "add",
//   "delete",
//   "change"
// ],
// "dashboarddata": [
//   "delete",
//   "view",
//   "change",
//   "add"
// ],
// "demo": [
//   "view",
//   "change",
//   "delete",
//   "add"
// ],
// "designation": [
//   "change",
//   "view",
//   "delete",
//   "add"
// ],
// "earnings": [
//   "add",
//   "delete",
//   "change",
//   "view"
// ],
// "group": [
//   "delete",
//   "view",
//   "change",
//   "add"
// ],
// "logentry": [
//   "delete",
//   "change",
//   "view",
//   "add"
// ],
// "managechatbot": [
//   "add",
//   "view",
//   "change",
//   "delete"
// ],
// "manageclients": [
//   "view",
//   "add",
//   "change",
//   "delete"
// ],
// "managecms": [
//   "add",
//   "view",
//   "change",
//   "delete"
// ],
// "managedata": [
//   "view",
//   "change",
//   "delete",
//   "add"
// ],
// "managesubadmin": [
//   "add",
//   "view",
//   "change",
//   "delete"
// ],
// "managesubscription": [
//   "delete",
//   "change",
//   "view",
//   "add"
// ],
// "permission": [
//   "view",
//   "add",
//   "delete",
//   "change"
// ],
// "session": [
//   "add",
//   "delete",
//   "change",
//   "view"
// ],
// "status": [
//   "change",
//   "delete",
//   "add",
//   "view"
// ],
// "subscriptionplan": [
//   "delete",
//   "add",
//   "view",
//   "change"
// ],
// "token": [
//   "view",
//   "delete",
//   "change",
//   "add"
// ],
// "tokenproxy": [
//   "change",
//   "add",
//   "view",
//   "delete"
// ],
// "uploadedfile": [
//   "add",
//   "change",
//   "view",
//   "delete"
// ],
// "user": [
//   "delete",
//   "change",
//   "view",
//   "add"
// ]

