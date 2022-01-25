import React from "react";
import { Row, Col } from "reactstrap";
import toastr from "toastr";
import adminServices from "../services/adminService";
import debug from "sabio-debug";
import SingleUserCard from "../components/admin/SingleUsersCard";
import SingleSalesCard from "../components/admin/SingleSalesCard";
import SingleOrdersCard from "../components/admin/SingleOrdersCard";
import QuickViewTotals from "../components/admin/QuickviewTotals";
import SalesChart from "../components/admin/SalesChart";
import OrderChart from "../components/admin/OrdersChart";

const _logger = debug.extend("Admin-Dash");

class AdminDash extends React.Component {
  state = {
    main: "",
    userCards: [],
    orderCards: [],
    saleCards: [],
  };

  componentDidMount() {
    adminServices
      .getDashData()
      .then(this.onGetDashSucces)
      .catch(this.onGetDashError);
  }

  onGetDashSucces = (response) => {
    _logger(response.item);
    this.setState((prevState) => {
      const dashData = response.item;

      let mappedUserCards = dashData.userSummaryData.map(this.mapUserCard);
      let mappedOrderCards = dashData.orderSummaryData.map(this.mapOrderCard);
      let mappedSaleCards = dashData.saleSummaryData.map(this.mapSaleCard);

      return {
        ...prevState,
        main: dashData,
        userCards: mappedUserCards,
        orderCards: mappedOrderCards,
        saleCards: mappedSaleCards,
      };
    });
  };

  onGetDashError = (error) => {
    _logger("Error has occurred:", error);
    toastr.error("Could not find Admin Dashboard data");
  };

  mapUserCard = (userDataObj) => {
    return (
      <SingleUserCard
        key={userDataObj.userStatus}
        cardData={userDataObj}
      ></SingleUserCard>
    );
  };

  mapSaleCard = (salesDataObj) => {
    return (
      <SingleSalesCard
        key={`${salesDataObj.label}-${salesDataObj.datePart}-${salesDataObj.currentSum}`}
        data={salesDataObj}
      ></SingleSalesCard>
    );
  };

  mapOrderCard = (ordersDataObj) => {
    return (
      <SingleOrdersCard
        key={`${ordersDataObj.label}-${ordersDataObj.datePart}-${ordersDataObj.currentSum}`}
        data={ordersDataObj}
      ></SingleOrdersCard>
    );
  };

  render() {
    return (
      <React.Fragment>
        <h1>Admin Dashboard</h1>
        <hr />

        <div>
          {this.state.main.totals && (
            <QuickViewTotals data={this.state.main.totals} />
          )}
        </div>

        <hr />
        <div className="user-summary">
          <div className="mb-3">
            <h2>User Summary</h2>
          </div>
          {this.state.userCards && <Row>{this.state.userCards}</Row>}
        </div>
        <hr />
        <div className="sale-summary">
          <div className="mb-3">
            <h2>Revenue Summary</h2>
          </div>
          <Row>
            <Col xl="5">
              <SalesChart />
            </Col>
            <Col xl="7">
              {this.state.saleCards && <Row>{this.state.saleCards}</Row>}
            </Col>
          </Row>
        </div>
        <hr />
        <div className="order-summary">
          <div className="mb-3">
            <h2>Orders Summary</h2>
          </div>
          <Row>
            <Col xl="5">
              <OrderChart />
            </Col>
            <Col xl="7">
              {this.state.orderCards && <Row>{this.state.orderCards}</Row>}
            </Col>
          </Row>
        </div>
        <hr />
      </React.Fragment>
    );
  }
}

export default AdminDash;
