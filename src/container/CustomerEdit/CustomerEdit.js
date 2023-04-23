import { Button, Grid, Paper, TextField } from "@mui/material";

function CustomerEdit() {
  return (
    <Paper style={{ padding: "20px" }}>
      <Grid container spacing={4}>
      <Grid item xs={12}>
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <Button
                variant="contained"
                color="error"
                // onClick={() => {
                //   dispatch(actions.setReload(new Date() * 1));
                //   navigate("/product");
                // }}
              >
                Hủy bỏ
              </Button>
              <div style={{ margin: "0 5px" }}></div>
              <Button variant="contained" 
              // onClick={() => handleSave()}
              >
                Lưu
              </Button>
            </div>
          </Grid>
        <Grid item xs={4}>
          <TextField label="Họ và tên" fullWidth></TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField label="Email" fullWidth></TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField label="Số điện thoại" fullWidth></TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Địa chỉ" multiline rows={3} fullWidth></TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField label="Số đơn mua" fullWidth></TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField label="Tổng số tiền mua" fullWidth></TextField>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CustomerEdit;
