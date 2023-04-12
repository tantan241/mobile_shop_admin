import {
  AppBar,
  Avatar,
  Button,
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import classNames from "classnames/bind";
import styles from "./MainLayout.module.scss";
import { useEffect, useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import InventoryIcon from "@mui/icons-material/Inventory";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import HeadphonesBatteryIcon from "@mui/icons-material/HeadphonesBattery";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { routes } from "~/routes";
import useStore from "~/store/hooks";
const cx = classNames.bind(styles);
function MainLayout() {
  const [store, dispatch] = useStore();
  const [open, setOpen] = useState([]);
  const [titleAppBar, setTitleAppBar] = useState("TRANG CHỦ");
  const handleClick = (id) => {
    id === open.id ? setOpen({}) : setOpen({ id });
  };

  useEffect(() => {
    const pathNameSplit = window.location.pathname ? window.location.pathname.split("/") : ["", "", ""];
    const pathName = pathNameSplit[2];
    pathName && pathName === "add"
      ? setTitleAppBar((prev) => {
          if (prev && !prev.includes("THÊM MỚI")) {
            return `THÊM MỚI ${prev}`;
          }
          return prev;
        })
      : pathName
      ? setTitleAppBar((prev) => {
          if (prev && !prev.includes("CẬP NHẬP")) {
            return `CẬP NHẬP ${prev}`;
          }
          return prev;
        })
      : setTitleAppBar((prev) => prev.replace("THÊM MỚI", "").replace("CẬP NHẬP", ""));
  }, [store.reload]);

  const routers = [
    {
      id: 1,
      title: "TRANG CHỦ",
      to: "/dashboard",
      icon: <HomeIcon />,
      children: [],
    },
    {
      id: 2,
      title: "SẢN PHẨM",
      to: "/product",
      icon: <InventoryIcon />,
      children: [
        {
          id: 1,
          title: "THƯƠNG HIỆU",
          to: "/brand",
          icon: <BrandingWatermarkIcon />,
        },
        // {
        //   id: 2,
        //   title: "ĐIỆN THOẠI",
        //   to: "/mobile",
        //   icon: <PhoneAndroidIcon />,
        // },
        // {
        //   id: 3,
        //   title: "PHỤ KIỆN",
        //   to: "/accessory",
        //   icon: <HeadphonesBatteryIcon />,
        // },
      ],
    },
    {
      id: 3,
      title: "ĐƠN HÀNG",
      to: "/order",
      icon: <LibraryBooksIcon />,
      children: [],
    },
  ];
  return (
    <div className={cx("wrapper")}>
      <Router>
        <Grid className={cx("left")}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.black" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItem className={cx("header-nav")}>
              <div className={cx("header-text")}>ADMIN</div>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItem>
            {routers.map((item) => (
              <>
                <ListItemButton
                  component={Link}
                  to={item.to}
                  onClick={
                    item.children.length > 0
                      ? () => {
                          handleClick(item.id);
                          setTitleAppBar(item.title);
                        }
                      : () => {
                          setTitleAppBar(item.title);
                        }
                  }
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                  {item.children.length > 0 && (open.id === item.id ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
                {item.children.length > 0 && (
                  <Collapse in={open.id === item.id} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children.map((it) => (
                        <ListItemButton
                          component={Link}
                          to={it.to}
                          sx={{ pl: 4 }}
                          onClick={() => {
                            setTitleAppBar(it.title);
                          }}
                        >
                          <ListItemIcon>{it.icon}</ListItemIcon>
                          <ListItemText primary={it.title} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
              </>
            ))}
          </List>
        </Grid>
        <Grid className={cx("right")}>
          <AppBar style={{ width: "82%", height: "8vh" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <MoreVertIcon></MoreVertIcon>
              {titleAppBar}
            </Typography>
          </AppBar>
          <div style={{ marginTop: "8vh" }}>
            <Routes>
              {routes.map((publicLayout, index) => {
                const Page = publicLayout.component;
                return <Route key={index} path={publicLayout.path} element={<Page></Page>} />;
              })}
            </Routes>
          </div>
        </Grid>
      </Router>
    </div>
  );
}

export default MainLayout;
