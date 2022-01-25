import React from "react";
import { Col, Card } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

function SingleSalesCard(props) {
  const currentData = props.data;

  return (
    <Col md="6">
      <Card className="card-box shadow-success-sm p-4 mb-5">
        <div className="d-flex align-items-center">
          <div className="d-50 rounded-circle btn-icon bg-success text-white text-center font-size-xl mr-3">
            <FontAwesomeIcon icon={["fas", "dollar-sign"]} />
          </div>
          <div className="text-black-100 font-weight-bold font-size-xl">
            Current {currentData.label}
          </div>
        </div>
        <div className="display-3 text-center line-height-sm text-second text-center d-flex align-items-center pt-2 justify-content-center">
          {currentData.pChange < 0 && (
            <FontAwesomeIcon
              icon={["fas", "arrow-down"]}
              className="font-size-lg text-danger mr-2"
            />
          )}
          {currentData.pChange > 0 && (
            <FontAwesomeIcon
              icon={["fas", "arrow-up"]}
              className="font-size-lg text-success mr-2"
            />
          )}
          {currentData.pChange === 0 && (
            <FontAwesomeIcon
              icon={["fas", "grip-lines"]}
              className="font-size-lg text-dark mr-2"
            />
          )}

          <div>
            <NumberFormat
              value={currentData.currentSum}
              displayType="text"
              thousandSeparator={true}
              prefix="$"
              decimalScale={2}
            />
          </div>
        </div>
        <div className="text-black-50 text-center opacity-8 pt-3">
          {currentData.pChange < 0 ? (
            <b>{Math.floor(currentData.pChange)}%</b>
          ) : (
            <b>+{Math.floor(currentData.pChange)}%</b>
          )}{" "}
          from last {currentData.label}
        </div>
      </Card>
    </Col>
  );
}

SingleSalesCard.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
    datePart: PropTypes.number.isRequired,
    currentSum: PropTypes.number.isRequired,
    previousSum: PropTypes.number.isRequired,
    pChange: PropTypes.number.isRequired,
  }),
};

export default SingleSalesCard;
