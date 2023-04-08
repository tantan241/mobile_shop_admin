import { useEffect } from "react";
import { actions } from "~/store";
import useStore from "~/store/hooks";

function MobilePageEdit() {
  const [store, dispatch] = useStore();
  useEffect(() => {
    dispatch(actions.setReload(new Date() * 1));
    // if (pathNameSplit[2] && pathNameSplit[2] !== "add") {
    //   fetchData(`${API_GET_ONE_BRAND}?id=${pathNameSplit[2]}`, {}, "GET", true).then((res) => {
    //     if (res.status === 200) {
    //       setValueState(res.data);
    //     }
    //   });
    // }
  }, []);
  return <h1>Mobile page edit</h1>;
}

export default MobilePageEdit;
