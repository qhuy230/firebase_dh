import { useContext, useEffect, useState } from "react";
import "./chart.scss";
import {
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  YAxis,
  Bar,
} from "recharts";

import { DataResultImageContext } from "../../context/DataResultImageContext";

const Chart = ({ aspect, title }) => {
  var temp = useContext(DataResultImageContext).datas;
  const [data_detail, set_data_detail] = useState([]);

  var number_pass = {
    on_jan: 0,
    on_fev: 0,
    on_mar: 0,
    on_apr: 0,
    on_may: 0,
    on_june: 0,
    on_july: 0,
    on_aug: 0,
    on_sept: 0,
    on_oct: 0,
    on_nov: 0,
    on_dec: 0,
  };

  var data = [
    { name: "Jan", Total: 0 },
    { name: "Fev", Total: 0 },
    { name: "Mar", Total: 0 },
    { name: "Apr", Total: 0 },
    { name: "May", Total: 0 },
    { name: "June", Total: 0 },
    { name: "July", Total: 0 },
    { name: "Aug", Total: 0 },
    { name: "Sept", Total: 0 },
    { name: "Oct", Total: 0 },
    { name: "Nov", Total: 0 },
    { name: "Dec", Total: 0 },
  ];

  useEffect(() => {
    console.log(number_pass);
    console.log(data);
    set_data_detail([...temp]);
  }, [temp]);

  // console.log(data_detail)
  data_detail.forEach((data_row) => {
    if (data_row != undefined &&data_row.result_handle == 1) {
      const month = data_row.time_create.getMonth() + 1;
      switch (month) {
        case 1:
          number_pass.on_jan++;
          data[0].Total = number_pass.on_jan;
          break;
        case 2:
          number_pass.on_fev++;
          data[1].Total = number_pass.on_fev;
          break;
        case 3:
          number_pass.on_mar++;
          data[2].Total = number_pass.on_mar;
          break;
        case 4:
          number_pass.on_apr++;
          data[3].Total = number_pass.on_apr;
          break;
        case 5:
          number_pass.on_may++;
          data[4].Total = number_pass.on_may;
          break;
        case 6:
          number_pass.on_june++;
          data[5].Total = number_pass.on_june;
          break;
        case 7:
          number_pass.on_july++;
          data[6].Total = number_pass.on_july;
          break;
        case 8:
          number_pass.on_aug++;
          data[7].Total = number_pass.on_aug;
          break;
        case 9:
          number_pass.on_sept++;
          data[8].Total = number_pass.on_sept;
          break;
        case 10:
          number_pass.on_oct++;
          data[9].Total = number_pass.on_oct;
          break;
        case 11:
          number_pass.on_nov++;
          data[10].Total = number_pass.on_nov;
          break;
        case 12:
          number_pass.on_dec++;
          data[11].Total = number_pass.on_dec;
          break;
      }
    }
  });
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
            <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Total" fill="#1972CC" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
