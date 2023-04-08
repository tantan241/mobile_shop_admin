import { useCallback } from "react";
import { API_ADMIN_PRODUCT } from "~/api";
import List from "~/components/List/List";

function BrandPage() {
  const mapFunction = useCallback((data) => {
    return data.map((item) => ({
      ...item,
      status: item.status == 1 ? "Hoạt động" : "Ngừng hoạt động",
    }));
  }, []);
  return (
    <div style={{ width: "90%", marginLeft: "20px" }}>
      <List
        height={500}
        model={"brand"}
        url={API_ADMIN_PRODUCT}
        mapFunction={mapFunction}
        limit={100}
        skip={5}
        rowsPerPageOptions={[8, 30, 100]}
      ></List>
    </div>
  );
}

export default BrandPage;
