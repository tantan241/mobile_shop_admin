import { Dashboard } from "@mui/icons-material";
import BrandPage from "./container/BrandPage/BrandPage";
import BrandPageEdit from "./container/BrandPageEdit/BrandPageEdit";
import MobilePage from "./container/MobilePage/MobilePage";
import MobilePageEdit from "./container/MobilePageEdit/MobilePageEdit";

export const routes = [
  {
    path: "/brand",
    component: BrandPage,
  },
  {
    path: "/brand/:id",
    component: BrandPageEdit,
  },
  {
    path: "/mobile",
    component: MobilePage,
  },
  {
    path: "/mobile/:id",
    component: MobilePageEdit,
  },
];
