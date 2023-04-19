import List from "~/components/List/List";

function CustomerPage() {
    return <div style={{ width: "100%", marginLeft: "20px" }}>
    <List
      height={500}
      model={"product"}
    //   url={API_ADMIN_PRODUCT}
    //   mapFunction={mapFunction}
      limit={100}
      skip={5}
      rowsPerPageOptions={[10, 30, 100]}
    ></List>
  </div>;
}

export default CustomerPage;