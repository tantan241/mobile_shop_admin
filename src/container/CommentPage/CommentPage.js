import { Box, Button, Dialog, DialogTitle, Fab, Grid, IconButton, MenuItem, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { API_ADMIN_COMMENT, API_GET_ONE_COMMENT, API_UPDATE_COMMENT, URL_IMAGE } from "~/api";
import List from "~/components/List/List";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import { fetchData, handleClickVariant } from "~/common";
import { enqueueSnackbar } from "notistack";

function CommentPage(props) {
  const { idProduct } = props;
  const [dialog, setDialog] = useState({ image: false, comment: false });
  const [urlImage, setUrlImage] = useState("");
  const [comment, setComment] = useState({});
  const [reload, setReload] = useState(0);
  const mapFunction = useCallback((data) => {
    return data.map((item) => ({
      ...item,
      status: item.status === 1 ? "Hiện thị" : "Không hiện thị",
      createdAt: item.createdAt ? moment(item.createdAt).format("DD-MM-YYYY") : "",
    }));
  }, []);
  const getDataCommet = useCallback((id) => {
    fetchData(`${API_GET_ONE_COMMENT}?id=${id}`, {}, "GET", true).then((res) => {
      if (res.status === 200) {
        setComment(res.data);
      }
    });
  }, []);
  const updateComment = useCallback(
    (id) => {
      fetchData(`${API_UPDATE_COMMENT}`, comment, "POST", true).then((res) => {
        if (res.status === 200) {
          handleClickVariant("success", res.messenger, enqueueSnackbar);

          setDialog((prev) => ({ ...prev, comment: false }));
          setReload(new Date() * 1);
        }
      });
    },
    [comment]
  );
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Grid container spacing={4} alignItems={"center"}>
            <Grid item xs={4}>
              <img
                width={"200px"}
                height={"200px"}
                src="data:image/jpeg;base64,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"
                alt=""
              />
              <p>Sam sung galaxy A32 Sam sung galaxy A32 Sam sung galaxy A32 Sam sung galaxy A32 Sam sung galaxy A32</p>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <div style={{ display: "flex" }}>
                    <div>Tổng số đánh giá: &nbsp;</div>
                    <div> 500 đánh giá</div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ display: "flex" }}>
                    <div>Trung bình sao đánh giá: &nbsp;</div>
                    <div>4.5</div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ display: "flex" }}>
                    <div>Số đánh giá 5 sao: &nbsp;</div>
                    <div> 500 đánh giá</div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ display: "flex" }}>
                    <div>Số đánh giá 4 sao:&nbsp;</div>
                    <div> 500 đánh giá</div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ display: "flex" }}>
                    <div>Số đánh giá 3 sao:&nbsp;</div>
                    <div> 500 đánh giá</div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ display: "flex" }}>
                    <div>Số đánh giá 2 sao:&nbsp;</div>
                    <div> 500 đánh giá</div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ display: "flex" }}>
                    <div>Số đánh giá 1 sao:&nbsp;</div>
                    <div> 500 đánh giá</div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <List
            height={500}
            model={"comment"}
            url={`${API_ADMIN_COMMENT}/${idProduct}`}
            mapFunction={mapFunction}
            limit={100}
            skip={5}
            rowsPerPageOptions={[10, 30, 100]}
            reloadOut={reload}
            customEdit={(params) => (
              <Fab
                size="small"
                color="primary"
                onClick={() => {
                  getDataCommet(params.row.id);
                  setDialog((prev) => ({ ...prev, comment: true }));
                }}
              >
                <IconButton aria-label="edit">
                  <EditIcon style={{ color: "white" }} />
                </IconButton>
              </Fab>
            )}
            cellCustom={{
              field: "image",
              data: (params) => (
                <img
                  width={"80%"}
                  alt=""
                  src={`${URL_IMAGE}/${params.value}`}
                  onClick={() => {
                    setDialog((prev) => ({ ...prev, image: true }));
                    setUrlImage(`${URL_IMAGE}/${params.value}`);
                  }}
                />
              ),
            }}
            disableAdd
          ></List>
        </Grid>
      </Grid>
      <Dialog
        open={dialog.image}
        onClose={() => {
          setDialog((prev) => ({ ...prev, image: false }));
        }}
        maxWidth={"lg"}
      >
        <DialogTitle>Hình ảnh chi tiết</DialogTitle>
        <div style={{ margin: "20px" }}>
          <img width={"80%"} height={"100%"} alt="Hình ảnh comment" src={urlImage} />
        </div>
      </Dialog>
      <Dialog
        maxWidth={"lg"}
        open={dialog.comment}
        onClose={() => {
          setDialog((prev) => ({ ...prev, comment: false }));
        }}
      >
        <DialogTitle>Nhận xét</DialogTitle>
        <Grid container spacing={2} style={{ padding: "20px 50px" }}>
          <Grid item xs={8}>
            <div style={{ padding: "20px" }}>{comment?.content ? comment?.content : ""}</div>
          </Grid>
          <Grid item xs={4}>
            {comment.image ? (
              <img
                width={"80%"}
                height={"100%"}
                alt="Hình ảnh comment"
                src={comment.image ? `${URL_IMAGE}/${comment.image}` : ""}
              />
            ) : (
              <div>Nhận xét không có hình ảnh</div>
            )}
          </Grid>
          <Grid item xs={8}></Grid>
          <Grid item xs={4}>
            <Grid container spacing={2} alignItems={"center"}>
              <Grid item xs={5}>
                <div>Trạng thái: </div>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={parseInt(comment.status)}
                  size="small"
                  select
                  onChange={(e) => setComment((prev) => ({ ...prev, status: e.target.value }))}
                >
                  <MenuItem value={1}>Hiện Thị</MenuItem>
                  <MenuItem value={0}>Không Hiện Thị</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => {
                  setDialog((prev) => ({ ...prev, comment: false }));
                }}
              >
                Hủy bỏ
              </Button>
              <div style={{ margin: "0 4px" }}></div>
              <Button variant="contained" size="small" onClick={() => updateComment()}>
                Lưu
              </Button>
            </div>
          </Grid>
        </Grid>
      </Dialog>
    </Box>
  );
}

export default CommentPage;
