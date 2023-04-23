import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Box,
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
function OrderEdit() {
  return (
    <Paper style={{ padding: "20px" }}>
      {" "}
      <Box>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <TextField select label="Trạng thái đơn hàng" fullWidth>
              <MenuItem value={0}> Đang xử lý</MenuItem>
              <MenuItem value={1}> Giao hàng thành công</MenuItem>
              <MenuItem value={0}> Đang giao hàng</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField label={"Họ tên người nhận"} fullWidth></TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField label="Số điện thoại" fullWidth></TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField label="Email" fullWidth></TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField label="Địa chỉ nhận hàng" multiline rows={3} fullWidth></TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField label="Ngày lập" fullWidth type="date" InputLabelProps={{shrink: true}}></TextField>
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
              <TableBody></TableBody>
            </Table>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Typography variant="h6" style={{ marginBottom: "20px" }}>
                Hóa đơn
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CKEditor
                    style={{ height: "200px", minHeight: "200px" }}
                    editor={ClassicEditor}
                    // data={localValues.description ? localValues.description : ""}
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      // handleInputMainChange("description", data);
                    }}
                  />
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
