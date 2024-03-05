import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase";

export const DataResultImageContext = createContext();
export const DataResultImageProvider = ({ children }) => {
  const [number_total_result, set_number_total_result] = useState(0.0);
  const [number_pass_result, set_number_pass_result] = useState(0.0);
  const [datas, setDatas] = useState([]);
  var tempData = {};
  useEffect(() => {
    const q = query(collection(db, "Result_Image"));
    const q2 = query(
      collection(db, "Result_Image"),
      where("result_handle", "==", 1)
    );
    const fetchData = async () => {
      const querySnapshot = await getDocs(q2);
      set_number_pass_result(querySnapshot.size);
    };

    const unsubscribe = onSnapshot(q, (snapshot) => {
      set_number_total_result(snapshot.docs.length);
      fetchData();
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setDatas((prevRows) => {
            if (change.type === "added") {
              tempData = change.doc.data();
              tempData["id"] = change.doc.id;
              tempData["count"] = change.newIndex + 1;
              if (tempData["time_create"] !== undefined) {
                // var t = new Date(1970, 0, 1);
                var t = new Date("January 1, 1970 07:00:00 (ICT)");
                // console.log(newd)
                t.setSeconds(tempData["time_create"].seconds);
                tempData.time_create=t
              }
              return [tempData,...prevRows];
            }
            
          });
        }
      });
    });
    return () => unsubscribe();
  }, []);
  return (
    <DataResultImageContext.Provider
      value={{
        number_total_result,
        number_pass_result,
        datas,
      }}
    >
      {children}
    </DataResultImageContext.Provider>
  );
};
