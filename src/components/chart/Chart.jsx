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
  Legend,
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

  var number_total = {
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
    { name: "Jan", Total: 0, Pass: 0 },
    { name: "Fev", Total: 0, Pass: 0 },
    { name: "Mar", Total: 0, Pass: 0 },
    { name: "Apr", Total: 0, Pass: 0 },
    { name: "May", Total: 0, Pass: 0 },
    { name: "June", Total: 0, Pass: 0 },
    { name: "July", Total: 0, Pass: 0 },
    { name: "Aug", Total: 0, Pass: 0 },
    { name: "Sept", Total: 0, Pass: 0 },
    { name: "Oct", Total: 0, Pass: 0 },
    { name: "Nov", Total: 0, Pass: 0 },
    { name: "Dec", Total: 0, Pass: 0 },
  ];

  useEffect(() => {
    console.log(number_pass);
    console.log(data);
    set_data_detail([...temp]);
  }, [temp]);

  data_detail.forEach((data_row) => {
    var month=0;
    if (data_row != undefined) {
      try{
        month = data_row.time_create.getMonth() + 1;
      }catch(e){
        return;
      }
      switch (month) {
        case 1:
          if (data_row.result_handle == 1) number_pass.on_jan++;
          number_total.on_jan++;
          data[0].Total = number_total.on_jan;
          data[0].Pass = number_pass.on_jan;
          break;
        case 2:
          if (data_row.result_handle == 1) number_pass.on_fev++;
          number_total.on_fev++;
          data[1].Pass = number_pass.on_fev;
          data[1].Total = number_total.on_fev;
          break;
        case 3:
          if (data_row.result_handle == 1) number_pass.on_mar++;
          number_total.on_mar++;
          data[2].Pass = number_pass.on_mar;
          data[2].Total = number_total.on_mar;
          break;
        case 4:
          if (data_row.result_handle == 1) number_pass.on_apr++;
          number_total.on_apr++;
          data[3].Pass = number_pass.on_apr;
          data[3].Total = number_total.on_apr;
          break;
        case 5:
          if (data_row.result_handle == 1) number_pass.on_may++;
          number_total.on_may++;
          data[4].Pass = number_pass.on_may;
          data[4].Total = number_total.on_may;
          break;
        case 6:
          if (data_row.result_handle == 1) number_pass.on_june++;
          number_total.on_june++;
          data[5].Pass = number_pass.on_june;
          data[5].Total = number_total.on_june;
          break;
        case 7:
          if (data_row.result_handle == 1) number_pass.on_july++;
          number_total.on_july++;
          data[6].Pass = number_pass.on_july;
          data[6].Total = number_total.on_july;
          break;
        case 8:
          if (data_row.result_handle == 1) number_pass.on_aug++;
          number_total.on_aug++;
          data[7].Pass = number_pass.on_aug;
          data[7].Total = number_total.on_aug;
          break;
        case 9:
          if (data_row.result_handle == 1) number_pass.on_sept++;
          number_total.on_sept++;
          data[8].Pass = number_pass.on_sept;
          data[8].Total = number_total.on_sept;
          break;
        case 10:
          if (data_row.result_handle == 1) number_pass.on_oct++;
          number_total.on_oct++;
          data[9].Pass = number_pass.on_oct;
          data[9].Total = number_total.on_oct;
          break;
        case 11:
          if (data_row.result_handle == 1) number_pass.on_nov++;
          number_total.on_nov++;
          data[10].Pass = number_pass.on_nov;
          data[10].Total = number_total.on_nov;
          break;
        case 12:
          if (data_row.result_handle == 1) number_pass.on_dec++;
          number_total.on_dec++;
          data[11].Pass = number_pass.on_dec;
          data[11].Total = number_total.on_dec;
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
            <Legend />
            <Bar dataKey="Total" stackId="a" fill="#1972CC" />
            <Bar dataKey="Pass" stackId="a" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
