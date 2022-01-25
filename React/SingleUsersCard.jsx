import React from "react";
import { Col, Card } from "reactstrap";
import PropTypes from "prop-types";

const SingleUserCard = (props) => {
  return (
    <Col md="6" lg="3">
      <Card className="card-box text-center mb-5 p-4 shadow-dark-sm">
        <div className="display-3 text-black font-weight-bold">
          {props.cardData.count}
        </div>
        {props.cardData.userStatus === "Active" && (
          <div className="divider mt-2 mb-3 mx-auto border-2 w-25 bg-success rounded border-success" />
        )}
        {props.cardData.userStatus === "Inactive" && (
          <div className="divider mt-2 mb-3 mx-auto border-2 w-25 bg-dark rounded border-dark" />
        )}
        {props.cardData.userStatus === "Pending" && (
          <div className="divider mt-2 mb-3 mx-auto border-2 w-25 bg-warning rounded border-warning" />
        )}
        {props.cardData.userStatus === "Total" && (
          <div className="divider mt-2 mb-3 mx-auto border-2 w-25 bg-danger rounded border-danger" />
        )}
        <div className="font-weight-bold font-size-sm text-uppercase">
          {props.cardData.userStatus}
        </div>
      </Card>
    </Col>
  );
};

SingleUserCard.propTypes = {
  cardData: PropTypes.shape({
    count: PropTypes.number.isRequired,
    userStatus: PropTypes.string.isRequired,
  }),
};

export default SingleUserCard;
