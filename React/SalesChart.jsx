import React, { useState, useEffect } from "react";
import { Card } from "reactstrap";
import { Button } from "reactstrap";
import Chart from "react-apexcharts";
import CountUp from "react-countup";
import adminService from "../../services/adminService";
import toastr from "toastr";
import debug from "sabio-debug";
const _logger = debug.extend("Admin-SaleChart");

export default function SalesChart() {
  const currentYear = new Date().getFullYear();

  const [year, setYear] = useState(currentYear);
  const [chartData, setChartData] = useState([]);

  const [counter] = useState([5, 4, 3, 2, 1, 0]);
  const [buttons, setButtons] = useState();

  const chartOptions = {
    chart: {
      toolbar: {
        show: true,
      },
      sparkline: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 0,
      colors: ["transparent"],
    },
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    fill: {
      opacity: 0.85,
      colors: ["#1bc943"],
    },

    grid: {
      strokeDashArray: "5",
      borderColor: "rgba(125, 138, 156, 0.50)",
    },
    xaxis: {
      crosshairs: {
        width: 2,
      },
    },
    yaxis: {
      min: 0,
    },
  };
  const chartDisplayData = [
    {
      name: "Revenue",
      data: chartData,
    },
  ];

  useEffect(() => {
    adminService
      .getSaleChart(year)
      .then(onGetChartSuccess)
      .catch(onGetChartError);
  }, [year]);

  const getCurrentTotal = () => {
    let total = 0;
    for (let i = 0; i < chartData.length; i++) {
      total += chartData[i];
    }
    return total;
  };

  const onGetChartSuccess = (response) => {
    let rawData = response.item;
    let mappedData = rawData.map((obj) => obj.total);
    _logger(mappedData);
    setChartData(mappedData);
    setButtons(counter.map(mapButtons));
  };

  const onGetChartError = (error) => {
    toastr.error(error);
  };

  const mapButtons = (number) => {
    return (
      <Button
        key={number}
        className="m-2 px-3"
        color="neutral-primary"
        onClick={() => setYear(currentYear - number)}
      >
        {currentYear - number}
      </Button>
    );
  };

  return (
    <>
      <Card className="card-box mb-5 px-4 pt-4 text-center shadow-success-sm">
        <div className="font-weight-bold font-size-xl mt-2 mb-2 text-black">
          Monthly Revenue for {year}
        </div>
        <hr />
        <h4 className="mb-0 display-3 mt-1 font-weight-bold text-black">
          <span>
            YTD Revenue:
            <CountUp
              start={0}
              end={getCurrentTotal()}
              duration={3}
              separator=","
              delay={2}
              decimals={2}
              decimal="."
              prefix="$"
              suffix=""
            />
          </span>
        </h4>
        <hr />

        <Chart
          options={chartOptions}
          series={chartDisplayData}
          type="bar"
          height={325}
        />

        <div className="mb-4">{buttons}</div>
      </Card>
    </>
  );
}
