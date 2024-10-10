import AdminRoutes from "./adminRoutes";
import authRoutes from "./authRoutes";
import UserRoutes from "./userRoutes";

const ROLES_ROUTES = {
  0: authRoutes,
  1: UserRoutes,
  2: AdminRoutes,
};

export const getRoutes = (role) => {
  return ROLES_ROUTES[role];
};
