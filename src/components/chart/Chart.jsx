import { useEffect } from "react";
import "./chart.scss";
import {
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  YAxis,
  Bar,
  Legend,
} from "recharts";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const data = [
  { name: "Jan", Total: 1200 },
  { name: "Fev", Total: 2100 },
  { name: "Mar", Total: 800 },
  { name: "Apr", Total: 1600 },
  { name: "May", Total: 900 },
  { name: "June", Total: 1200 },
  { name: "July", Total: 2100 },
  { name: "Aug", Total: 800 },
  { name: "Sept", Total: 1600 },
  { name: "Oct", Total: 900 },
  { name: "Nov", Total: 900 },
  { name: "Dec", Total: 900 },
];

const Chart = ({ aspect, title }) => {
  useEffect(() => {
    const q = query(
      collection(db, "Result_Image"),
      where("result_handle", "==", 1)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        // console.log(change);
        if (change.type === "added") {
          console.log("data: ", change.doc.data());
        }
      });
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <div>
        <ResponsiveContainer aspect={aspect}>
          <BarChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 25, right: 30, left: 0, bottom: 0 }}
          >
            {/* <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          /> */}
            <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            <Bar dataKey="Total" fill="#8884d8" />
            {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
