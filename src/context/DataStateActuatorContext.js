import {
    collection,
    getDocs,
    onSnapshot,
    query,
    where,
  } from "firebase/firestore";
  import { createContext, useEffect, useState } from "react";
  import { db } from "../firebase";
  
  export const DataStateActuatorContext = createContext();
  export const DataStateActuatorProvider = ({ children }) => {
    const [datas, setDatas] = useState([]);
    var tempData = {};
    useEffect(() => {
      const q = query(collection(db, "Actuators"));
  
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "modified"||change.type === "added") {
            setDatas((prevRows) => {
              if (change.type === "modified"||change.type === "added") {
                tempData = change.doc.data();
                console.log(tempData)
                return tempData;
              }
              
            });
          }
        });
      });
      return () => unsubscribe();
    }, []);
    return (
      <DataStateActuatorContext.Provider
        value={{
          datas,
        }}
      >
        {children}
      </DataStateActuatorContext.Provider>
    );
  };
  