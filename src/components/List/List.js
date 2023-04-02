import { Add } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  MenuItem,
  Pagination,
  TablePagination,
  TextField,
  Tooltip,
} from "@mui/material";
import { DataGrid, GridPagination, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "./List.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchData } from "~/common";
function CustomFooter(props) {
  const { count, page, handleChangePage, rowsPerPage, handleChangeRowsPerPage, rowsPerPageOptions } = props;
  return (
    <TablePagination
      component="div"
      labelRowsPerPage="Số dòng hiện thị"
      count={count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
    />
  );
}

function List(props) {
  const { height, url, mapFunction, rowsPerPageOptions, model } = props;
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [rowsSelect, setRowsSelect] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [typeInputSearch, setTypeInputSearch] = useState({ type: "text", value: [] });
  const [fieldSearch, setFieldSearch] = useState("default");
  const [valueSearch, setValueSearch] = useState("default");
  const [dataSearch, setDataSearch] = useState([]);
  const [reload, setReload] = useState(0);
  const [sortModel, setSortModel] = useState([]);
  const [openDialgDelete, setOpenDialogDelete] = useState(false);
  const [oneRowDelete, setOneRowDelete] = useState("");
  const [clickDeleteMultiple, setClickDeleteMultiple] = useState(false);
  const fakeData = [
    {
      name: "--- Chọn giá trị ---",
      value: "default",
      type: "",
    },
    {
      name: "Tên thương hiệu",
      value: "name",
      type: "text",
    },
    {
      name: "Trạng thái",
      value: "status",
      type: "select",
      select: [
        {
          name: "--- Chọn giá trị ---",
          value: "default",
        },
        {
          name: "Hoạt động",
          value: "1",
        },
        {
          name: "Ngừng Hoạt động",
          value: "0",
        },
      ],
    },
  ];

  // Xóa
  const handleCloseDialogDelete = useCallback(() => {
    setOpenDialogDelete(false);
  }, []);
  // const handleDeleteOneRow = useCallback((data) => {}, []);
  const deleteRows = useCallback((data) => {
    console.log(data);
    let ids = [];
    if (Array.isArray(data)) {
      data.forEach((item) => {
        ids.push(item.id);
      });
    } else {
      ids.push(data.id);
    }

    ids = JSON.stringify(ids);
    fetchData(`${url}/list-${model}?ids=${ids}`, {}, "DELETE", true).then((res) => {
      if (res.status === 200) {
        setReload(new Date() * 1);
        setOpenDialogDelete(false);
      }
    });
  }, []);
  //

  const handleFieldSearchChange = useCallback(
    (value) => {
      console.log(value);
      setFieldSearch(value);
      const data = dataSearch.find((item) => item.value === value);
      if (data.type === "select") {
        setTypeInputSearch({ type: "select", value: data.select });
      } else {
        setTypeInputSearch({ type: "text", value: [] });
      }
    },
    [dataSearch]
  );

  const handleSearch = useCallback(() => {
    setReload(new Date() * 1);
    setPage(0);
  }, [valueSearch, fieldSearch]);
  useEffect(() => {
    const body = {
      limit: rowsPerPage,
      page: page,
      search: { field: fieldSearch, value: valueSearch, type: typeInputSearch.type },
      sort: sortModel[0],
    };
    fetchData(`${url}/list-${model}`, body, "POST", true).then((res) => {
      if (res.status === 200) {
        setPageInfo(res.pageInfo);
        setDataSearch(res.dataSearch);
        res.columns.push({
          field: "action",
          headerName: "Hành  động",
          description: "Hành động",
          sortable: false,
          flex: 0.8,
          filterable: false,
          renderCell: (params) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>{params.value}</div>
              <div style={{ marginLeft: "auto" }}>
                <IconButton aria-label="edit" onClick={() => console.log("Edit", params.row)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    setClickDeleteMultiple(false);
                    setOneRowDelete(params.row);
                    setOpenDialogDelete(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ),
        });
        setColumns(res.columns);
        let rowsList = res.rows;
        if (mapFunction && typeof mapFunction === "function") {
          rowsList = mapFunction(rowsList);
        }
        setRows(rowsList);
      }
    });
  }, [url, rowsPerPage, page, mapFunction, model, reload, sortModel]);
  const handleSelectionModelChange = useCallback(
    (newSelectionModel) => {
      const selectedRows = rows.filter((row) => newSelectionModel.includes(row.id));
      console.log(selectedRows);
      setRowsSelect(selectedRows);
    },
    [rows]
  );

  return (
    <div style={{ height: height, padding: "10px", width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {dataSearch.length > 0 && (
            <>
              <TextField
                size="small"
                select
                label="Trường tìm kiếm"
                value={fieldSearch}
                onChange={(e) => handleFieldSearchChange(e.target.value)}
              >
                {dataSearch.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              {typeInputSearch.type === "select" ? (
                <TextField
                  size="small"
                  select
                  label="Giá trị tìm kiếm"
                  value={valueSearch}
                  style={{ margin: "0 10px" }}
                  onChange={(e) => {
                    setValueSearch(e.target.value);
                  }}
                >
                  {typeInputSearch.value.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  label="Giá trị tìm kiếm"
                  variant="outlined"
                  size="small"
                  style={{ margin: "0 10px" }}
                  onChange={(e) => {
                    setValueSearch(e.target.value);
                  }}
                />
              )}

              <Button color="primary" variant="contained" size="small" onClick={handleSearch}>
                Tìm kiếm
              </Button>
            </>
          )}
        </div>
        <div>
          {rowsSelect.length > 0 && (
            <Fab
              color="error"
              size="small"
              style={{ marginRight: "10px" }}
              onClick={() => {
                setClickDeleteMultiple(true);
                setOpenDialogDelete(true);
              }}
            >
              <Tooltip title="Xóa">
                <DeleteIcon></DeleteIcon>
              </Tooltip>
            </Fab>
          )}
          <Link to={`${window.location.pathname}/edit`}>
            <Fab color="primary" size="small">
              <Tooltip title="Thêm mới">
                <Add></Add>
              </Tooltip>
            </Fab>
          </Link>
        </div>
      </div>

      <DataGrid
        column={{ xs: 12, md: 6 }}
        autoHeight={true}
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        checkboxSelection
        onRowSelectionModelChange={handleSelectionModelChange}
        hideFooterPagination
        sortModel={sortModel}
        onSortModelChange={(model) => {
          console.log(model);
          setSortModel(model);
        }}
        components={{
          Footer: () => (
            <CustomFooter
              count={pageInfo.count}
              rowsPerPage={rowsPerPage}
              page={page}
              handleChangeRowsPerPage={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              handleChangePage={(e, newPage) => setPage(newPage)}
              rowsPerPageOptions={rowsPerPageOptions}
            ></CustomFooter>
          ),
        }}
      />

      <Dialog open={openDialgDelete} onClose={handleCloseDialogDelete}>
        <DialogTitle>Bạn có chắc chắn muốn xóa?</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              if (clickDeleteMultiple) {
                deleteRows(rowsSelect);
              } else {
                deleteRows(oneRowDelete);
              }
            }}
          >
            Xóa
          </Button>
          <Button variant="outlined" autoFocus onClick={handleCloseDialogDelete}>
            Quay lại
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default List;
