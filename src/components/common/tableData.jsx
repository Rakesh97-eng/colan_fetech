export const subAdminTableHead = [
  {
    id: "id",
    label: "#",
  },
  {
    id: "first_name",
    label: "First Name",
  },
  {
    id: "last_name",
    label: "Last Name",
  },
  {
    id: "username",
    label: "User Name",
  },

  {
    id: "email",
    label: "Email ID",
  },
  {
    id: "role_name",
    label: "Designation",
  },
  {
    id: "is_active",
    label: "Status",
  },
  {
    id: "Action",
    label: "Action",
  },
];

export const subAdminTableData = [
  {
    FirstName: "Jhon",
    LastName: "Doe",
    EmailID: "Johndoe@gmail.com",
    Designation: "Employer",
    Status: "Active",
  },
  {
    FirstName: "David ",
    LastName: "Beckham",
    EmailID: "david@gmail.com",
    Designation: "Accountant",
    Status: "InActive",
  },
  {
    FirstName: "Jennifer",
    LastName: "Lopez",
    EmailID: "jennifer@yopmail.com",
    Designation: "Employer",
    Status: "InActive",
  },
  {
    FirstName: "Sandeep",
    LastName: "Sharma",
    EmailID: "Sandeep@gmail.com",
    Designation: "Manager",
    Status: "Active",
  },
];

export const dashboardTableHead = [
  {
    id: "earnings_id",
    label: "ID",
  },
  {
    id: "chatbot",
    label: "Chatbot",
  },
  {
    id: "current_pledge",
    label: "Current Pledge",
  },
  {
    id: "lifetime_support",
    label: "Lifetime Support",
  },
  {
    id: "status",
    label: "Status",
  },
];

export const manageDataTableHead = [
  {
    label:"#",
    id:'id',
    value:'id'
  },
  {
    id: "first_name",
    value: "first_name",
    label: "Name",
  },
  {
    id:'last_name',
    value:"last_name",
    label:"Last Name"

  },
  {
    id: "email",
    value: "email_id",
    label: "Email",
  },
  {
    id: "mobile_no",
    value: "mobile_no",
    label: "Phone Number",
  },
  {
    id:"product_name",
    value:"product_name",
    label:"Product"
  }
];

export const manageDataTableData = [
  { Name: "John Doe", Email: "Johndoe@gmail.com", PhoneNumber: "8934575439" },
  { Name: "David", Email: "david@gmail.com", PhoneNumber: "893457539" },
  { Name: "Sandeep", Email: "Sandeep@gmail.com", PhoneNumber: "8934675439" },
];

export const RolesAndPermissionsHead = [
  {
    id: "id",
    label: "#",
  },

  {
    id: "name",
    label: "Roles",
  },
  {
    id: "Action",
    label: "Action",
  },
];
export const RolesAndPermissionsData = [
  { "#": "1", Roles: "Accountant", Action: "checkbox" },
  { "#": "2", Roles: "Manager", Action: "checkbox" },
  { "#": "3", Roles: "Employee", Action: "checkbox" },
];

export const RoleAuthoriZationHead = [
  {
    id: "#",
    label: "#",
  },
  {
    id: "Modules",
    label: "Modules",
  },
  {
    id: "view",
    label: "View",
  },
  {
    id: "change",
    label: "Edit",
  },
  {
    id: "delete",
    label: "Delete",
  },
  {
    id: "add",
    label: "Add",
  },
];

export const RoleAuthoriZationData = [
  {
    "#": 1,
    id:"subadmins",
    Modules: "Manage Sub Admin",
    view: false,
    change: false,
    add:false,
    delete: false,
  },
  {
    "#": 2,
    id:"clients",
    Modules: "Manage Clients",
    view: false,
    change: false,
    add:false,
    delete: false,
  },
  {
    "#": 3,
    Modules: "Manage  Chatbot",
    view: false,
    change: false,
    add:false,
    delete: false,
    id:"chatbots"
  },
  {
    "#": 4,
    Modules: "Manage Subscription",
    id:"subscriptions",
    view: false,
    change: false,
    add:false,
    delete: false,
  },
  {
    "#": 5,
    Modules: "Roles & Permission",
    id:"permission",
    view: false,
    change: false,
    add:false,
    delete: false,
  },
  {
    "#": 6,
    Modules: "Manage CMS",
    id:"managecms",
    view: false,
    change: false,
    add:false,
    delete: false,
  },
  {
    "#": 7,
    Modules: "Request For Demo",
    id:"demo",
    view: false,
    change: false,
    add:false,
    delete: false,
  },
  {
    "#": 8,
    Modules: "Dashboard",
    id:"dashboard",
    view: false,
    change: false,
    add:false,
    delete: false,
  },
];
export const ClientAuthoriZationData = [
  {
    "#": 1,
    id:"subadmins",
    Modules: "Manage Sub Admin",
    view: false,
    change: false,
    add:false,
    delete: false,
  },
  {
    "#": 2,
    id:"whatsappusers",
    Modules: "Manage Data",
    view: false,
    change: false,
    add:false,
    delete: false,
  },
  {
    "#": 3,
    Modules: "Roles&Permission",
    view: false,
    change: false,
    add:false,
    delete: false,
    id:"permission"
  },
 
];

export const ClientDataHead = [
  { id: "id", label: "#" },
  {
    id: "username",
    // id: "name",
    label: "Name",
  },
  {
    id: "email",
    label: "Email ID",
  },
  {
    id: "mobile_no",
    label: "Mobile Number",
  },
  {
    id: "plan",
    label: "Subscription Plan",
  },
  {
    id: "price",
    label: "Billing",
  },
  {
    id: "clientAction",
    label: "Action",
  },
  {
    id: "receiveddata",
    label: "Received Data",
  },
  {
    id: "configuration",
    label: "Configuration",
  },
];

export const DemoaHeadData = [
  { id: "id", label: "#" },
  {
    id: "first_name",
    label: "First Name",
  },
  {
    id: "last_name",
    label: "Last Name",
  },
  {
    id: "email_id",
    label: "Email ID",
  },
  {
    id: "mobile_no",
    label: "Mobile Number",
  },
  // {
  //   id: "subscription_plan",
  //   label: "Subscription Plan",
  // },
  // {
  //   id: "billing",
  //   label: "Billing",
  // },
  // {
  //   id: "Received_Data",
  //   label: "Received Data",
  // },
];

export const ClientData = [
  {
    "#": 1,
    name: "Sandeep",
    email_id:  "Sandeep@gmail.com",
    mobile_no: 8574967845,
    subscription_plan: "Active",
    billing: "500",
    Received_Data: "None",
  },
  {
    "#": 2,
    name: "Krish",
    email_id: "krish@gmail.com",
    mobile_no: "8574968574",
    subscription_plan: "Active",
    billing: "450",
    Received_Data: "None",
  },
  {
    "#": 3,
    name: "Sandeep",
    email_id:  "Sandeep@gmail.com",
    mobile_no: 8574967845,
    subscription_plan: "Active",
    billing: "500",
    Received_Data: "None",
  },
  {
    "#": 4,
    name: "John",
    email_id: "john@gmail.com",
    mobile_no: "8574967845",
    subscription_plan: "Active",
    billing: "200",
    Received_Data: "None",
  },
];
export const RequestData = [
  {
    "#": 1,
    name: "Sandeep",
    email_id:  "Sandeep@gmail.com",
    mobile_no: 8574967845,
    subscription_plan: "Active",
    billing: "500",
    Received_Data: "None",
  },
  {
    "#": 2,
    name: "Sandeep",
    email_id: "Sharma",
    mobile_no: "Sandeep@gmail.com",
    subscription_plan: "Manager",
    billing: "Active",
    Received_Data: "None",
  },
  {
    "#": 3,
    name: "Sandeep",
    email_id: "Sharma",
    mobile_no: "Sandeep@gmail.com",
    subscription_plan: "Manager",
    billing: "Active",
    Received_Data: "None",
  },
  {
    "#": 4,
    name: "Sandeep",
    email_id: "Sharma",
    mobile_no: "Sandeep@gmail.com",
    subscription_plan: "Manager",
    billing: "Active",
    Received_Data: "None",
  },
];

export const SubscriptionDataHead = [
  {
    id: "id",
    label: "Id",
  },
  {
    id:"plan_name",
    label:"Plan"
  },
  {
    id: "interval",
    label: "Tier",
  },
  {
    id: "price",
    label: "Subscription Amount",
  },
  {
    id: "no_of_users",
    label: "No of Users",
  },
  {
    id: "no_of_chatbots",
    label: "No of Chatbots",
  },
  //no data in the api for description
  {
    id: "description",
    label: "Description",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "Action",
    label: "Edit",
  },
];

export const EditRole = [
  {
    id: "role_id",
    label: "#",
  },
  {
    id: "modules",
    label: "Modules",
  },
  {
    id: "checkbox",
    label: "View",
  },
  {
    id: "checkbox",
    label: "Edit",
  },
  {
    id: "checkbox",
    label: "Delete",
  },
];

export const chatBotTableTitle = [
  { id: "id", label: "#" },
  { id: "Chatbot_name", label: "Chatbot Name" },
  { id:"client_name",label:"Client Name"},
  { id: "status", label: "Status" },
  { id: "Action", label: "Action" },
  { id:"Publish",label:"Publish" }
  // { id: "question", label: "Question" },
];


export const manageClientConfiguration = [
  {
    
  }
]
