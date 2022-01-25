import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Card } from "reactstrap";
import Chart from "react-apexcharts";
import CountUp from "react-countup";

import debug from "sabio-debug";
import PropTypes from "prop-types";

const _logger = debug.extend("Admin-Quickview");

const QuickViewTotals = (props) => {
  _logger(props.data);
  const usersChartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      color: "#f83245",
      curve: "smooth",
      width: 2,
    },
    colors: ["#f83245"],
    fill: {
      color: "#f83245",
      opacity: 0.3,
    },
    legend: {
      show: false,
    },
    xaxis: {
      crosshairs: {
        width: 1,
      },
    },
    yaxis: {
      min: 0,
    },
  };
  const usersChartData = [
    {
      data: [47, 45, 54, 38, 56, 24, 65],
    },
  ];
  const salesChartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "rounded",
        columnWidth: "70%",
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    colors: ["#1bc943", "rgba(110, 123, 220, 1)"],
    fill: {
      opacity: 1,
    },
    legend: {
      show: false,
    },

    xaxis: {
      crosshairs: {
        width: 5,
      },
    },
    yaxis: {
      min: 0,
    },
  };
  const salesChartData = [
    {
      data: [2.3, 3.1, 4.0, 3.8, 5.1, 3.6, 3.2],
    },
    {
      name: "Net Loss",
      data: [2.1, 2.1, 3.0, 2.8, 4.1, 2.6, 1.2],
    },
  ];
  const ordersChartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      color: "#4191ff",
      curve: "smooth",
      width: 2,
    },
    colors: ["#4191ff"],
    fill: {
      color: "#4191ff",
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      crosshairs: {
        width: 1,
      },
    },
    yaxis: {
      min: 0,
    },
  };
  const ordersChartData = [
    {
      data: [32, 52, 45, 32, 54, 56, 28, 25, 36, 62],
    },
  ];

  return (
    <React.Fragment>
      <Row>
        <Col md="4" lg="12" xl="4">
          <Card className="card-box mb-5">
            <div className="card-content-overlay text-center py-4">
              <div className="d-60 rounded-circle bg-danger text-white btn-icon mx-auto text-center">
                <FontAwesomeIcon
                  icon={["fas", "user"]}
                  className="font-size-xxl"
                />
              </div>
              <div className="font-weight-bold display-2 mt-3">
                <CountUp
                  start={0}
                  end={props.data.totalUsers}
                  duration={5}
                  delay={0}
                  separator=""
                />
              </div>
              <div className="font-weight-bold text-black-100 font-size-xl pb-3">
                Total Users
              </div>
            </div>
            <div className="card-chart-overlay opacity-2">
              <Chart
                options={usersChartOptions}
                series={usersChartData}
                type="area"
                height={196}
              />
            </div>
          </Card>
        </Col>

        <Col md="4" lg="12" xl="4">
          <Card className="card-box mb-5">
            <div className="card-content-overlay text-center py-4">
              <div className="d-60 rounded-circle bg-success text-white btn-icon mx-auto text-center">
                <FontAwesomeIcon
                  icon={["fas", "dollar-sign"]}
                  className="font-size-xxl"
                />
              </div>
              <div className="font-weight-bold display-2 mt-3">
                <CountUp
                  start={0}
                  end={props.data.totalSales}
                  duration={5}
                  delay={0}
                  separator=","
                  decimals={2}
                  decimal="."
                  prefix="$"
                />
              </div>
              <div className="font-weight-bold text-black-100 font-size-xl pb-3">
                Total Revenue
              </div>
            </div>
            <div className="card-chart-overlay opacity-2">
              <Chart
                options={salesChartOptions}
                series={salesChartData}
                type="bar"
                height={211}
              />
            </div>
          </Card>
        </Col>

        <Col md="4" lg="12" xl="4">
          <Card className="card-box mb-5">
            <div className="card-content-overlay text-center py-4">
              <div className="d-60 rounded-circle bg-first text-white btn-icon mx-auto text-center">
                <FontAwesomeIcon
                  icon={["fas", "box-open"]}
                  className="font-size-xxl"
                />
              </div>
              <div className="font-weight-bold display-2 mt-3">
                <CountUp
                  start={0}
                  end={props.data.totalOrders}
                  duration={5}
                  delay={0}
                  separator=""
                />
              </div>
              <div className="font-weight-bold text-black-100 font-size-xl pb-3">
                Completed Orders
              </div>
            </div>
            <div className="card-chart-overlay opacity-2">
              <div>
                <Chart
                  options={ordersChartOptions}
                  series={ordersChartData}
                  type="area"
                  height={150}
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

QuickViewTotals.propTypes = {
  // data: PropTypes.object.isRequired,
  data: PropTypes.shape({
    totalUsers: PropTypes.number.isRequired,
    totalSales: PropTypes.number.isRequired,
    totalOrders: PropTypes.number.isRequired,
  }),
};

export default QuickViewTotals;
