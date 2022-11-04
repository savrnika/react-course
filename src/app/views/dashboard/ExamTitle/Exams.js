import Loadable from "app/components/Loadable";
import { lazy } from "react";
import { authRoles } from "app/auth/authRoles";

const Exams= Loadable(lazy(() => import("./Exams")));

const examsRoutes = [
  {
    path: "/exams",
    element: <Exams/>,
    auth: authRoles.guest,
  },
];

export default examsRoutes;