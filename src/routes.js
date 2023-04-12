import { Dashboard } from "@mui/icons-material";
import BrandPage from "./container/BrandPage/BrandPage";
import BrandPageEdit from "./container/BrandPageEdit/BrandPageEdit";
import ProductEdit from "./container/ProductEdit/ProductEdit";
import Product from "./container/ProductPage/Product";

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
    path: "/product",
    component: Product,
  },
  {
    path: "/product/:id",
    component: ProductEdit,
  },
];
