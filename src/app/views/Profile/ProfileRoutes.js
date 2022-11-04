import Loadable from "app/components/Loadable";
import { lazy } from "react";
import { authRoles } from "app/auth/authRoles";
//import viewProfile from "./ViewProfile";

const ViewProfile = Loadable(lazy(() => import("./ViewProfile")));
const EditProfile=Loadable(lazy(()=>import("./EditProfile")));

const profileRoutes = [
  {
    path: "/profile",
    element: <ViewProfile />,
    auth: authRoles.guest,
  },
  {
    path: "/editusers/:id",
    element: <EditProfile />,
    auth: authRoles.guest,
  },
];

export default profileRoutes;