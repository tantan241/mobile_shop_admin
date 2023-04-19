import { Box, Button, Card, CardActions, CardContent, Grid, TextField } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useCallback, useState } from "react";
import moment from "moment";
import classNames from "classnames/bind";
import style from "./Dashboard.module.scss";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);
function Dashboard() {
  const navigate = useNavigate();
  const initDate = {
    fromDate: "01/01/2010",
    toDate: moment(),
  };
  const [localValues, setLocalValues] = useState(initDate);
  const handleApply = useCallback(() => {
    console.log(localValues);
  }, [localValues]);
  return (
    <Box padding={"30px"}>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item xs={2}>
              <TextField
                format="DD-MM-YYYY"
                size="small"
                type="date"
                label="Từ ngày"
                InputLabelProps={{
                  shrink: true,
                }}
                value={localValues.fromDate}
                onChange={(e) => setLocalValues((prev) => ({ ...prev, fromDate: e.target.value }))}
              ></TextField>
            </Grid>
            <Grid item xs={2}>
              <TextField
                format="DD-MM-YYYY"
                size="small"
                type="date"
                label="Đến ngày"
                InputLabelProps={{
                  shrink: true,
                }}
                value={localValues.toDate}
                onChange={(e) => setLocalValues((prev) => ({ ...prev, toDate: e.target.value }))}
              ></TextField>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" onClick={() => handleApply()}>
                Áp dụng
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Card style={{ color: "white", backgroundColor: "#14a6c380" }}>
            <CardContent style={{ fontSize: "18px", textAlign: "center" }}>
              Số đơn hàng đã tạo
              <div style={{ fontSize: "60px", marginTop: "20px" }}>30</div>
            </CardContent>
            <CardActions onClick={() => navigate("/order")}>
              <ArrowBackIosIcon></ArrowBackIosIcon>
              <div className={cx("redirect")}>Đi đến hóa đơn</div>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card style={{ color: "white", backgroundColor: "#14a6c380" }}>
            <CardContent style={{ fontSize: "18px", textAlign: "center" }}>
              Số khách hàng mới
              <div style={{ fontSize: "60px", marginTop: "20px" }}>30</div>
            </CardContent>
            <CardActions onClick={() => navigate("/order")}>
              <ArrowBackIosIcon></ArrowBackIosIcon>
              <div className={cx("redirect")}>Đi đến khách hàng</div>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card style={{ color: "white", backgroundColor: "#14a6c380" }}>
            <CardContent style={{ fontSize: "18px", textAlign: "center" }}>
              Số sản phẩm bán được
              <div style={{ fontSize: "60px", marginTop: "20px" }}>30</div>
            </CardContent>
            <CardActions onClick={() => navigate("/order")}>
              <ArrowBackIosIcon></ArrowBackIosIcon>
              <div className={cx("redirect")}>Đi đến hóa đơn</div>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card style={{ color: "white", backgroundColor: "#14a6c380" }}>
            <CardContent style={{ fontSize: "18px", textAlign: "center" }}>
              Sản phẩm bán chạy
              <div style={{ fontSize: "60px", marginTop: "20px" }}>30</div>
            </CardContent>
            <CardActions onClick={() => navigate("/product")}>
              <ArrowBackIosIcon></ArrowBackIosIcon>
              <div className={cx("redirect")}>Đi đến sản phẩm</div>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card style={{ color: "white", backgroundColor: "rgb(235 224 23 / 96%)" }}>
            <CardContent style={{ fontSize: "18px", textAlign: "center" }}>
              Số sản phẩm hết hàng
              <div style={{ fontSize: "60px", marginTop: "20px" }}>30</div>
            </CardContent>
            <CardActions onClick={() => navigate("/product")}>
              <ArrowBackIosIcon></ArrowBackIosIcon>
              <div className={cx("redirect")}>Đi đến sản phẩm</div>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
