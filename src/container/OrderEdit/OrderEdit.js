import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from 'react-ckeditor-component';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { API_GET_ONE_ORDER } from "~/api";
import { fetchData } from "~/common";
import MyEditor from "~/components/MyEditor/MyEditor";
// import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
// import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
// import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
// import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough";
// import Code from "@ckeditor/ckeditor5-basic-styles/src/code";
// import Subscript from "@ckeditor/ckeditor5-basic-styles/src/subscript";
// import Superscript from "@ckeditor/ckeditor5-basic-styles/src/superscript";
function OrderEdit() {
 

 

  const [localValues, setLocalValues] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    note: "",
    totalMoney: "",
    createdAt: "10/10/2010",
    status: "",
    order_method: "",
    user: "",
    orderDetail: [],
  });
  const pathNameSplit = window.location.pathname ? window.location.pathname.split("/") : ["", "", ""];
  useEffect(() => {
    if (pathNameSplit[2] && pathNameSplit[2] !== "add") {
      fetchData(`${API_GET_ONE_ORDER}?id=${pathNameSplit[2]}`, {}, "GET", true).then((res) => {
        if (res.status === 200) {
          console.log(moment(res.data.createdAt).format("DD/MM/YYYY"));
          setLocalValues({ ...res.data, createdAt: moment(res.data.createdAt).format("YYYY-MM-DD") });
          // console.log(res.data);
        }
      });
    }
  }, []);
  const handleInputChange = useCallback((name, value) => {
    setLocalValues((prev) => ({ ...prev, [name]: value }));
  }, []);
  return (
    <Paper style={{ padding: "20px" }}>
      {" "}
      <Box>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <TextField
              select
              label="Trạng thái đơn hàng"
              fullWidth
              value={localValues.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
            >
              <MenuItem value={0}> Đang xử lý</MenuItem>
              <MenuItem value={1}> Giao hàng thành công</MenuItem>
              <MenuItem value={2}> Đang giao hàng</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={"Họ tên người nhận"}
              fullWidth
              value={localValues.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Số điện thoại"
              fullWidth
              value={localValues.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Email"
              fullWidth
              value={localValues.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Địa chỉ nhận hàng"
              multiline
              rows={3}
              fullWidth
              value={localValues.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              format="DD/MM/YYYY"
              label="Ngày lập"
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              value={localValues.createdAt}
              onChange={(e) => setLocalValues((prev) => ({ ...prev, createdAt: e.target.value }))}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Chi tiết sản phẩm</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Tên sản phẩm</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Thành tiền</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {localValues.orderDetail &&
                  localValues.orderDetail.map((item, index) => (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>

                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.number}</TableCell>
                      <TableCell>
                        {(item.price * item.number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Typography variant="h6" style={{ marginBottom: "20px" }}>
                Hóa đơn
              </Typography>
              <Grid item xs={12}>
                <Button variant="contained" color="primary">
                  Tạo hóa đơn
                </Button>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <MyEditor  data={
                      '<section><div> <div style="border-top: 1px dashed rgb(0, 0, 0)"></div> <div>Điện thoại Điện thoại Điện thoại Điện thoại Điện thoại Điện thoại Điện thoại Điện thoại</div> <div style="display: flex; flex-direction: row-reverse"> <div>5,990,990</div> <div style="margin: 0 20px"></div> <div>1</div> </div> </div></section>'
                    }>

                  </MyEditor>
                  {/* <CKEditor
                  id={"editor"}
                    style={{ height: "200px", minHeight: "200px" }}
                    editor={ClassicEditor}
                    data={
                      '<section><div> <div style="border-top: 1px dashed rgb(0, 0, 0)"></div> <div>Điện thoại Điện thoại Điện thoại Điện thoại Điện thoại Điện thoại Điện thoại Điện thoại</div> <div style="display: flex; flex-direction: row-reverse"> <div>5,990,990</div> <div style="margin: 0 20px"></div> <div>1</div> </div> </div></section>'
                    }
                    onReady={(editor) => {
                      editor.config.allowedContent = true;
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                    }}
                    config={{
                      allowedContent: true,
                    }}
                  /> */}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default OrderEdit;
