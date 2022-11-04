import Loadable from "app/components/Loadable";
import { lazy } from "react";
import { authRoles } from "app/auth/authRoles";


const ExamList = Loadable(lazy(() => import("./ExamList")));
const GetExam=Loadable(lazy(()=>import("./GetExam")));

const ExamRoute = [
  {
    path: "/examlist",
    element: <ExamList />,
    auth: authRoles.guest,
  },
  {
    path: "/getexam/:id",
    element: <GetExam />,
    auth: authRoles.guest,
  },
];

export default ExamRoute;