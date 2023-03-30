import { Dashboard } from "@mui/icons-material";
import BrandPage from "./container/BrandPage/BrandPage";
import BrandPageEdit from "./container/BrandPageEdit/BrandPageEdit";

export const routes = [
  {
    path: "/brand",
    component: BrandPage,
  },
  {
    path: "/brand/:id",
    component: BrandPageEdit,
  },
];
